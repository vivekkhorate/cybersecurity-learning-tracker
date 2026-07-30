import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  phases: [
    {
      phaseId: { type: Number, required: true },
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
      topics: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          estimatedHours: { type: Number, default: 2 },
          difficulty: { type: String, default: 'Intermediate' },
          completed: { type: Boolean, default: false },
          notes: { type: String, default: '' },
        }
      ]
    }
  ],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Roadmap', roadmapSchema);
