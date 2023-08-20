import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
  {
    
    user_id: { type: String, ref: 'User' },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true },
  },
);

export const Chat = mongoose.model('Chat', ChatSchema);
