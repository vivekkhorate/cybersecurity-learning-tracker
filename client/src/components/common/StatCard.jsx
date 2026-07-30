import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, subtext, icon: Icon, color = "cyan", trend }) => {
  const colorMap = {
    cyan: {
      border: 'hover:border-[#00E5FF]/40',
      iconBg: 'bg-[#00E5FF]/10 text-[#00E5FF]',
      glow: 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]',
      text: 'text-[#00E5FF]',
    },
    emerald: {
      border: 'hover:border-[#00FF88]/40',
      iconBg: 'bg-[#00FF88]/10 text-[#00FF88]',
      glow: 'group-hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]',
      text: 'text-[#00FF88]',
    },
    purple: {
      border: 'hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
      text: 'text-purple-400',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      text: 'text-amber-400',
    },
  };

  const currentTheme = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`group relative glass-card p-5 border border-[#30363D] ${currentTheme.border} ${currentTheme.glow} transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold font-mono text-slate-100 tracking-tight">{value}</h3>
          {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${currentTheme.iconBg} backdrop-blur-md`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span className={trend >= 0 ? 'text-[#00FF88] font-semibold' : 'text-red-400 font-semibold'}>
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </span>
          <span className="text-slate-500">vs last week</span>
        </div>
      )}
    </motion.div>
  );
};
