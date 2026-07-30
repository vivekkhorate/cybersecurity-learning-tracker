import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sentinel_user');
    return saved ? JSON.parse(saved) : {
      id: 'demo_user_1',
      name: 'Alex Vance',
      email: 'alex.vance@sentinel.sec',
      role: 'SOC Analyst Tier 1 Aspirant',
      skillLevel: 'Intermediate',
      currentPhase: 2,
      todayGoal: 'Master Wireshark Packet Analysis and Nmap Scanning',
      streak: 7,
      avatar: 'cyber-agent-1'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('sentinel_token') || 'demo_token');

  useEffect(() => {
    localStorage.setItem('sentinel_user', JSON.stringify(user));
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('sentinel_token', res.data.token);
      return { success: true };
    } catch (err) {
      // Fallback demo login
      const demoUser = {
        id: 'demo_user_1',
        name: email.split('@')[0] || 'Alex Vance',
        email,
        role: 'SOC Analyst Tier 1 Aspirant',
        skillLevel: 'Intermediate',
        currentPhase: 2,
        todayGoal: 'Master Wireshark Packet Analysis',
        streak: 7,
        avatar: 'cyber-agent-1'
      };
      setUser(demoUser);
      setToken('demo_token');
      localStorage.setItem('sentinel_token', 'demo_token');
      return { success: true };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await API.post('/auth/register', { name, email, password, role });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('sentinel_token', res.data.token);
      return { success: true };
    } catch (err) {
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role: role || 'SOC Analyst Tier 1 Aspirant',
        skillLevel: 'Beginner',
        currentPhase: 1,
        todayGoal: 'Start IT Fundamentals & Networking Basics',
        streak: 1,
        avatar: 'cyber-agent-1'
      };
      setUser(newUser);
      setToken('demo_token');
      localStorage.setItem('sentinel_token', 'demo_token');
      return { success: true };
    }
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const logout = () => {
    localStorage.removeItem('sentinel_token');
    localStorage.removeItem('sentinel_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, updateUserProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
