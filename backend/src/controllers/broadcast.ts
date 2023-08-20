import { Request, Response } from 'express';
import { User } from '../models/users';
import { CustomRequest } from '../middleware/scrape-data';
import { Broadcast } from '../models/broadcast';
import { v4 as uuidv4 } from 'uuid';

export const create_broadcast = async (request: CustomRequest, response: Response) => {
  try {
    console.log('request.body', request.body);

    

    const {
      title,
      description,
      language,
      framework,
      packages,
      keywords,
      thumbnail,
      schedule,
      mode,
      allowed_users,
    } = request.body;

    const user = request.user;

    const doesUserExist = await User.findOne({ username: user?.username });

    if (doesUserExist) {
      const newBroadcast = await Broadcast.create({
        room_id: uuidv4(),
        owner: doesUserExist._id,
        title,
        description,
        language,
        framework,
        packages,
        keywords,
        thumbnail,
        schedule,
        mode,
        allowed_users,
      });
      console.log('newBroadcast', newBroadcast);
    }

    response.status(201).json(request.body);
  } catch (error) {
    console.log('error', error);
  }
};

export const join_broadcast = async (request: CustomRequest, response: Response) => {
  const { room_id } = request.params;
  const user_id = request.body?.user;
  
  const doesBroadcastRoomExist = await Broadcast.findOne({ room_id });
  
  if (!doesBroadcastRoomExist) {
    response.status(404).json({ error: 'Broadcast room not found.' });
  }
  
  if (doesBroadcastRoomExist?.allowed_users.includes(user_id)) {
  }
};


export const chat_history = async (request: CustomRequest, response: Response) => {
  try {
    const { room_id } = request.params;
    const doesBroadcastRoomExist = await Broadcast.findOne({ room_id });
    
    if (!doesBroadcastRoomExist) {
      return response.status(404).json({ error: 'Broadcast room not found.' });
    }

    const chatHistory = [...doesBroadcastRoomExist?.chat]

    response.status(200).json(chatHistory)

    
  } catch (error) {
    console.log(error)
    response.status(500).json({error: 'Could not GET chat history'})
  }
}