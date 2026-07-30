import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Tag, AlignLeft, AlertCircle } from 'lucide-react';

export const TaskModal = ({ isOpen, onClose, onSave, taskToEdit = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    topic: 'Networking',
    description: '',
    priority: 'Medium',
    estimatedTimeHours: 1.5,
    dueDate: new Date().toISOString().split('T')[0],
    status: 'Pending'
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        topic: taskToEdit.topic || 'Networking',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Medium',
        estimatedTimeHours: taskToEdit.estimatedTimeHours || 1.5,
        dueDate: taskToEdit.dueDate || new Date().toISOString().split('T')[0],
        status: taskToEdit.status || 'Pending'
      });
    } else {
      setFormData({
        title: '',
        topic: 'Networking',
        description: '',
        priority: 'Medium',
        estimatedTimeHours: 1.5,
        dueDate: new Date().toISOString().split('T')[0],
        status: 'Pending'
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg glass-card border border-[#30363D] bg-[#161B22] p-6 shadow-2xl rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#30363D]">
          <h2 className="text-lg font-bold text-slate-100 font-mono">
            {taskToEdit ? 'Edit Cybersecurity Task' : 'Add New Daily Task'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#21262D]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Task Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Master Wireshark Display Filters"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-sm glass-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Topic</label>
              <input
                type="text"
                placeholder="e.g. Packet Analysis"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input bg-[#0D1117]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Est. Time (Hours)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="24"
                value={formData.estimatedTimeHours}
                onChange={(e) => setFormData({ ...formData, estimatedTimeHours: Number(e.target.value) })}
                className="w-full px-3 py-2 text-sm glass-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 text-sm glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Description / Notes</label>
            <textarea
              rows="3"
              placeholder="Key concepts, laboratory steps, or reference links..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-sm glass-input"
            />
          </div>

          {taskToEdit && (
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="Pending"
                    checked={formData.status === 'Pending'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="accent-[#00E5FF]"
                  />
                  Pending
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="Completed"
                    checked={formData.status === 'Completed'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="accent-[#00FF88]"
                  />
                  Completed
                </label>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#30363D]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-black bg-gradient-to-r from-[#00E5FF] to-[#0099FF] rounded-lg shadow-lg shadow-[#00E5FF]/20 hover:brightness-110 transition-all font-mono"
            >
              {taskToEdit ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
