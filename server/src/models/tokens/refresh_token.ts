import mongoose from 'mongoose';

const refreshToken = new mongoose.Schema({
  refreshToken: { type: String, required: true, unique: true },
  usedAt: { type: Date, required: true },
});

export const UsedRefreshToken = mongoose.model('UsedRefreshToken', refreshToken);

