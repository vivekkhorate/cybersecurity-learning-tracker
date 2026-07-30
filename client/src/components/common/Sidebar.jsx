import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  CheckSquare, 
  BarChart3, 
  Timer, 
  FileText, 
  User, 
  ShieldCheck, 
  Zap,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Roadmap', path: '/roadmap', icon: Compass },
    { label: 'Daily Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Progress', path: '/progress', icon: BarChart3 },
    { label: 'Study Timer', path: '/timer', icon: Timer },
    { label: 'Notes', path: '/notes', icon: FileText },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#0D1117] border-r border-[#30363D] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Logo & Header */}
          <div className="h-16 px-6 flex items-center border-b border-[#30363D]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#0099FF] text-black shadow-lg shadow-[#00E5FF]/20">
                <ShieldCheck className="w-5 h-5 font-bold" />
              </div>
              <div>
                <h1 className="font-bold text-base tracking-wide text-white font-mono flex items-center gap-1">
                  SOC <span className="text-[#00E5FF]">SENTINEL</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-mono">Cybersecurity Tracker</p>
              </div>
            </div>
          </div>

          {/* Current Phase Widget */}
          <div className="mx-4 mt-5 p-3 rounded-xl bg-[#161B22] border border-[#30363D]/80">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400 font-medium">Target Role</span>
              <span className="text-[#00FF88] font-mono font-semibold text-[10px] bg-[#00FF88]/10 px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <p className="text-xs font-semibold text-slate-200 truncate">{user?.role || 'SOC Analyst Tier 1'}</p>
            
            <div className="mt-2.5 pt-2 border-t border-[#30363D]/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Streak</span>
              <span className="flex items-center gap-1 font-mono font-bold text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {user?.streak || 7} Days
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => isOpen && toggleSidebar()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00E5FF]/15 to-transparent text-[#00E5FF] border-l-2 border-[#00E5FF]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#161B22]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#30363D] bg-[#161B22]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 flex items-center justify-center font-mono font-bold text-xs">
              {user?.name ? user.name.charAt(0) : 'S'}
            </div>
            <div className="overflow-hidden text-xs">
              <p className="font-semibold text-slate-200 truncate">{user?.name || 'Alex Vance'}</p>
              <p className="text-slate-400 truncate text-[10px]">Phase {user?.currentPhase || 2}: Networking</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
