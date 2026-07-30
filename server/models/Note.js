import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  topic: { type: String, default: 'General Cybersecurity' },
  content: { type: String, required: true },
  tags: [{ type: String }],
  phaseId: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Note', noteSchema);
