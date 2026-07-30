import React from 'react';
import { Menu, Calendar, Shield, Flame, User, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { metrics } = useApp();
  const navigate = useNavigate();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#30363D] px-4 lg:px-8 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#161B22] lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Today's Date */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D] text-xs font-mono text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>{formattedDate}</span>
        </div>

        {/* Today's Goal Quick pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs text-[#00E5FF]">
          <Shield className="w-3.5 h-3.5" />
          <span className="font-medium truncate max-w-xs">Goal: {user?.todayGoal || 'Master SOC Analyst Tools'}</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Overall Progress Quick Gauge */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D]">
          <div className="text-right text-[11px]">
            <p className="text-slate-400">Roadmap</p>
            <p className="font-mono font-bold text-[#00FF88]">{metrics.roadmapCompletionPercentage}%</p>
          </div>
          <div className="w-16 bg-[#21262D] rounded-full h-2 overflow-hidden border border-[#30363D]">
            <div 
              className="bg-gradient-to-r from-[#00E5FF] to-[#00FF88] h-full transition-all duration-500" 
              style={{ width: `${metrics.roadmapCompletionPercentage}%` }}
            />
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
          <Flame className="w-4 h-4 fill-amber-400 animate-pulse" />
          <span>{user?.streak || 7} Days</span>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#161B22] border border-transparent hover:border-[#30363D] transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00E5FF] to-[#00FF88] p-0.5">
              <div className="w-full h-full bg-[#0D1117] rounded-[6px] flex items-center justify-center font-mono font-bold text-xs text-[#00E5FF]">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-slate-200">{user?.name}</span>
          </button>

          <button
            onClick={logout}
            title="Logout"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
