import { Broadcast } from "../../models/broadcast";





export const notifyRoomParticipants = async (room_id: string, message: string, user_id: string) => {
  try {
    const broadcastRoom = await Broadcast.findOne({ room_id }).populate('participants', '_id');
    if (broadcastRoom) {
      broadcastRoom.participants.forEach((participant: any) => {
        if (participant._id.toString() !== user_id) {
          // Convert the ObjectId to a string and check if it's not equal to the user_id
          if (participant.ws instanceof WebSocket) {
            // Check if the participant has a WebSocket connection
            participant.ws.send(JSON.stringify({ type: 'notification', message }));
          }
        }
      });
    }
  } catch (error) {
    console.error('Error notifying room participants:', error);
  }
}



// Function to handle incoming WebSocket messages
export const handleWebSocketMessage = async (room_id: string, user_id: string, message: string) => {
  try {
    const broadcastRoom = await Broadcast.findOne({room_id});
    if (broadcastRoom) {
      // Your logic to handle WebSocket messages (e.g., collaborative text editor updates)
      const parsedMessage = JSON.parse(message);
      console.log('parsedMessage', parsedMessage);
      if (parsedMessage.type === 'textUpdate') {


      } else if (parsedMessage.type === 'chat') {
        // Handle incoming chat messages
        // Add the chat message to the broadcastRoom's chatMessages array
        broadcastRoom.chat.push({
          user_id,
          message: parsedMessage.message,
          timestamp: new Date(),
        });
        await broadcastRoom.save();


        sendDataToRoomParticipants(room_id, { type: 'chat', message: parsedMessage.message });
      }

    }
  } catch (error) {
    console.error('Error handling WebSocket message:', error);
  }
}


export const handleWebSocketClose = async (room_id: string, user_id: string) => {
  try {
    const broadcastRoom = await Broadcast.findOne({ room_id });
    console.log('broadcastRoom', broadcastRoom);
    if (broadcastRoom) {
      // Remove the participant from the participants array
      broadcastRoom.participants = broadcastRoom.participants.filter((_id) => _id.toString() !== user_id);
      await broadcastRoom.save();

      // Notify remaining participants that a user has left the room
      notifyRoomParticipants(room_id, `User ${user_id} has left the broadcast room.`,user_id);
    }
  } catch (error) {
    console.error('Error handling WebSocket close:', error);
  }
}




// Function to send data to all participants in a broadcast room
export const sendDataToRoomParticipants = async (room_id: string, data: any) => {
  try {
    const broadcastRoom = await Broadcast.findOne({ room_id }).populate('participants', '_id');
    if (broadcastRoom) {
      broadcastRoom.participants.forEach((participant: any) => {
        if (participant.ws instanceof WebSocket) {
          // Check if the participant has a WebSocket connection
          participant.ws.send(JSON.stringify(data));
          console.log('data sent: ', data)
        }
      });
    }
  } catch (error) {
    console.error('Error sending data to room participants:', error);
  }
}