import WebSocket from 'ws';
import mongoose from 'mongoose';
import { Broadcast } from '../models/broadcast';
import { Server, IncomingMessage, ServerResponse } from 'http';

// Create a Map to store WebSocket connections for each participant
const participantSockets = new Map<string, WebSocket>();
// Create a Map to store the participant IDs for each room
const roomParticipants = new Map<string, Set<string>>();

export const WebSocketServerConnection = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws: WebSocket, req: Request) => {
    const urlParams = new URLSearchParams(req.url?.split('?')[1]);
    const room_id = urlParams.get('room_id');
    const user_id = urlParams.get('user_id');
    console.log('URL Params: ', { room_id, user_id });

    if (!room_id || !user_id) {
      // Close the WebSocket connection if room_id or user_id is missing
      console.log('Connection closed: No Room ID | No User ID');
      ws.close();
      return;
    }

    try {
      const broadcastRoom = await Broadcast.findOne({ room_id });
      if (broadcastRoom) {
        const isParticipant =
          roomParticipants.get(room_id)?.has(user_id) ?? false;

        if (!isParticipant) {
          if (!roomParticipants.has(room_id)) {
            roomParticipants.set(room_id, new Set());
          }
          roomParticipants.get(room_id)?.add(user_id);

          // Notify participants when a new user joins the room
          const notify_message = `User ${user_id} has joined the broadcast room.`;
          notifyRoomParticipants(room_id, notify_message, user_id);
        } else {
          console.log('User is already a participant in the room.');
          // Participant is already in the room, you may choose to handle this case differently if needed.
        }
      } else {
        console.log('Room not found');
      }
    } catch (error) {
      console.error('Error adding participant to broadcast room:', error);
      ws.close();
    }

    // Store the WebSocket connection in the participantSockets Map
    participantSockets.set(user_id, ws);

    ws.on('message', (message: string) => {
      const data = JSON.parse(message);

      if (!data?.type) {
        console.log('Invalid message format:', data);
        return;
      }

      switch (data.type) {
        case 'chat':
          if (!data.message) {
            console.log('Invalid chat message:', data);
            return;
          }

          handleChatMessage(room_id, user_id, data.message);

          break;
        case 'Activity':
          // Handle text update logic here
          console.log('Activity: ', data);
          break;
          case 'CodeEditor':
          console.log('CodeEditor: ', data);
          ws.send(JSON.stringify(data));
          console.log('Sent');
          // Handle text update logic here
          break;
        // Add more cases for other types of messages if needed
        default:
          console.log('Unknown message type:', data);
      }
    });

    ws.on('close', () => {
      // Handle WebSocket connection close

      // Remove the WebSocket connection from the participantSockets Map
      participantSockets.delete(user_id);

      handleWebSocketClose(room_id, user_id);
    });
  });
};

export const handleWebSocketClose = async (
  room_id: string,
  user_id: string
) => {
  try {
    if (roomParticipants.has(room_id)) {
      roomParticipants.get(room_id)?.delete(user_id);

      // Notify remaining participants that a user has left the room
      notifyRoomParticipants(
        room_id,
        `User ${user_id} has left the broadcast room.`,
        user_id
      );
    }
  } catch (error) {
    console.error('Error handling WebSocket close:', error);
  }
};

// Function to send data to all participants in a broadcast room
export const sendDataToRoomParticipants = async (
  room_id: string,
  user_id: string,
  timestamp: Date,
  data: { type: string; message: string }
) => {
  try {
    if (roomParticipants.has(room_id)) {
      roomParticipants.get(room_id)?.forEach((participant) => {
        console.log('PARTICIPANTS', roomParticipants);
        // Get the WebSocket connection from the participantSockets Map using user_id
        const ws = participantSockets.get(participant || '');

        if (ws instanceof WebSocket) {
          // Check if the participant has a WebSocket connection
          const obj = {
            user_id,
            timestamp,
            type: 'chat',
            message: data.message,
          };

          ws.send(JSON.stringify(obj));
        }
      });
    }
  } catch (error) {
    console.error('Error sending data to room participants:', error);
  }
};

export const handleChatMessage = async (
  room_id: string,
  user_id: string,
  message: string
) => {
  try {
    console.log('handleChatMessage');
    const broadcastRoom = await Broadcast.findOne({ room_id });
    if (broadcastRoom) {
      console.log('handleChatMessage => broadcastRoom');

      // Push the chat message and save the document
      const timestamp = new Date();
      broadcastRoom.chat.push({
        user_id,
        message,
        timestamp,
      });
      await broadcastRoom.save();
      console.log('handleChatMessage => broadcastRoom => saved');

      sendDataToRoomParticipants(room_id, user_id, timestamp, {
        type: 'chat',
        message,
      });
    }
  } catch (error) {
    console.error('Error handling chat message:', error);
  }
};

export const notifyRoomParticipants = async (
  room_id: string,
  message: string,
  user_id: string
) => {
  try {
    if (roomParticipants.has(room_id)) {
      roomParticipants.get(room_id)?.forEach((participant) => {
        if (participant !== user_id) {
          // Get the WebSocket connection from the participantSockets Map using user_id
          const ws = participantSockets.get(participant || '');
          if (ws instanceof WebSocket) {
            // Check if the participant has a WebSocket connection
            ws.send(JSON.stringify({ type: 'Activity', message }));
          }
        }
      });
    }
  } catch (error) {
    console.error('Error notifying room participants:', error);
  }
};
