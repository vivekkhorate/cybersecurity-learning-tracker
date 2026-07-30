import Roadmap from '../models/Roadmap.js';
import { initialRoadmap } from '../data/initialRoadmap.js';

let inMemoryRoadmap = JSON.parse(JSON.stringify(initialRoadmap));

export const getRoadmap = async (req, res) => {
  try {
    if (Roadmap.db && Roadmap.db.readyState === 1) {
      let userRoadmap = await Roadmap.findOne({ userId: req.user.id });
      if (!userRoadmap) {
        userRoadmap = await Roadmap.create({
          userId: req.user.id,
          phases: initialRoadmap
        });
      }
      return res.json(userRoadmap.phases);
    }
    return res.json(inMemoryRoadmap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTopicStatus = async (req, res) => {
  try {
    const { phaseId, topicId, completed, notes } = req.body;

    if (Roadmap.db && Roadmap.db.readyState === 1) {
      let userRoadmap = await Roadmap.findOne({ userId: req.user.id });
      if (userRoadmap) {
        const phase = userRoadmap.phases.find(p => p.phaseId === Number(phaseId));
        if (phase) {
          const topic = phase.topics.find(t => t.id === topicId);
          if (topic) {
            if (completed !== undefined) topic.completed = completed;
            if (notes !== undefined) topic.notes = notes;
          }
          // Auto complete phase if all topics done
          const allCompleted = phase.topics.every(t => t.completed);
          phase.completed = allCompleted;
        }
        await userRoadmap.save();
        return res.json(userRoadmap.phases);
      }
    }

    // In-memory update
    const phase = inMemoryRoadmap.find(p => p.phaseId === Number(phaseId));
    if (phase) {
      const topic = phase.topics.find(t => t.id === topicId);
      if (topic) {
        if (completed !== undefined) topic.completed = completed;
        if (notes !== undefined) topic.notes = notes;
      }
      phase.completed = phase.topics.every(t => t.completed);
    }
    return res.json(inMemoryRoadmap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
