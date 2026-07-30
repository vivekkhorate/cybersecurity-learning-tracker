import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer as TimerIcon, 
  Coffee, 
  Brain, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimerPage = () => {
  const { logStudySession } = useApp();

  const [mode, setMode] = useState('pomodoro'); // pomodoro (25), shortBreak (5), longBreak (15)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const timerRef = useRef(null);

  const modeDurations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setMode(newMode);
    setTimeLeft(modeDurations[newMode]);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            
            // Session finished
            if (mode === 'pomodoro') {
              setCompletedSessions((s) => s + 1);
              logStudySession(25);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTimeLeft(modeDurations[mode]);
  };

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalModeTime = modeDurations[mode];
  const progressPercentage = Math.round(((totalModeTime - timeLeft) / totalModeTime) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold font-mono text-white flex items-center justify-center gap-2">
          <TimerIcon className="w-6 h-6 text-[#00E5FF]" />
          Pomodoro Study Timer
        </h1>
        <p className="text-xs text-slate-400">Boost focus during packet analysis, log triage, and lab exercises with structured study intervals.</p>
      </div>

      {/* Main Timer Box */}
      <div className="glass-card p-8 border border-[#30363D] max-w-xl mx-auto text-center space-y-8 bg-gradient-to-b from-[#161B22] to-[#0D1117]">
        {/* Mode Switcher Tabs */}
        <div className="flex justify-center gap-2 p-1.5 rounded-xl bg-[#0D1117] border border-[#30363D]">
          <button
            onClick={() => switchMode('pomodoro')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              mode === 'pomodoro'
                ? 'bg-gradient-to-r from-[#00E5FF] to-[#0099FF] text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>25m Study</span>
          </button>

          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              mode === 'shortBreak'
                ? 'bg-[#00FF88] text-black font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>5m Break</span>
          </button>

          <button
            onClick={() => switchMode('longBreak')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              mode === 'longBreak'
                ? 'bg-purple-500 text-white font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>15m Long Break</span>
          </button>
        </div>

        {/* Big Display Clock */}
        <div className="relative py-6">
          <div className="text-6xl sm:text-7xl font-extrabold font-mono text-slate-100 tracking-tight text-cyber-glow">
            {formatTime(timeLeft)}
          </div>
          <p className="mt-2 text-xs font-mono uppercase text-[#00E5FF] tracking-wider">
            {mode === 'pomodoro' ? 'Deep Work Session' : 'Rest & Refresh'}
          </p>

          {/* Progress Line */}
          <div className="w-64 mx-auto mt-6 bg-[#21262D] rounded-full h-2 overflow-hidden border border-[#30363D]">
            <div
              className={`h-full transition-all duration-1000 ${
                mode === 'pomodoro' ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FF88]' : 'bg-[#00FF88]'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleStartPause}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold font-mono text-sm shadow-xl transition-all ${
              isRunning
                ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-gradient-to-r from-[#00E5FF] to-[#00FF88] text-black hover:brightness-110 shadow-[#00E5FF]/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>START</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-xl bg-[#21262D] text-slate-300 hover:text-white border border-[#30363D] hover:border-slate-500 transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Session counter */}
        <div className="pt-4 border-t border-[#30363D] flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Sessions Completed Today:</span>
          <span className="font-bold text-[#00FF88]">{completedSessions}</span>
        </div>
      </div>

      {/* Cyber SOC Mindset Quote */}
      <div className="glass-card p-5 border border-[#30363D] bg-[#161B22]/60 text-center max-w-xl mx-auto">
        <p className="text-xs font-mono text-slate-300 italic">
          "Attacker needs to succeed once; SOC Analyst must be vigilant always. Micro-study sessions build macro incident response instincts."
        </p>
      </div>
    </div>
  );
};
