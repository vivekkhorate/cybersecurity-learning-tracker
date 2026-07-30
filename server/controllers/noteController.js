import Note from '../models/Note.js';

let inMemoryNotes = [
  {
    id: 'n-1',
    userId: 'demo_user_1',
    title: 'Wireshark Display Filters Cheat Sheet',
    topic: 'Packet Analysis',
    content: '### Key Filters for SOC Triage:\n- `ip.addr == 192.168.1.1` - Filter IP traffic\n- `tcp.flags.syn == 1 && tcp.flags.ack == 0` - SYN packets for port scan triage\n- `dns.flags.response == 0` - DNS queries\n- `http.request.method == "POST"` - Web form submissions',
    tags: ['Wireshark', 'SOC', 'Filters'],
    phaseId: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'n-2',
    userId: 'demo_user_1',
    title: 'Nmap Scan Command Cheat Sheet',
    topic: 'Reconnaissance',
    content: '### Preferred Scan Syntax:\n`nmap -sC -sV -p- -T4 --min-rate 1000 10.10.10.x -oA target_scan`\n- `-sC`: Default scripts\n- `-sV`: Service versioning\n- `-p-`: Scan all 65535 ports',
    tags: ['Nmap', 'Recon', 'Tools'],
    phaseId: 2,
    createdAt: new Date().toISOString()
  }
];

export const getNotes = async (req, res) => {
  try {
    if (Note.db && Note.db.readyState === 1) {
      const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
      return res.json(notes);
    }
    return res.json(inMemoryNotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, topic, content, tags, phaseId } = req.body;
    if (Note.db && Note.db.readyState === 1) {
      const note = await Note.create({
        userId: req.user.id,
        title,
        topic: topic || 'General Cybersecurity',
        content,
        tags: tags || [],
        phaseId
      });
      return res.status(201).json(note);
    }

    const newNote = {
      id: `n-${Date.now()}`,
      userId: req.user.id || 'demo_user_1',
      title,
      topic: topic || 'General Cybersecurity',
      content,
      tags: tags || [],
      phaseId,
      createdAt: new Date().toISOString()
    };
    inMemoryNotes.unshift(newNote);
    return res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (Note.db && Note.db.readyState === 1) {
      const updated = await Note.findByIdAndUpdate(id, { ...req.body, updatedAt: Date.now() }, { new: true });
      return res.json(updated);
    }

    const index = inMemoryNotes.findIndex(n => n.id === id || n._id === id);
    if (index !== -1) {
      inMemoryNotes[index] = { ...inMemoryNotes[index], ...req.body, updatedAt: new Date().toISOString() };
      return res.json(inMemoryNotes[index]);
    }
    res.status(404).json({ message: 'Note not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (Note.db && Note.db.readyState === 1) {
      await Note.findByIdAndDelete(id);
      return res.json({ message: 'Note deleted' });
    }

    inMemoryNotes = inMemoryNotes.filter(n => n.id !== id && n._id !== id);
    return res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
