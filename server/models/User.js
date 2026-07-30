import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'SOC Analyst Tier 1 Aspirant' },
  skillLevel: { type: String, default: 'Intermediate' },
  currentPhase: { type: Number, default: 2 },
  todayGoal: { type: String, default: 'Master Wireshark Packet Captures and Nmap Scans' },
  avatar: { type: String, default: 'cyber-agent-1' },
  streak: { type: Number, default: 7 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
