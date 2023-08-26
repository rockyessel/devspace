// import WebSocket from 'ws';
// import mongoose from 'mongoose';
// import { Broadcast } from '../../models/broadcast';
// import { Server, IncomingMessage, ServerResponse } from 'http';
// import { handleGeneralChat } from './controllers/general-chat';
// import { handleBroadcastChat } from './controllers/broadcast-chat';
// import { participantSockets } from './manager';

//     try {
//       const broadcastRoom = await Broadcast.findOne({
//         'realtime.chatId': chatId,
//       });
//       if (broadcastRoom) {
//         const isParticipant =
//           roomParticipants.get(chatId)?.has(userId) ?? false;

//         if (!isParticipant) {
//           if (!roomParticipants.has(chatId)) {
//             roomParticipants.set(chatId, new Set());
//           }
//           roomParticipants.get(chatId)?.add(userId);

//           // Notify participants when a new user joins the room
//           const notify_message = `User ${userId} has joined the broadcast room.`;
//           notifyRoomParticipants(chatId, notify_message, userId);
//         } else {
//           console.log('User is already a participant in the room.');
//           // Participant is already in the room, you may choose to handle this case differently if needed.
//         }
//       } else {
//         console.log('Room not found');
//       }
//     } catch (error) {
//       console.error('Error adding participant to broadcast room:', error);
//       ws.close();
//     }


// // Create a Map to store WebSocket connections for each participant
// // const participantSockets = new Map<string, WebSocket>();
// // Create a Map to store the participant IDs for each room
// const roomParticipants = new Map<string, Set<string>>();

// export const WebSocketServerConnection = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
//   const wss = new WebSocket.Server({ server });
//   wss.on('connection', async (ws: WebSocket, req: Request) => {
//     const urlParams = new URLSearchParams(req.url?.split('?')[1]);
//     const chatId = urlParams.get('chatId');
//     const userId = urlParams.get('userId');
//     console.log('URL Params: ', { chatId, userId });

//     if (!chatId || !userId) {
//       // Close the WebSocket connection if chatId or userId is missing
//       console.log('Connection closed: No Chat ID | No User ID');
//       ws.close();
//       return;
//     }

//     // Store the WebSocket connection in the participantSockets Map
//     participantSockets.set(userId, ws);

//     ws.on('message', (message: string) => {
//       const data = JSON.parse(message);

//       switch (data.type) {
//         case 'general chat':
//           return handleGeneralChat('', '', '');

//         case 'broadcast chat':
//           return handleBroadcastChat(chatId, userId, data.message);

//         default:
//           console.log('Unknown message type:', data);
//       }
//     });

//     ws.on('close', () => {
//       // Handle WebSocket connection close

//       // Remove the WebSocket connection from the participantSockets Map
//       participantSockets.delete(userId);

//       handleWebSocketClose(chatId, userId);
//     });
//   });
// };

// export const handleWebSocketClose = async (chatId: string, userId: string) => {
//   try {
//     if (roomParticipants.has(chatId)) {
//       roomParticipants.get(chatId)?.delete(userId);

//       // Notify remaining participants that a user has left the room
//       notifyRoomParticipants(
//         chatId,
//         `User ${userId} has left the broadcast room.`,
//         userId
//       );
//     }
//   } catch (error) {
//     console.error('Error handling WebSocket close:', error);
//   }
// };

// // Function to send data to all participants in a broadcast room

// // handleChatMessage(chatId, userId, data.message);

// export const notifyRoomParticipants = async (
//   chatId: string,
//   message: string,
//   userId: string
// ) => {
//   try {
//     if (roomParticipants.has(chatId)) {
//       roomParticipants.get(chatId)?.forEach((participant) => {
//         if (participant !== userId) {
//           // Get the WebSocket connection from the participantSockets Map using userId
//           const ws = participantSockets.get(participant || '');
//           if (ws instanceof WebSocket) {
//             // Check if the participant has a WebSocket connection
//             ws.send(JSON.stringify({ type: 'Activity', message }));
//           }
//         }
//       });
//     }
//   } catch (error) {
//     console.error('Error notifying room participants:', error);
//   }
// };
