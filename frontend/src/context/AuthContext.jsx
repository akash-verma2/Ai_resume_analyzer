import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data.user);
        } catch (err) {
          console.warn('Session expired or invalid, using guest profile.');
          localStorage.removeItem('token');
          setToken(null);
          // Set default guest student profile
          setUser({
            id: 'user_demo_01',
            name: 'CSE Final Year Student',
            email: 'student@campus.edu',
            role: 'user',
            targetRole: 'Full Stack Developer'
          });
        }
      } else {
        // Default guest user so visitors can immediately test features
        setUser({
          id: 'user_demo_01',
          name: 'CSE Final Year Student',
          email: 'student@campus.edu',
          role: 'user',
          targetRole: 'Full Stack Developer'
        });
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data.success) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    }
  };

  const register = async (userData) => {
    const res = await authAPI.register(userData);
    if (res.data.success) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return res.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const quickDemoLogin = (role = 'user') => {
    const demoUser = role === 'admin'
      ? { id: 'admin_demo_01', name: 'Department Faculty / Admin', email: 'admin@college.edu', role: 'admin', targetRole: 'Professor / Evaluator' }
      : { id: 'user_demo_01', name: 'Aman Sharma (CSE Student)', email: 'aman.sharma@example.com', role: 'user', targetRole: 'Full Stack Developer' };
    setUser(demoUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, quickDemoLogin, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
