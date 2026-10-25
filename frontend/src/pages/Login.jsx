import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Lock, Mail, UserCheck, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const Login = ({ setActiveTab }) => {
  const { login, quickDemoLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await login(email, password);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStudent = () => {
    quickDemoLogin('user');
    setActiveTab('dashboard');
  };

  const handleQuickAdmin = () => {
    quickDemoLogin('admin');
    setActiveTab('admin');
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-fadeIn">
      <div className="enhancv-card bg-white rounded-3xl p-8 border border-surface-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-400 to-brand-600 flex items-center justify-center mx-auto shadow-brand">
            <Sparkles className="w-6 h-6 text-surface-950 font-black" />
          </div>
          <h1 className="text-2xl font-extrabold text-surface-900 font-heading">
            Welcome to CreatiCV
          </h1>
          <p className="text-xs text-surface-600 font-medium">
            AI-Powered Resume Analyzer & Job Matcher Platform
          </p>
        </div>

        {/* Quick Viva Demo Access Shortcuts */}
        <div className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 space-y-2 text-xs">
          <span className="text-[10px] uppercase font-bold text-surface-700 tracking-wider block">
            Instant Viva Demo Access (1-Click):
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickStudent}
              className="px-2.5 py-2 rounded-xl bg-white hover:bg-surface-100 text-surface-900 border border-surface-200 font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-2xs hover:border-brand-400"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Student Mode</span>
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="px-2.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold flex items-center justify-center gap-1.5 transition-all text-xs shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Faculty Admin</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-surface-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@student.edu"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-surface-300 rounded-xl text-surface-900 placeholder-surface-400 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-surface-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-surface-300 rounded-xl text-surface-900 placeholder-surface-400 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-brand py-2.5 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-surface-950" /> : <span>Sign In</span>}
          </button>
        </form>

        <div className="text-center text-xs text-surface-600 font-medium">
          <span>New to CreatiCV? </span>
          <button
            onClick={() => setActiveTab('register')}
            className="text-brand-600 hover:text-brand-700 hover:underline font-bold"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
