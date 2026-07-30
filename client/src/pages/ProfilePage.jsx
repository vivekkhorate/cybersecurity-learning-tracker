import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Award, 
  Flame, 
  CheckCircle2, 
  Compass, 
  Edit3, 
  Save, 
  Zap,
  Target,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { metrics } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Alex Vance',
    role: user?.role || 'SOC Analyst Tier 1 Aspirant',
    skillLevel: user?.skillLevel || 'Intermediate',
    currentPhase: user?.currentPhase || 2,
    todayGoal: user?.todayGoal || 'Master Wireshark Packet Analysis and Nmap Scans',
    avatar: user?.avatar || 'cyber-agent-1'
  });

  const avatars = [
    { id: 'cyber-agent-1', label: 'SOC Operator', icon: Shield },
    { id: 'cyber-agent-2', label: 'Threat Hunter', icon: Target },
    { id: 'cyber-agent-3', label: 'Security Lead', icon: Zap },
    { id: 'cyber-agent-4', label: 'Analyst Sentinel', icon: Sparkles },
  ];

  const badges = [
    { id: 'b1', name: 'Networking Specialist', desc: 'Mastered OSI & TCP/IP protocols', unlocked: true, color: 'text-[#00E5FF] bg-[#00E5FF]/10' },
    { id: 'b2', name: 'Packet Inspection Expert', desc: 'Completed Wireshark triage labs', unlocked: true, color: 'text-[#00FF88] bg-[#00FF88]/10' },
    { id: 'b3', name: 'Port Scanner Sentinel', desc: 'Ran 10+ Nmap scans', unlocked: true, color: 'text-amber-400 bg-amber-500/10' },
    { id: 'b4', name: '7-Day Streak Warrior', desc: 'Logged activity 7 days straight', unlocked: true, color: 'text-purple-400 bg-purple-500/10' },
    { id: 'b5', name: 'SIEM Incident Handler', desc: 'Complete Phase 6 SOC Operations', unlocked: metrics.completedPhasesCount >= 6, color: 'text-blue-400 bg-blue-500/10' },
  ];

  const handleSave = () => {
    updateUserProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card Header */}
      <div className="glass-card p-6 border border-[#30363D] relative overflow-hidden bg-gradient-to-r from-[#161B22] to-[#0D1117]">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00E5FF] to-[#00FF88] p-1 shadow-xl shadow-[#00E5FF]/20">
              <div className="w-full h-full bg-[#0D1117] rounded-[12px] flex items-center justify-center font-mono font-bold text-3xl text-[#00E5FF]">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-black shadow-lg">
              <Flame className="w-4 h-4 fill-black" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1 text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold font-mono text-white">{user?.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30">
                ACTIVE ANALYST
              </span>
            </div>
            <p className="text-sm font-mono text-[#00E5FF]">{user?.role}</p>
            
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-mono text-slate-400">
              <span>Skill Level: <strong className="text-slate-200">{user?.skillLevel}</strong></span>
              <span>•</span>
              <span>Phase: <strong className="text-[#00E5FF]">Phase {user?.currentPhase || 2}</strong></span>
            </div>
          </div>

          {/* Edit Profile Toggle */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-[#21262D] text-slate-200 hover:text-white border border-[#30363D] hover:border-[#00E5FF]/40 text-xs font-mono flex items-center gap-2 transition-all shrink-0"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 border border-[#30363D] space-y-4">
          <h2 className="text-base font-bold text-slate-100 font-mono border-b border-[#30363D] pb-3">Update Analyst Credentials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Target Cybersecurity Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Skill Level</label>
              <select
                value={formData.skillLevel}
                onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input bg-[#0D1117] font-mono"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="SOC Tier 1 Specialist">SOC Tier 1 Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Current Active Phase</label>
              <select
                value={formData.currentPhase}
                onChange={(e) => setFormData({ ...formData, currentPhase: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm glass-input bg-[#0D1117] font-mono"
              >
                <option value={1}>Phase 1: IT Fundamentals</option>
                <option value={2}>Phase 2: Networking & Security Controls</option>
                <option value={3}>Phase 3: Automation & Scripting</option>
                <option value={4}>Phase 4: Cybersecurity Fundamentals</option>
                <option value={5}>Phase 5: Security Tools & Threat Intel</option>
                <option value={6}>Phase 6: SOC Operations</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Today's Focus Goal</label>
            <input
              type="text"
              value={formData.todayGoal}
              onChange={(e) => setFormData({ ...formData, todayGoal: e.target.value })}
              className="w-full px-3 py-2 text-sm glass-input font-mono"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-black bg-gradient-to-r from-[#00E5FF] to-[#00FF88] rounded-lg font-mono shadow-lg shadow-[#00E5FF]/20 hover:brightness-110"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </motion.div>
      )}

      {/* Badges & Achievements Section */}
      <div className="glass-card p-6 border border-[#30363D] space-y-4">
        <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          SOC Badges & Accomplishments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                badge.unlocked
                  ? 'bg-[#161B22] border-[#30363D] hover:border-[#00E5FF]/40'
                  : 'bg-[#0D1117]/40 border-[#30363D]/40 opacity-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${badge.color}`}>
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold font-mono text-slate-200">{badge.name}</h4>
                <p className="text-[11px] text-slate-400">{badge.desc}</p>
                <span className="text-[9px] font-mono text-[#00FF88] font-bold block pt-1">
                  {badge.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
