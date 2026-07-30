import Task from '../models/Task.js';

// In-memory initial tasks fallback
let inMemoryTasks = [
  { id: 't-1', userId: 'demo_user_1', title: 'Learn OSI Model', topic: 'Networking', description: 'Study all 7 layers and encapsulation', priority: 'High', estimatedTimeHours: 2, dueDate: '2026-07-30', status: 'Completed' },
  { id: 't-2', userId: 'demo_user_1', title: 'Watch Wireshark Tutorial', topic: 'Packet Analysis', description: 'Understand display filters and stream reassembly', priority: 'High', estimatedTimeHours: 1.5, dueDate: '2026-07-30', status: 'Completed' },
  { id: 't-3', userId: 'demo_user_1', title: 'Practice Nmap', topic: 'Reconnaissance', description: 'Run SYN stealth scan (-sS) and NSE script scan (-sC)', priority: 'Medium', estimatedTimeHours: 2, dueDate: '2026-07-30', status: 'Completed' },
  { id: 't-4', userId: 'demo_user_1', title: 'Complete TryHackMe Room', topic: 'SOC Analyst Prep', description: 'Finish "Network Fundamentals" module', priority: 'Critical', estimatedTimeHours: 3, dueDate: '2026-07-30', status: 'Pending' },
  { id: 't-5', userId: 'demo_user_1', title: 'Read TCP/IP Notes', topic: 'Networking', description: 'Review 3-way handshake and TCP flags', priority: 'Low', estimatedTimeHours: 1, dueDate: '2026-07-30', status: 'Pending' },
];

export const getTasks = async (req, res) => {
  try {
    if (Task.db && Task.db.readyState === 1) {
      const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
      return res.json(tasks);
    }
    return res.json(inMemoryTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, topic, description, priority, estimatedTimeHours, dueDate } = req.body;
    if (Task.db && Task.db.readyState === 1) {
      const task = await Task.create({
        userId: req.user.id,
        title,
        topic: topic || 'General Cybersecurity',
        description,
        priority: priority || 'Medium',
        estimatedTimeHours: Number(estimatedTimeHours) || 1,
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        status: 'Pending'
      });
      return res.status(201).json(task);
    }

    const newTask = {
      id: `t-${Date.now()}`,
      userId: req.user.id || 'demo_user_1',
      title,
      topic: topic || 'General Cybersecurity',
      description: description || '',
      priority: priority || 'Medium',
      estimatedTimeHours: Number(estimatedTimeHours) || 1,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    inMemoryTasks.unshift(newTask);
    return res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (Task.db && Task.db.readyState === 1) {
      const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    }

    const index = inMemoryTasks.findIndex(t => t.id === id || t._id === id);
    if (index !== -1) {
      inMemoryTasks[index] = { ...inMemoryTasks[index], ...req.body };
      return res.json(inMemoryTasks[index]);
    }
    res.status(404).json({ message: 'Task not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (Task.db && Task.db.readyState === 1) {
      await Task.findByIdAndDelete(id);
      return res.json({ message: 'Task removed' });
    }

    inMemoryTasks = inMemoryTasks.filter(t => t.id !== id && t._id !== id);
    return res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
