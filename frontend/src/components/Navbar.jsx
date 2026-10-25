import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  LogOut,
  FileText,
  CheckCircle,
  Briefcase,
  Layers,
  FileEdit,
  Kanban,
  MessageSquareCode,
  Compass,
  GitCompare,
  Shield,
  Menu,
  X
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout, quickDemoLogin } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click-outside to dismiss dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on tab change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [activeTab]);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navigateTo = (tab) => {
    setActiveTab(tab);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const DropdownItem = ({ icon: Icon, label, sublabel, color, tab }) => (
    <button
      onClick={() => navigateTo(tab)}
      className="w-full text-left p-2.5 rounded-xl hover:bg-surface-50 flex items-start gap-3 transition-all duration-200 group"
    >
      <div className={`p-2 rounded-lg ${color} transition-transform group-hover:scale-110`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-bold text-surface-900">{label}</div>
        <div className="text-[11px] text-surface-500">{sublabel}</div>
      </div>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-surface-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => navigateTo('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-400 to-brand-500 flex items-center justify-center shadow-brand-sm group-hover:shadow-brand-md group-hover:scale-105 transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M4 12L9 17L20 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-xl text-surface-900 tracking-tight">
                Creati<span className="text-brand-400">CV</span>
              </span>
              <span className="badge-brand hidden sm:inline">
                ATS Checker
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium" ref={dropdownRef}>
            
            {/* Resume Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('resume')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                  ['analyzer', 'builder', 'compare'].includes(activeTab)
                    ? 'text-brand-400 font-bold'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                }`}
              >
                <span>Resume Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === 'resume' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'resume' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-surface-200 rounded-2xl p-2 shadow-elevated z-50 animate-slideDown">
                  <DropdownItem icon={CheckCircle} label="ATS Resume Checker" sublabel="27 crucial checks & quality score" color="bg-brand-400/10 text-brand-400" tab="analyzer" />
                  <DropdownItem icon={FileEdit} label="AI Resume Builder" sublabel="Live preview & PDF generator" color="bg-indigo-500/10 text-indigo-600" tab="builder" />
                  <DropdownItem icon={GitCompare} label="Version Comparator" sublabel="Side-by-side revision audit" color="bg-purple-500/10 text-purple-600" tab="compare" />
                </div>
              )}
            </div>

            {/* Job Matching Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('jobsearch')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                  ['job-matcher', 'skill-gap', 'tracker', 'mock-interview'].includes(activeTab)
                    ? 'text-brand-400 font-bold'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                }`}
              >
                <span>Job Matching & AI</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === 'jobsearch' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'jobsearch' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-surface-200 rounded-2xl p-2 shadow-elevated z-50 animate-slideDown">
                  <DropdownItem icon={Briefcase} label="AI Job Matcher" sublabel="Explainable dual-score ranking" color="bg-brand-400/10 text-brand-400" tab="job-matcher" />
                  <DropdownItem icon={Compass} label="Skill Gap & Roadmap" sublabel="3-phase personalized curriculum" color="bg-sky-500/10 text-sky-600" tab="skill-gap" />
                  <DropdownItem icon={Kanban} label="Application Tracker" sublabel="Kanban stage pipeline" color="bg-amber-500/10 text-amber-600" tab="tracker" />
                  <DropdownItem icon={MessageSquareCode} label="Mock Interview Help" sublabel="Automated technical rubric" color="bg-purple-500/10 text-purple-600" tab="mock-interview" />
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('dashboard')}
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'dashboard' ? 'text-brand-400 font-bold' : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigateTo('admin')}
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'text-brand-400 font-bold' : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-brand-400" />
              <span>Admin</span>
            </button>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Persona Switcher (Desktop) */}
          <div className="hidden sm:flex items-center bg-surface-100 border border-surface-200 rounded-xl p-1 text-xs">
            <button
              onClick={() => quickDemoLogin('user')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                user?.role === 'user' ? 'bg-brand-400 text-surface-900 font-bold shadow-brand-sm' : 'text-surface-600 hover:text-surface-900'
              }`}
              title="Test as CSE Student"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              onClick={() => quickDemoLogin('admin')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                user?.role === 'admin' ? 'bg-purple-600 text-white font-bold shadow-sm' : 'text-surface-600 hover:text-surface-900'
              }`}
              title="Test as Faculty Admin"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Faculty</span>
            </button>
          </div>

          {/* Profile / Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2 bg-surface-50 border border-surface-200 pl-3 pr-2 py-1.5 rounded-xl text-xs">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-400 to-brand-500 flex items-center justify-center font-bold text-white text-[11px] shadow-brand-sm">
                {user.name?.charAt(0) || 'U'}
              </div>
              <span className="text-surface-800 font-semibold hidden sm:inline max-w-[110px] truncate">{user.name}</span>
              <button
                onClick={logout}
                className="p-1 text-surface-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-all duration-200 ml-1"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('login')}
                className="text-xs font-semibold px-3 py-1.5 text-surface-600 hover:text-surface-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateTo('register')}
                className="btn-brand"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-surface-100 text-surface-600 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Full-Screen Slide Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-white border-b border-surface-200 shadow-elevated z-50 animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            
            <div className="text-[10px] font-bold text-surface-400 uppercase tracking-widest px-3 mb-2">Resume Tools</div>
            {[
              { tab: 'analyzer', label: 'ATS Resume Checker', icon: CheckCircle },
              { tab: 'builder', label: 'AI Resume Builder', icon: FileEdit },
              { tab: 'compare', label: 'Version Comparator', icon: GitCompare },
            ].map(({ tab, label, icon: Icon }) => (
              <button
                key={tab}
                onClick={() => navigateTo(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-brand-400 text-surface-900 shadow-brand-sm' : 'text-surface-700 hover:bg-surface-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}

            <div className="section-divider my-3" />
            <div className="text-[10px] font-bold text-surface-400 uppercase tracking-widest px-3 mb-2">Job Search & AI</div>
            {[
              { tab: 'job-matcher', label: 'AI Job Matcher', icon: Briefcase },
              { tab: 'skill-gap', label: 'Skill Gap & Roadmap', icon: Compass },
              { tab: 'tracker', label: 'Application Tracker', icon: Kanban },
              { tab: 'mock-interview', label: 'Mock Interview', icon: MessageSquareCode },
            ].map(({ tab, label, icon: Icon }) => (
              <button
                key={tab}
                onClick={() => navigateTo(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-brand-400 text-surface-900 shadow-brand-sm' : 'text-surface-700 hover:bg-surface-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}

            <div className="section-divider my-3" />
            {[
              { tab: 'dashboard', label: 'Dashboard', icon: Layers },
              { tab: 'admin', label: 'Admin Portal', icon: Shield },
            ].map(({ tab, label, icon: Icon }) => (
              <button
                key={tab}
                onClick={() => navigateTo(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab ? 'bg-brand-400 text-surface-900 shadow-brand-sm' : 'text-surface-700 hover:bg-surface-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}

            {/* Mobile Persona Switcher */}
            <div className="section-divider my-3" />
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => { quickDemoLogin('user'); setMobileMenuOpen(false); }}
                className={`flex-1 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  user?.role === 'user' ? 'bg-brand-400 text-surface-900 shadow-brand-sm' : 'bg-surface-100 text-surface-600 border border-surface-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                onClick={() => { quickDemoLogin('admin'); setMobileMenuOpen(false); }}
                className={`flex-1 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                  user?.role === 'admin' ? 'bg-purple-600 text-white shadow-sm' : 'bg-surface-100 text-surface-600 border border-surface-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Faculty</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
