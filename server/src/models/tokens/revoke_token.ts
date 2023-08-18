import mongoose from 'mongoose';

const tokenRevocationSchema = new mongoose.Schema({
  jti: { type: String, required: true, unique: true },
  revokedAt: { type: Date, default: Date.now },
  expiresIn: { type: Number, required: true },
});

export const RevokedRefreshToken = mongoose.model('RevokedRefreshToken', tokenRevocationSchema);

