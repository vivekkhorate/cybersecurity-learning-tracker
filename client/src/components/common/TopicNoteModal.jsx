import React, { useState, useEffect } from 'react';
import { X, FileText, Save } from 'lucide-react';

export const TopicNoteModal = ({ isOpen, onClose, topic, phaseTitle, onSave }) => {
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (topic) {
      setNoteText(topic.notes || '');
    }
  }, [topic, isOpen]);

  if (!isOpen || !topic) return null;

  const handleSave = () => {
    onSave(noteText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md glass-card border border-[#30363D] bg-[#161B22] p-6 shadow-2xl rounded-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#30363D]">
          <div>
            <span className="text-[10px] uppercase font-mono text-[#00E5FF]">{phaseTitle}</span>
            <h3 className="text-base font-bold text-slate-100 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00FF88]" />
              {topic.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#21262D]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
            Topic Study Notes & Commands
          </label>
          <textarea
            rows="6"
            placeholder="Write key concepts, commands, or Wireshark filters learned for this topic..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full p-3 text-sm glass-input font-mono text-slate-200"
          />
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#30363D]">
          <div className="text-[11px] text-slate-400">
            Est. Study: <span className="font-mono text-slate-200 font-semibold">{topic.estimatedHours}h</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-black bg-[#00FF88] rounded-lg font-mono hover:bg-[#00FF88]/90 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
