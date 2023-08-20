import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
});

export const Participant = mongoose.model('Participant', ParticipantSchema);
