import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  Sparkles, 
  Compass, 
  Lock, 
  CheckSquare,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopicNoteModal } from '../components/common/TopicNoteModal';

export const RoadmapPage = () => {
  const { roadmap, toggleTopicStatus, saveTopicNotes, metrics } = useApp();

  // Keep all phases expanded by default or track open phases
  const [expandedPhases, setExpandedPhases] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true
  });

  const [activeNoteModal, setActiveNoteModal] = useState({
    isOpen: false,
    topic: null,
    phaseId: null,
    phaseTitle: ''
  });

  const togglePhaseExpand = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const handleOpenNoteModal = (phaseId, phaseTitle, topic) => {
    setActiveNoteModal({
      isOpen: true,
      topic,
      phaseId,
      phaseTitle
    });
  };

  const handleSaveNote = (notesText) => {
    if (activeNoteModal.phaseId && activeNoteModal.topic) {
      saveTopicNotes(activeNoteModal.phaseId, activeNoteModal.topic.id, notesText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#00E5FF]" />
            SOC Analyst Learning Roadmap
          </h1>
          <p className="text-xs text-slate-400 mt-1">Structured 6-Phase Mastery Plan from IT Fundamentals to SOC Detection Engineering.</p>
        </div>

        {/* Global Progress Badge */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-[#161B22] border border-[#30363D] self-start sm:self-auto">
          <div className="text-right font-mono">
            <span className="text-[10px] uppercase text-slate-400 block">Overall Mastery</span>
            <span className="text-lg font-bold text-[#00FF88]">{metrics.roadmapCompletionPercentage}%</span>
          </div>
          <div className="w-24 bg-[#21262D] rounded-full h-2.5 overflow-hidden border border-[#30363D]">
            <div 
              className="bg-gradient-to-r from-[#00E5FF] to-[#00FF88] h-full transition-all duration-500" 
              style={{ width: `${metrics.roadmapCompletionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 6 Expandable Roadmap Phases */}
      <div className="space-y-4">
        {roadmap.map((phase) => {
          const isExpanded = expandedPhases[phase.phaseId];
          const completedTopicsCount = phase.topics.filter(t => t.completed).length;
          const totalTopicsCount = phase.topics.length;
          const phasePct = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;
          const isPhaseFullyDone = phasePct === 100;

          return (
            <motion.div 
              key={phase.phaseId}
              layout
              className={`glass-card overflow-hidden border transition-all ${
                isPhaseFullyDone 
                  ? 'border-[#00FF88]/40 bg-[#161B22]' 
                  : 'border-[#30363D] bg-[#161B22]'
              }`}
            >
              {/* Phase Accordion Header */}
              <div 
                onClick={() => togglePhaseExpand(phase.phaseId)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#0D1117]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button className="p-1 rounded-lg text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-[#00E5FF]" /> : <ChevronRight className="w-5 h-5" />}
                  </button>

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-base sm:text-lg font-bold font-mono text-slate-100 flex items-center gap-2">
                        {phase.title}
                        {isPhaseFullyDone && (
                          <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-black bg-[#00FF88] px-2 py-0.5 rounded-full">
                            <Award className="w-3 h-3" /> PHASE COMPLETED
                          </span>
                        )}
                      </h2>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block font-mono text-xs">
                    <span className="text-slate-400">{completedTopicsCount} / {totalTopicsCount} Topics</span>
                    <span className="text-[#00E5FF] font-bold block">{phasePct}% Done</span>
                  </div>

                  <div className="w-16 sm:w-20 bg-[#21262D] rounded-full h-2 overflow-hidden border border-[#30363D]">
                    <div 
                      className={`h-full transition-all duration-500 ${isPhaseFullyDone ? 'bg-[#00FF88]' : 'bg-[#00E5FF]'}`}
                      style={{ width: `${phasePct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Accordion Topics List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[#30363D] bg-[#0D1117]/40 p-4 divide-y divide-[#30363D]/40"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {phase.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                            topic.completed 
                              ? 'bg-[#161B22]/80 border-[#00FF88]/30 text-slate-300' 
                              : 'bg-[#161B22] border-[#30363D] hover:border-[#00E5FF]/40 text-slate-100'
                          }`}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <button
                              onClick={() => toggleTopicStatus(phase.phaseId, topic.id)}
                              className="mt-0.5 shrink-0"
                            >
                              {topic.completed ? (
                                <CheckCircle2 className="w-5 h-5 text-[#00FF88]" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-500 hover:text-[#00E5FF]" />
                              )}
                            </button>

                            <div className="min-w-0 flex-1 space-y-1">
                              <p className={`text-xs font-semibold font-mono ${topic.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                                {topic.title}
                              </p>
                              
                              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  {topic.estimatedHours}h
                                </span>

                                <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                                  topic.difficulty === 'Advanced' ? 'bg-purple-500/20 text-purple-400' :
                                  topic.difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                                  'bg-emerald-500/20 text-emerald-400'
                                }`}>
                                  {topic.difficulty}
                                </span>

                                {topic.notes && (
                                  <span className="text-[#00E5FF] italic flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> Note saved
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Notes Button */}
                          <button
                            onClick={() => handleOpenNoteModal(phase.phaseId, phase.title, topic)}
                            className={`p-2 rounded-lg text-xs font-mono transition-colors shrink-0 flex items-center gap-1 ${
                              topic.notes
                                ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30'
                                : 'bg-[#21262D] text-slate-400 hover:text-white'
                            }`}
                            title="Open Study Notes for Topic"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Notes</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Topic Note Modal */}
      <TopicNoteModal
        isOpen={activeNoteModal.isOpen}
        onClose={() => setActiveNoteModal({ ...activeNoteModal, isOpen: false })}
        topic={activeNoteModal.topic}
        phaseTitle={activeNoteModal.phaseTitle}
        onSave={handleSaveNote}
      />
    </div>
  );
};
