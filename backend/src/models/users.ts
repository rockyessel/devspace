import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: false },
    username: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    profile: { type: String, require: false },
    password: { type: String, require: false },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);

