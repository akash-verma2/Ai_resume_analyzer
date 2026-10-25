import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Lock, Mail, User, Briefcase, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const Register = ({ setActiveTab }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await register(name, email, password, targetRole);
      setActiveTab('dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
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
            Create Candidate Profile
          </h1>
          <p className="text-xs text-surface-600 font-medium">
            Join CreatiCV to audit resumes, analyze missing skills, and discover matched tech jobs.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-surface-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aman Sharma"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-surface-300 rounded-xl text-surface-900 placeholder-surface-400 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-surface-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aman@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-surface-300 rounded-xl text-surface-900 placeholder-surface-400 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-surface-700 mb-1">Target Engineering Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="Full Stack Developer"
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-surface-300 rounded-xl text-surface-900 placeholder-surface-400 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-surface-700 mb-1">Create Password</label>
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
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-surface-950" /> : <span>Create Account</span>}
          </button>
        </form>

        <div className="text-center text-xs text-surface-600 font-medium">
          <span>Already registered? </span>
          <button
            onClick={() => setActiveTab('login')}
            className="text-brand-600 hover:text-brand-700 hover:underline font-bold"
          >
            Sign In Here
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;
