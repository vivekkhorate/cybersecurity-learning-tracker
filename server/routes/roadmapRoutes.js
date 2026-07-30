import express from 'express';
import { getRoadmap, updateTopicStatus } from '../controllers/roadmapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getRoadmap);
router.post('/topic', updateTopicStatus);

export default router;
