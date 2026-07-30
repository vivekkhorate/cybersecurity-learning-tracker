import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import confetti from 'canvas-confetti';

const AppContext = createContext();

// Initial Default Tasks as specified in requirement prompt
const defaultInitialTasks = [
  { id: 't-1', title: 'Learn OSI Model', topic: 'Networking', description: 'Study all 7 layers, packet encapsulation, and data units', priority: 'High', estimatedTimeHours: 2, dueDate: '2026-07-30', status: 'Completed' },
  { id: 't-2', title: 'Watch Wireshark Tutorial', topic: 'Packet Analysis', description: 'Master display filters, PCAP analysis, and stream reassembly', priority: 'High', estimatedTimeHours: 1.5, dueDate: '2026-07-30', status: 'Completed' },
  { id: 't-3', title: 'Practice Nmap', topic: 'Reconnaissance', description: 'Execute SYN stealth scans (-sS) and service enumeration (-sV)', priority: 'Medium', estimatedTimeHours: 2, dueDate: '2026-07-30', status: 'Completed' },
  { id: 't-4', title: 'Complete TryHackMe Room', topic: 'SOC Analyst Prep', description: 'Finish "Network Fundamentals & Wireshark Triage" lab room', priority: 'Critical', estimatedTimeHours: 3, dueDate: '2026-07-30', status: 'Pending' },
  { id: 't-5', title: 'Read TCP/IP Notes', topic: 'Networking', description: 'Review TCP 3-way handshake, SYN-ACK flags, and teardown sequence', priority: 'Low', estimatedTimeHours: 1, dueDate: '2026-07-30', status: 'Pending' },
];

