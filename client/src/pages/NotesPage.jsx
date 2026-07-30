import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  Tag, 
  Trash2, 
  Edit3, 
  Calendar, 
  Layers,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NoteModal } from '../components/common/NoteModal';

export const NotesPage = () => {
  const { notes, addNote, editNote, deleteNote } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  // Extract all unique tags
  const allTags = ['All', ...new Set(notes.flatMap(n => n.tags || []))];

  const handleOpenAddModal = () => {
    setNoteToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (note) => {
    setNoteToEdit(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (formData) => {
    if (noteToEdit) {
      editNote(noteToEdit.id || noteToEdit._id, formData);
    } else {
      addNote(formData);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.topic.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === 'All' ? true : (note.tags && note.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#00E5FF]" />
            Cybersecurity Knowledge Base & Notes
          </h1>
          <p className="text-xs text-slate-400 mt-1">Organize study command lines, cheat sheets, protocol summaries, and lab findings.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#0099FF] text-black font-semibold text-xs font-mono shadow-lg shadow-[#00E5FF]/20 hover:brightness-110 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 font-bold" />
          <span>Add New Note</span>
        </button>
      </div>

      {/* Search & Tag Pills */}
      <div className="glass-card p-4 border border-[#30363D] space-y-3">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes by title, commands, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs glass-input font-mono"
          />
        </div>

        {/* Tag Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-slate-500 flex items-center gap-1 shrink-0">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#00E5FF] text-black font-bold'
                  : 'bg-[#21262D] text-slate-400 hover:text-slate-200 border border-[#30363D]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredNotes.length === 0 ? (
            <div className="col-span-full glass-card p-12 text-center text-slate-400 border border-[#30363D]">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p className="text-sm font-mono">No notes found matching your search.</p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <motion.div
                key={note.id || note._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-5 border border-[#30363D] hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between space-y-4 bg-[#161B22]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] font-mono border border-[#00E5FF]/20">
                        {note.topic}
                      </span>
                      <h3 className="text-base font-bold font-mono text-slate-100 mt-1.5">{note.title}</h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditModal(note)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#00E5FF] hover:bg-[#21262D]"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(note.id || note._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 p-3 rounded-lg bg-[#0D1117] border border-[#30363D]/60 text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {note.content}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#30363D]/60 text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {note.tags && note.tags.map((t, idx) => (
                      <span key={idx} className="bg-[#21262D] px-1.5 py-0.5 rounded text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0">{new Date(note.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Note Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        noteToEdit={noteToEdit}
      />
    </div>
  );
};
