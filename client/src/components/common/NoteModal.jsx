import React, { useState, useEffect } from 'react';
import { X, FileText, Tag } from 'lucide-react';

export const NoteModal = ({ isOpen, onClose, onSave, noteToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    topic: 'General Cybersecurity',
    content: '',
    tags: ''
  });

  useEffect(() => {
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title || '',
        topic: noteToEdit.topic || 'General Cybersecurity',
        content: noteToEdit.content || '',
        tags: Array.isArray(noteToEdit.tags) ? noteToEdit.tags.join(', ') : ''
      });
    } else {
      setFormData({
        title: '',
        topic: 'General Cybersecurity',
        content: '',
        tags: ''
      });
    }
  }, [noteToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    const formattedTags = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    onSave({
      title: formData.title,
      topic: formData.topic,
      content: formData.content,
      tags: formattedTags
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg glass-card border border-[#30363D] bg-[#161B22] p-6 shadow-2xl rounded-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#30363D]">
          <h2 className="text-lg font-bold text-slate-100 font-mono flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00E5FF]" />
            {noteToEdit ? 'Edit Cybersecurity Note' : 'Add New Study Note'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#21262D]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Note Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Wireshark Display Filters Cheat Sheet"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-sm glass-input font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Topic</label>
              <input
                type="text"
                placeholder="e.g. Reconnaissance"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. Nmap, Recon, CLI"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Note Content *</label>
            <textarea
              rows="6"
              required
              placeholder="Write detailed notes, syntax, command lines, or triage steps..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-3 text-sm glass-input font-mono text-slate-200"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#30363D]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-black bg-gradient-to-r from-[#00E5FF] to-[#0099FF] rounded-lg shadow-lg shadow-[#00E5FF]/20 font-mono hover:brightness-110 transition-all"
            >
              {noteToEdit ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
