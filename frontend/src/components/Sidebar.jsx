import React from 'react';
import {
  LayoutDashboard,
  FileSearch,
  Target,
  Compass,
  FileEdit,
  Kanban,
  MessageSquareCode,
  GitCompare,
  Shield,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Home & Overview', icon: LayoutDashboard },
  { id: 'analyzer', label: 'Resume Checker & ATS', icon: FileSearch, badge: '27 Checks' },
  { id: 'job-matcher', label: 'AI Job Matcher', icon: Target, badge: 'Algorithm' },
  { id: 'skill-gap', label: 'Skill Gap & Roadmap', icon: Compass, badge: '3 Phases' },
  { id: 'builder', label: 'AI Resume Builder', icon: FileEdit },
  { id: 'tracker', label: 'Application Tracker', icon: Kanban },
  { id: 'mock-interview', label: 'AI Mock Interview', icon: MessageSquareCode, badge: 'AI' },
  { id: 'compare', label: 'Version Comparator', icon: GitCompare },
  { id: 'admin', label: 'Admin Portal', icon: Shield, adminOnly: true },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-surface-200 p-4 flex flex-col justify-between shrink-0 hidden lg:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        
        {/* Navigation Group */}
        <div>
          <div className="text-[10px] font-bold text-surface-400 uppercase tracking-widest px-3 mb-2.5 font-heading">
            Project Navigation
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              if (item.adminOnly && user?.role !== 'admin') return null;
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-400 text-surface-900 font-bold shadow-brand-sm'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? 'text-surface-900' : 'text-surface-400 group-hover:text-surface-600'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-surface-900/15 text-surface-900'
                        : 'bg-brand-400/10 text-brand-400 border border-brand-400/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* CSE Defense Footer Card */}
      <div className="bg-gradient-to-br from-surface-50 to-brand-400/5 border border-surface-200 rounded-2xl p-4 text-xs shadow-sm">
        <div className="flex items-center gap-2 text-brand-400 font-bold mb-1.5">
          <BookOpen className="w-4 h-4" />
          <span>CSE Defense Mode</span>
        </div>
        <p className="text-surface-500 text-[11px] leading-relaxed mb-2.5">
          Architecture: Node.js + Python FastAPI + MongoDB. Dual-score algorithm.
        </p>
        <div className="flex items-center justify-between pt-2.5 border-t border-surface-200 text-[10px] text-surface-400">
          <span>Standards</span>
          <span className="font-mono text-brand-400 font-bold">IEEE 830</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
