import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'cyber_sentinel_secret_key_2026';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists in MongoDB if connected
    if (User.db && User.db.readyState === 1) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'SOC Analyst Tier 1 Aspirant',
      });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

      return res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email, role: user.role, streak: user.streak, currentPhase: user.currentPhase },
        token,
      });
    } else {
      // In-memory fallback
      const token = jwt.sign({ id: 'demo_user_1', email }, JWT_SECRET, { expiresIn: '30d' });
      return res.status(201).json({
        user: { id: 'demo_user_1', name, email, role: role || 'SOC Analyst Tier 1 Aspirant', streak: 7, currentPhase: 2 },
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (User.db && User.db.readyState === 1) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
        return res.json({
          user: { id: user._id, name: user.name, email: user.email, role: user.role, streak: user.streak, currentPhase: user.currentPhase },
          token,
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
      // In-memory fallback response
      const token = jwt.sign({ id: 'demo_user_1', email }, JWT_SECRET, { expiresIn: '30d' });
      return res.json({
        user: { id: 'demo_user_1', name: 'Alex Vance', email, role: 'SOC Analyst Tier 1 Aspirant', streak: 7, currentPhase: 2 },
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    if (User.db && User.db.readyState === 1) {
      const user = await User.findById(req.user.id).select('-password');
      if (user) return res.json(user);
    }
    return res.json({
      id: 'demo_user_1',
      name: 'Alex Vance',
      email: 'alex.vance@sentinel.sec',
      role: 'SOC Analyst Tier 1 Aspirant',
      skillLevel: 'Intermediate',
      currentPhase: 2,
      todayGoal: 'Complete Wireshark Packet Analysis and Master Nmap NSE Scripts',
      streak: 7,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
