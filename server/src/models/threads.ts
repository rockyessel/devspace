import mongoose from 'mongoose';

const ThreadsSchema = new mongoose.Schema(
  {
    related_to: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    title: { type: String, require: false },
    description: { type: String, require: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: Boolean,
    type: String,
    keywords: String,
    image: String,
    mode: String,
    blacklist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Threads = mongoose.model('Threads', ThreadsSchema);
