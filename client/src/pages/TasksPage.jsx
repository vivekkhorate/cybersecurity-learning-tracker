import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  AlertCircle, 
  Calendar, 
  Tag, 
  CheckSquare, 
  Square
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TaskModal } from '../components/common/TaskModal';

export const TasksPage = () => {
  const { tasks, addTask, editTask, deleteTask, toggleTaskStatus, metrics } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // All, Pending, Completed
  const [priorityFilter, setPriorityFilter] = useState('All'); // All, Low, Medium, High, Critical

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (formData) => {
    if (taskToEdit) {
      editTask(taskToEdit.id || taskToEdit._id, formData);
    } else {
      addTask(formData);
    }
  };

  // Filter tasks based on search, status, and priority
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' ? true : task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' ? true : task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#00E5FF]" />
            Daily Task Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">Manage and track daily SOC study objectives, lab rooms, and reading tasks.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#0099FF] text-black font-semibold text-xs font-mono shadow-lg shadow-[#00E5FF]/20 hover:brightness-110 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 font-bold" />
          <span>Add New Task</span>
        </button>
      </div>

      {/* Auto-calculated Summary Gauge Bar */}
      <div className="glass-card p-5 border border-[#30363D] grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#00FF88]/10 text-[#00FF88]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400">Completed Tasks</p>
            <p className="text-xl font-bold font-mono text-slate-100">{metrics.completedTasksCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400">Remaining Tasks</p>
            <p className="text-xl font-bold font-mono text-slate-100">{metrics.remainingTasksCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400">Total Tasks</p>
            <p className="text-xl font-bold font-mono text-slate-100">{metrics.totalTasksCount}</p>
          </div>
        </div>

        {/* Completion Gauge */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Completion</span>
            <span className="text-[#00FF88] font-bold">{metrics.taskCompletionPercentage}%</span>
          </div>
          <div className="w-full bg-[#21262D] rounded-full h-2.5 overflow-hidden border border-[#30363D]">
            <div
              className="bg-gradient-to-r from-[#00E5FF] to-[#00FF88] h-full transition-all duration-500"
              style={{ width: `${metrics.taskCompletionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 border border-[#30363D] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs glass-input font-mono"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex rounded-lg bg-[#0D1117] p-1 border border-[#30363D]">
            {['All', 'Pending', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  statusFilter === st
                    ? 'bg-[#161B22] text-[#00E5FF] font-semibold border border-[#30363D]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Priority Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg glass-input bg-[#0D1117] text-xs font-mono"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <div className="glass-card p-10 text-center text-slate-400 border border-[#30363D]">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p className="text-sm font-mono">No cybersecurity tasks match your filters.</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isDone = task.status === 'Completed';
              return (
                <motion.div
                  key={task.id || task._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`glass-card p-4 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-[#0D1117]/60 border-[#30363D]/40 text-slate-400'
                      : 'bg-[#161B22] border-[#30363D] hover:border-[#00E5FF]/40 text-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => toggleTaskStatus(task.id || task._id)}
                      className="mt-0.5 text-slate-400 hover:text-[#00FF88] transition-colors"
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-[#00FF88]" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-[#00E5FF]" />
                      )}
                    </button>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold font-mono ${isDone ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                          {task.title}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#21262D] text-[10px] font-mono text-[#00E5FF] border border-[#30363D]">
                          {task.topic}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          task.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          task.priority === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-slate-700/50 text-slate-300'
                        }`}>
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-xs text-slate-400 line-clamp-2">{task.description}</p>
                      )}

                      <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {task.estimatedTimeHours} Hours
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Due: {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#30363D]/60">
                    <button
                      onClick={() => handleOpenEditModal(task)}
                      className="p-2 rounded-lg text-slate-400 hover:text-[#00E5FF] hover:bg-[#21262D] transition-colors"
                      title="Edit task"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id || task._id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};