const defaultInitialRoadmap = [
  {
    phaseId: 1,
    title: "Phase 1: IT Fundamentals",
    description: "Hardware, operating systems, and virtualization essentials.",
    completed: false,
    topics: [
      { id: "p1-1", title: "Computer Hardware", estimatedHours: 4, difficulty: "Beginner", completed: true, notes: "Understood CPU registers, RAM allocation, and storage speed tiers." },
      { id: "p1-2", title: "Operating Systems", estimatedHours: 5, difficulty: "Beginner", completed: true, notes: "Kernel vs User mode, system calls, process scheduler." },
      { id: "p1-3", title: "Windows Administration", estimatedHours: 6, difficulty: "Beginner", completed: true, notes: "Cmd, PowerShell, Registry, Event Viewer, Services." },
      { id: "p1-4", title: "Linux Command Line", estimatedHours: 8, difficulty: "Beginner", completed: true, notes: "File permissions (chmod, chown), cron jobs, systemctl." },
      { id: "p1-5", title: "VirtualBox Lab", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "Bridged vs NAT adapter setup." },
      { id: "p1-6", title: "VMware Workstation", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "Snapshots and lab cloning." }
    ]
  },
  {
    phaseId: 2,
    title: "Phase 2: Networking & Security Controls",
    description: "Protocols, packet analysis, firewalls, and network scanning tools.",
    completed: false,
    topics: [
      { id: "p2-1", title: "OSI Model", estimatedHours: 5, difficulty: "Beginner", completed: true, notes: "7 Layers: Physical to Application." },
      { id: "p2-2", title: "TCP/IP Protocol", estimatedHours: 6, difficulty: "Intermediate", completed: true, notes: "TCP vs UDP headers, window size." },
      { id: "p2-3", title: "IPv4 Addressing & Subnetting", estimatedHours: 8, difficulty: "Intermediate", completed: true, notes: "CIDR notation, network vs broadcast ID." },
      { id: "p2-4", title: "IPv6 Protocol", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-5", title: "DNS Protocol", estimatedHours: 5, difficulty: "Beginner", completed: true, notes: "A, AAAA, CNAME, MX, TXT records." },
      { id: "p2-6", title: "DHCP Protocol", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "DORA process: Discover, Offer, Request, Acknowledge." },
      { id: "p2-7", title: "ARP Protocol", estimatedHours: 4, difficulty: "Beginner", completed: true, notes: "ARP poisoning and table inspection." },
      { id: "p2-8", title: "ICMP Protocol", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "Echo Request (Type 8) and Reply (Type 0)." },
      { id: "p2-9", title: "HTTP / HTTPS SSL/TLS", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-10", title: "FTP Protocol", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "" },
      { id: "p2-11", title: "SMTP Email Protocol", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-12", title: "SSH & Key Authentication", estimatedHours: 4, difficulty: "Beginner", completed: true, notes: "" },
      { id: "p2-13", title: "VPN Tunnels & IPsec", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-14", title: "Routing Protocols", estimatedHours: 7, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p2-15", title: "Switching & Layer 2 Security", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-16", title: "Firewalls & Rule Bases", estimatedHours: 7, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-17", title: "VLAN Segmentation", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-18", title: "Wireshark Packet Analysis", estimatedHours: 10, difficulty: "Intermediate", completed: true, notes: "Mastered basic display filters." },
      { id: "p2-19", title: "Cisco Packet Tracer Labs", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-20", title: "Nmap Scanning", estimatedHours: 8, difficulty: "Intermediate", completed: true, notes: "Practiced SYN, ACK, and UDP scans." },
      { id: "p2-21", title: "IDS/IPS Intrusion Detection Systems", estimatedHours: 7, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p2-22", title: "Proxy Servers & Reverse Proxies", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-23", title: "NAT (Network Address Translation)", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-24", title: "Wireless Security (WPA2/WPA3)", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p2-25", title: "Practice: Network Scanning Labs", estimatedHours: 6, difficulty: "Intermediate", completed: true, notes: "Completed lab on Nmap target discovery." },
      { id: "p2-26", title: "Practice: Packet Analysis Labs", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 3,
    title: "Phase 3: Automation & Scripting",
    description: "Bash log parsing and PowerShell incident response scripts.",
    completed: false,
    topics: [
      { id: "p3-1", title: "Bash Scripting Basics", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p3-2", title: "Bash Log Parsing (grep, sed, awk)", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p3-3", title: "PowerShell Cmdlets & Pipelines", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p3-4", title: "PowerShell Automation Scripts", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 4,
    title: "Phase 4: Cybersecurity Fundamentals",
    description: "CIA triad, cryptography, OWASP Top 10, and MITRE ATT&CK.",
    completed: false,
    topics: [
      { id: "p4-1", title: "CIA Triad", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "Confidentiality, Integrity, Availability principles." },
      { id: "p4-2", title: "Authentication & MFA", estimatedHours: 5, difficulty: "Beginner", completed: true, notes: "SAML, OAuth2, TOTP tokens." },
      { id: "p4-3", title: "Authorization (RBAC, ABAC)", estimatedHours: 4, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-4", title: "Symmetric & Asymmetric Encryption", estimatedHours: 7, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-5", title: "Hashing & Digital Signatures", estimatedHours: 4, difficulty: "Beginner", completed: true, notes: "SHA-256 vs MD5 collisions." },
      { id: "p4-6", title: "Malware Types & Vectors", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-7", title: "Phishing & Social Engineering", estimatedHours: 5, difficulty: "Beginner", completed: false, notes: "" },
      { id: "p4-8", title: "OWASP Top 10", estimatedHours: 12, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-9", title: "MITRE ATT&CK Framework", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p4-10", title: "Security Policies & Governance", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p4-11", title: "Risk Management Frameworks", estimatedHours: 6, difficulty: "Intermediate", completed: false, notes: "" }
    ]
  },
  {
    phaseId: 5,
    title: "Phase 5: Security Tools & Threat Intelligence",
    description: "Hands-on with Splunk, Sentinel, Wazuh, Defender, VirusTotal, AbuseIPDB.",
    completed: false,
    topics: [
      { id: "p5-1", title: "Wireshark Deep Dive", estimatedHours: 8, difficulty: "Intermediate", completed: true, notes: "" },
      { id: "p5-2", title: "Nmap NSE Scripting Engine", estimatedHours: 8, difficulty: "Intermediate", completed: true, notes: "" },
      { id: "p5-3", title: "Burp Suite Proxy", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-4", title: "Metasploit Basics", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-5", title: "Splunk Enterprise SIEM & SPL", estimatedHours: 15, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p5-6", title: "Microsoft Sentinel KQL", estimatedHours: 12, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p5-7", title: "Wazuh SIEM & XDR", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p5-8", title: "Microsoft Defender for Endpoint", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-9", title: "VirusTotal Malware Analysis", estimatedHours: 4, difficulty: "Beginner", completed: true, notes: "File hash lookup and VT Graph relation map." },
      { id: "p5-10", title: "urlscan.io Web Triage", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "" },
      { id: "p5-11", title: "WHOIS Domain Lookup", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "" },
      { id: "p5-12", title: "AbuseIPDB Threat Reputation", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "" },
      { id: "p5-13", title: "Zscaler Cloud Security", estimatedHours: 5, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p5-14", title: "IPVoid OSINT Investigation", estimatedHours: 3, difficulty: "Beginner", completed: true, notes: "" }
    ]
  },
  {
    phaseId: 6,
    title: "Phase 6: SOC Analyst Operations",
    description: "Windows/Linux event log triage, incident response, threat hunting, detection engineering.",
    completed: false,
    topics: [
      { id: "p6-1", title: "Windows Event Logs & Sysmon", estimatedHours: 12, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-2", title: "Linux System & Auth Logs", estimatedHours: 10, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-3", title: "Incident Response Lifecycle (PICERL)", estimatedHours: 12, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p6-4", title: "Threat Hunting Methodologies", estimatedHours: 14, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p6-5", title: "Email Header & Phishing Analysis", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-6", title: "IOC Extraction & Triage", estimatedHours: 8, difficulty: "Intermediate", completed: false, notes: "" },
      { id: "p6-7", title: "MITRE ATT&CK Triage", estimatedHours: 10, difficulty: "Advanced", completed: false, notes: "" },
      { id: "p6-8", title: "Detection Engineering & Sigma Rules", estimatedHours: 15, difficulty: "Advanced", completed: false, notes: "" }
    ]
  }
];

const defaultInitialNotes = [
  {
    id: 'n-1',
    title: 'Wireshark Display Filters Cheat Sheet',
    topic: 'Packet Analysis',
    content: '### Key Filters for SOC Triage:\n- `ip.addr == 192.168.1.1` - Filter IP traffic\n- `tcp.flags.syn == 1 && tcp.flags.ack == 0` - SYN packets for port scan triage\n- `dns.flags.response == 0` - DNS queries\n- `http.request.method == "POST"` - Web form submissions',
    tags: ['Wireshark', 'SOC', 'Filters'],
    phaseId: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'n-2',
    title: 'Nmap Scan Command Cheat Sheet',
    topic: 'Reconnaissance',
    content: '### Preferred Scan Syntax:\n`nmap -sC -sV -p- -T4 --min-rate 1000 10.10.10.x -oA target_scan`\n- `-sC`: Default scripts\n- `-sV`: Service versioning\n- `-p-`: Scan all 65535 ports',
    tags: ['Nmap', 'Recon', 'Tools'],
    phaseId: 2,
    createdAt: new Date().toISOString()
  }
];

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('sentinel_tasks');
    return saved ? JSON.parse(saved) : defaultInitialTasks;
  });

  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem('sentinel_roadmap');
    return saved ? JSON.parse(saved) : defaultInitialRoadmap;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('sentinel_notes');
    return saved ? JSON.parse(saved) : defaultInitialNotes;
  });

  const [studyLogs, setStudyLogs] = useState(() => {
    const saved = localStorage.getItem('sentinel_studylogs');
    return saved ? JSON.parse(saved) : [
      { date: '2026-07-24', hours: 2.5, sessions: 3 },
      { date: '2026-07-25', hours: 3.0, sessions: 4 },
      { date: '2026-07-26', hours: 4.5, sessions: 5 },
      { date: '2026-07-27', hours: 2.0, sessions: 2 },
      { date: '2026-07-28', hours: 3.5, sessions: 4 },
      { date: '2026-07-29', hours: 5.0, sessions: 6 },
      { date: '2026-07-30', hours: 4.5, sessions: 5 },
    ];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sentinel_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('sentinel_roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem('sentinel_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('sentinel_studylogs', JSON.stringify(studyLogs));
  }, [studyLogs]);

  // Fetch from server if available
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const [tasksRes, roadmapRes, notesRes] = await Promise.all([
          API.get('/tasks'),
          API.get('/roadmap'),
          API.get('/notes')
        ]);
        if (tasksRes.data && Array.isArray(tasksRes.data)) setTasks(tasksRes.data);
        if (roadmapRes.data && Array.isArray(roadmapRes.data)) setRoadmap(roadmapRes.data);
        if (notesRes.data && Array.isArray(notesRes.data)) setNotes(notesRes.data);
      } catch (err) {
        // Quiet fallback to local state
      }
    };
    syncWithBackend();
  }, []);

  // --- Task Methods ---
  const addTask = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData);
      setTasks(prev => [res.data, ...prev]);
    } catch (err) {
      const newTask = {
        id: `t-${Date.now()}`,
        ...taskData,
        status: 'Pending',
        estimatedTimeHours: Number(taskData.estimatedTimeHours) || 1,
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const res = await API.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(t => (t.id === id || t._id === id) ? res.data : t));
    } catch (err) {
      setTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, ...taskData } : t));
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
    } catch (err) {}
    setTasks(prev => prev.filter(t => t.id !== id && t._id !== id));
  };

  const toggleTaskStatus = async (id) => {
    const target = tasks.find(t => t.id === id || t._id === id);
    if (!target) return;
    const newStatus = target.status === 'Completed' ? 'Pending' : 'Completed';
    
    if (newStatus === 'Completed') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }

    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
    } catch (err) {}

    setTasks(prev => prev.map(t => (t.id === id || t._id === id) ? { ...t, status: newStatus } : t));
  };

  // --- Roadmap Methods ---
  const toggleTopicStatus = async (phaseId, topicId, notesText) => {
    let phaseCompletedNow = false;
    let newRoadmap = roadmap.map(phase => {
      if (phase.phaseId === phaseId) {
        const updatedTopics = phase.topics.map(topic => {
          if (topic.id === topicId) {
            const nextCompleted = !topic.completed;
            return {
              ...topic,
              completed: nextCompleted,
              notes: notesText !== undefined ? notesText : topic.notes
            };
          }
          return topic;
        });

        const allCompleted = updatedTopics.every(t => t.completed);
        if (allCompleted && !phase.completed) {
          phaseCompletedNow = true;
        }

        return {
          ...phase,
          topics: updatedTopics,
          completed: allCompleted
        };
      }
      return phase;
    });

    if (phaseCompletedNow) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }

    setRoadmap(newRoadmap);

    try {
      const topicItem = newRoadmap.find(p => p.phaseId === phaseId)?.topics.find(t => t.id === topicId);
      await API.post('/roadmap/topic', {
        phaseId,
        topicId,
        completed: topicItem?.completed,
        notes: topicItem?.notes
      });
    } catch (err) {}
  };

  const saveTopicNotes = async (phaseId, topicId, notesText) => {
    setRoadmap(prev => prev.map(phase => {
      if (phase.phaseId === phaseId) {
        return {
          ...phase,
          topics: phase.topics.map(t => t.id === topicId ? { ...t, notes: notesText } : t)
        };
      }
      return phase;
    }));

    try {
      await API.post('/roadmap/topic', { phaseId, topicId, notes: notesText });
    } catch (err) {}
  };

  // --- Note Methods ---
  const addNote = async (noteData) => {
    try {
      const res = await API.post('/notes', noteData);
      setNotes(prev => [res.data, ...prev]);
    } catch (err) {
      const newNote = {
        id: `n-${Date.now()}`,
        ...noteData,
        createdAt: new Date().toISOString()
      };
      setNotes(prev => [newNote, ...prev]);
    }
  };

  const editNote = async (id, noteData) => {
    try {
      const res = await API.put(`/notes/${id}`, noteData);
      setNotes(prev => prev.map(n => (n.id === id || n._id === id) ? res.data : n));
    } catch (err) {
      setNotes(prev => prev.map(n => (n.id === id || n._id === id) ? { ...n, ...noteData } : n));
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
    } catch (err) {}
    setNotes(prev => prev.filter(n => n.id !== id && n._id !== id));
  };

  const logStudySession = (minutes) => {
    const today = new Date().toISOString().split('T')[0];
    const addedHours = Number((minutes / 60).toFixed(2));
    
    setStudyLogs(prev => {
      const existingIdx = prev.findIndex(l => l.date === today);
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          hours: Number((updated[existingIdx].hours + addedHours).toFixed(2)),
          sessions: updated[existingIdx].sessions + 1
        };
        return updated;
      }
      return [...prev, { date: today, hours: addedHours, sessions: 1 }];
    });
  };

  // --- Calculated Metrics ---
  const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;
  const remainingTasksCount = tasks.filter(t => t.status !== 'Completed').length;
  const totalTasksCount = tasks.length;
  const taskCompletionPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  // Roadmap metrics
  let totalTopics = 0;
  let completedTopics = 0;
  let totalRoadmapHours = 0;
  let completedRoadmapHours = 0;

  roadmap.forEach(phase => {
    phase.topics.forEach(topic => {
      totalTopics += 1;
      totalRoadmapHours += topic.estimatedHours || 0;
      if (topic.completed) {
        completedTopics += 1;
        completedRoadmapHours += topic.estimatedHours || 0;
      }
    });
  });

  const roadmapCompletionPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const completedPhasesCount = roadmap.filter(p => p.topics.every(t => t.completed)).length;

  return (
    <AppContext.Provider value={{
      tasks,
      roadmap,
      notes,
      studyLogs,
      addTask,
      editTask,
      deleteTask,
      toggleTaskStatus,
      toggleTopicStatus,
      saveTopicNotes,
      addNote,
      editNote,
      deleteNote,
      logStudySession,
      metrics: {
        completedTasksCount,
        remainingTasksCount,
        totalTasksCount,
        taskCompletionPercentage,
        totalTopics,
        completedTopics,
        roadmapCompletionPercentage,
        completedPhasesCount,
        totalRoadmapHours,
        completedRoadmapHours,
      }
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
