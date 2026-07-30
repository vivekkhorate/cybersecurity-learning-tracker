import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Target, 
  TrendingUp, 
  Compass, 
  ArrowRight, 
  Activity,
  Layers,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/common/CircularProgress';
import { StatCard } from '../components/common/StatCard';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, roadmap, metrics, toggleTaskStatus } = useApp();
  const navigate = useNavigate();

  const activePhase = roadmap.find(p => p.phaseId === (user?.currentPhase || 2)) || roadmap[1];

  // Today's Date
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Recent activity logs compiled from task and roadmap state
  const recentActivities = [
    { id: 1, title: 'Completed "Learn OSI Model"', time: '2 hours ago', type: 'task', icon: CheckCircle2, color: 'text-[#00FF88]' },
    { id: 2, title: 'Finished Wireshark Packet Analysis topic', time: '4 hours ago', type: 'roadmap', icon: Compass, color: 'text-[#00E5FF]' },
    { id: 3, title: 'Logged 45 min Pomodoro Study Session', time: 'Yesterday', type: 'timer', icon: Clock, color: 'text-amber-400' },
    { id: 4, title: 'Added note: Nmap Scan Command Cheat Sheet', time: 'Yesterday', type: 'note', icon: Layers, color: 'text-purple-400' },
  ];

  // Chart data for weekly study hours
  const weeklyChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2.5, 3.0, 4.5, 2.0, 3.5, 5.0, 4.5],
        backgroundColor: '#00E5FF',
        borderRadius: 6,
        hoverBackgroundColor: '#00FF88'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#161B22',
        titleColor: '#00E5FF',
        bodyColor: '#F0F6FC',
        borderColor: '#30363D',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(48, 54, 61, 0.4)' },
        ticks: { color: '#8B949E', font: { family: 'JetBrains Mono', size: 10 } }
      }
    }
  };

  const doughnutData = {
    labels: ['Completed Tasks', 'Remaining Tasks'],
    datasets: [
      {
        data: [metrics.completedTasksCount, metrics.remainingTasksCount],
        backgroundColor: ['#00FF88', '#21262D'],
        borderColor: ['#00FF88', '#30363D'],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border border-[#30363D] relative overflow-hidden bg-gradient-to-r from-[#161B22] via-[#161B22] to-[#0D1117]"
      >
        <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-[#00E5FF]/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>{todayFormatted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF88]">{user?.name || 'Alex'}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              SOC Security Ops Center Command Center. Focus on mastering threat triage, packet inspection, and SIEM event response.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#0D1117] border border-[#30363D]">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Current Learning Phase</span>
              <span className="text-xs font-bold text-[#00E5FF] font-mono">{activePhase?.title}</span>
            </div>

            <button
              onClick={() => navigate('/roadmap')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#0099FF] text-black font-semibold text-xs font-mono shadow-lg shadow-[#00E5FF]/20 hover:brightness-110 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>View Roadmap</span>
            </button>
          </div>
        </div>

        {/* Goal Indicator */}
        <div className="mt-4 pt-4 border-t border-[#30363D]/60 flex items-center gap-2 text-xs">
          <Target className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-400">Today's Focus:</span>
          <span className="font-semibold text-slate-200">{user?.todayGoal || 'Complete Wireshark Packet Analysis & Master Nmap Scan Flags'}</span>
        </div>
      </motion.div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Progress"
          value={`${metrics.taskCompletionPercentage}%`}
          subtext={`${metrics.completedTasksCount} of ${metrics.totalTasksCount} tasks finished`}
          icon={CheckCircle2}
          color="cyan"
        />

        <StatCard
          title="Roadmap Completion"
          value={`${metrics.roadmapCompletionPercentage}%`}
          subtext={`${metrics.completedTopics} of ${metrics.totalTopics} topics mastered`}
          icon={Compass}
          color="emerald"
        />

        <StatCard
          title="Learning Streak"
          value={`${user?.streak || 7} Days`}
          subtext="Consistent daily activity"
          icon={Flame}
          color="amber"
        />

        <StatCard
          title="Task Breakdown"
          value={`${metrics.remainingTasksCount} Pending`}
          subtext={`${metrics.completedTasksCount} completed today`}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Dashboard Main Visual Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Progress Rings & Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Overview Card */}
          <div className="glass-card p-6 border border-[#30363D]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#30363D]">
              <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                Learning Velocity & Progress Gauges
              </h2>
              <span className="text-xs font-mono text-[#00FF88] bg-[#00FF88]/10 px-2 py-0.5 rounded">Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* Circular Progress 1: Tasks */}
              <div className="flex flex-col items-center justify-center p-3 bg-[#0D1117]/60 rounded-xl border border-[#30363D]">
                <CircularProgress 
                  percentage={metrics.taskCompletionPercentage} 
                  label="Daily Tasks" 
                  color="#00E5FF" 
                />
                <div className="mt-3 text-center text-xs">
                  <span className="text-slate-400">Tasks: </span>
                  <span className="font-mono font-semibold text-slate-200">{metrics.completedTasksCount}/{metrics.totalTasksCount}</span>
                </div>
              </div>

              {/* Circular Progress 2: Roadmap */}
              <div className="flex flex-col items-center justify-center p-3 bg-[#0D1117]/60 rounded-xl border border-[#30363D]">
                <CircularProgress 
                  percentage={metrics.roadmapCompletionPercentage} 
                  label="Roadmap" 
                  color="#00FF88" 
                />
                <div className="mt-3 text-center text-xs">
                  <span className="text-slate-400">Topics: </span>
                  <span className="font-mono font-semibold text-slate-200">{metrics.completedTopics}/{metrics.totalTopics}</span>
                </div>
              </div>

              {/* Doughnut Task Chart */}
              <div className="flex flex-col items-center justify-center p-3 bg-[#0D1117]/60 rounded-xl border border-[#30363D] h-full min-h-[170px]">
                <span className="text-xs font-mono text-slate-400 mb-2">Completion Ratio</span>
                <div className="w-28 h-28 relative">
                  <Doughnut data={doughnutData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: true }} />
                </div>
              </div>
            </div>

            {/* Linear Progress Bars for Phases */}
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Phase Progress Breakdown</h3>
              {roadmap.map(phase => {
                const phaseCompleted = phase.topics.filter(t => t.completed).length;
                const phaseTotal = phase.topics.length;
                const pct = phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0;
                return (
                  <div key={phase.phaseId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 truncate max-w-xs">{phase.title}</span>
                      <span className="text-[#00E5FF] font-semibold">{pct}%</span>
                    </div>
                    <div className="w-full bg-[#21262D] rounded-full h-2 overflow-hidden border border-[#30363D]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full ${pct === 100 ? 'bg-[#00FF88]' : 'bg-gradient-to-r from-[#00E5FF] to-[#0099FF]'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Progress Bar Chart */}
          <div className="glass-card p-6 border border-[#30363D]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-100 font-mono">Weekly Study Activity</h2>
                <p className="text-xs text-slate-400">Total study time logged across recent days</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-[#21262D] px-2.5 py-1 rounded-lg">25.0 Hours Total</span>
            </div>
            <div className="h-56">
              <Bar data={weeklyChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Right Column: Today's Tasks & Recent Activity */}
        <div className="space-y-6">
          {/* Today's Tasks Quick Checklist */}
          <div className="glass-card p-5 border border-[#30363D]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#30363D]">
              <h2 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00FF88]" />
                Today's Daily Tasks
              </h2>
              <button 
                onClick={() => navigate('/tasks')} 
                className="text-xs text-[#00E5FF] hover:underline font-mono flex items-center gap-1"
              >
                All ({tasks.length}) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {tasks.slice(0, 5).map(task => (
                <div
                  key={task.id || task._id}
                  onClick={() => toggleTaskStatus(task.id || task._id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    task.status === 'Completed'
                      ? 'bg-[#0D1117]/50 border-[#30363D]/40 text-slate-400'
                      : 'bg-[#161B22] border-[#30363D] hover:border-[#00E5FF]/40 text-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => {}}
                    className="mt-1 rounded border-[#30363D] bg-[#0D1117] text-[#00FF88] focus:ring-0 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${task.status === 'Completed' ? 'line-through text-slate-500' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-[#21262D] font-mono">{task.topic}</span>
                      <span>{task.estimatedTimeHours}h</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    task.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                    task.priority === 'High' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-300'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="glass-card p-5 border border-[#30363D]">
            <div className="pb-3 mb-3 border-b border-[#30363D]">
              <h2 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00E5FF]" />
                Recent Learning Activity
              </h2>
            </div>

            <div className="space-y-3">
              {recentActivities.map(act => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3 text-xs p-2 rounded-lg hover:bg-[#0D1117]/60 transition-all">
                    <div className="p-1.5 rounded-lg bg-[#21262D] shrink-0">
                      <Icon className={`w-4 h-4 ${act.color}`} />
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">{act.title}</p>
                      <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
