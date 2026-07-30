import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieIcon, 
  Calendar, 
  Award, 
  Target,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/common/CircularProgress';
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';

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

export const ProgressPage = () => {
  const { metrics, roadmap, studyLogs } = useApp();
  const [timeframe, setTimeframe] = useState('Weekly'); // Daily, Weekly, Monthly

  // Monthly progress line chart data
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 18, 22, 28],
        borderColor: '#00E5FF',
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#00E5FF',
      },
      {
        label: 'Study Hours Logged',
        data: [15, 22, 25, 30],
        borderColor: '#00FF88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.4,
        fill: font => true,
        pointBackgroundColor: '#00FF88',
      }
    ]
  };

  // Phase Mastery bar chart data
  const phaseBarData = {
    labels: roadmap.map(p => `P${p.phaseId}`),
    datasets: [
      {
        label: 'Completed Topics',
        data: roadmap.map(p => p.topics.filter(t => t.completed).length),
        backgroundColor: '#00FF88',
        borderRadius: 4,
      },
      {
        label: 'Total Topics',
        data: roadmap.map(p => p.topics.length),
        backgroundColor: '#21262D',
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#F0F6FC', font: { family: 'JetBrains Mono', size: 11 } }
      },
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
        backgroundColor: ['#00E5FF', '#21262D'],
        borderColor: ['#00E5FF', '#30363D'],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00E5FF]" />
            Learning Analytics & Progress Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">Detailed statistical insights into daily task velocity, roadmap mastery, and study metrics.</p>
        </div>

        {/* Timeframe Filter Switcher */}
        <div className="flex rounded-lg bg-[#161B22] p-1 border border-[#30363D] self-start sm:self-auto">
          {['Daily', 'Weekly', 'Monthly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-md transition-all ${
                timeframe === tf
                  ? 'bg-gradient-to-r from-[#00E5FF] to-[#0099FF] text-black font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Top Visual Circular Progress Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border border-[#30363D] flex flex-col items-center justify-center text-center">
          <CircularProgress 
            percentage={metrics.taskCompletionPercentage} 
            size={140}
            strokeWidth={12}
            label="Daily Tasks" 
            color="#00E5FF" 
          />
          <h3 className="mt-4 text-sm font-bold font-mono text-slate-100">Daily Task Velocity</h3>
          <p className="text-xs text-slate-400 mt-1">{metrics.completedTasksCount} of {metrics.totalTasksCount} tasks completed</p>
        </div>

        <div className="glass-card p-6 border border-[#30363D] flex flex-col items-center justify-center text-center">
          <CircularProgress 
            percentage={metrics.roadmapCompletionPercentage} 
            size={140}
            strokeWidth={12}
            label="Roadmap" 
            color="#00FF88" 
          />
          <h3 className="mt-4 text-sm font-bold font-mono text-slate-100">Overall Roadmap Mastery</h3>
          <p className="text-xs text-slate-400 mt-1">{metrics.completedTopics} of {metrics.totalTopics} topics completed</p>
        </div>

        <div className="glass-card p-6 border border-[#30363D] flex flex-col items-center justify-center text-center">
          <CircularProgress 
            percentage={metrics.completedPhasesCount > 0 ? Math.round((metrics.completedPhasesCount / 6) * 100) : 0} 
            size={140}
            strokeWidth={12}
            label="Phases" 
            color="#A855F7" 
          />
          <h3 className="mt-4 text-sm font-bold font-mono text-slate-100">Phases Completed</h3>
          <p className="text-xs text-slate-400 mt-1">{metrics.completedPhasesCount} of 6 SOC Phases Done</p>
        </div>
      </div>

      {/* Main Charts Row 1: Line Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 border border-[#30363D]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
                {timeframe} Progress Trends (Line Chart)
              </h2>
              <p className="text-xs text-slate-400">Task completion and study hours velocity</p>
            </div>
          </div>
          <div className="h-64">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="glass-card p-6 border border-[#30363D] flex flex-col justify-between">
          <div className="pb-3 border-b border-[#30363D]">
            <h2 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#00FF88]" />
              Tasks Status Breakdown
            </h2>
            <p className="text-xs text-slate-400">Completed vs Pending Tasks</p>
          </div>

          <div className="my-4 flex items-center justify-center h-48 relative">
            <Doughnut data={doughnutData} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
          </div>

          <div className="space-y-2 pt-3 border-t border-[#30363D] text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-3 h-3 rounded bg-[#00E5FF]" /> Completed Tasks
              </span>
              <span className="font-bold text-slate-100">{metrics.completedTasksCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-300">
                <span className="w-3 h-3 rounded bg-[#21262D]" /> Remaining Tasks
              </span>
              <span className="font-bold text-slate-100">{metrics.remainingTasksCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart: Phase Breakdown */}
      <div className="glass-card p-6 border border-[#30363D]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 font-mono">Phase-by-Phase Topic Mastery (Bar Chart)</h2>
            <p className="text-xs text-slate-400">Comparison of finished topics vs total required per phase</p>
          </div>
        </div>
        <div className="h-64">
          <Bar data={phaseBarData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};
