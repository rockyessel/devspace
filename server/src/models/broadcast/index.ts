import mongoose from 'mongoose';

const BroadcastSchema = new mongoose.Schema(
  {
    room_id: { type: String, require: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    code: { type: String, require: true },
    title: { type: String, require: false },
    description: { type: String, require: true },
    language: { type: String, require: true },
    frameworks: { type: String, require: true },
    packages: { type: String, require: true },
    keywords: { type: String, require: true },
    thumbnail: { type: String, require: false },
    schedule: String,
    mode: { type: String, require: true },
    allowed_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    participants: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string[]) {
          return new Set(value).size === value.length;
        },
        message: () => 'Duplicate participant IDs are not allowed.',
      },
    },
    chat: [{ user_id: String, message: String, timestamp: Date }],
  },
  { timestamps: true }
);

export const Broadcast = mongoose.model('Broadcast', BroadcastSchema);
