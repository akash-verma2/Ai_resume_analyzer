import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EnhancvFooter from './components/EnhancvFooter';
import Dashboard from './pages/Dashboard';
import ResumeAnalysis from './pages/ResumeAnalysis';
import JobMatcher from './pages/JobMatcher';
import SkillGapRoadmap from './pages/SkillGapRoadmap';
import ResumeBuilder from './pages/ResumeBuilder';
import ApplicationTracker from './pages/ApplicationTracker';
import MockInterview from './pages/MockInterview';
import CompareResumes from './pages/CompareResumes';
import AdminPortal from './pages/AdminPortal';
import Login from './pages/Login';
import Register from './pages/Register';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedResume, setSelectedResume] = useState(null);
  const [selectedJobForInterview, setSelectedJobForInterview] = useState(null);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            setActiveTab={setActiveTab}
            selectedResume={selectedResume}
            setSelectedResume={setSelectedResume}
          />
        );
      case 'analyzer':
        return (
          <ResumeAnalysis
            resume={selectedResume}
            onResumeChange={(newRes) => setSelectedResume(newRes)}
            setActiveTab={setActiveTab}
          />
        );
      case 'job-matcher':
        return (
          <JobMatcher
            resume={selectedResume}
            setActiveTab={setActiveTab}
            setSelectedJobForInterview={setSelectedJobForInterview}
          />
        );
      case 'skill-gap':
        return <SkillGapRoadmap resume={selectedResume} />;
      case 'builder':
        return <ResumeBuilder />;
      case 'tracker':
        return <ApplicationTracker />;
      case 'mock-interview':
        return <MockInterview selectedJob={selectedJobForInterview} />;
      case 'compare':
        return <CompareResumes />;
      case 'admin':
        return <AdminPortal />;
      case 'login':
        return <Login setActiveTab={setActiveTab} />;
      case 'register':
        return <Register setActiveTab={setActiveTab} />;
      default:
        return (
          <Dashboard
            setActiveTab={setActiveTab}
            selectedResume={selectedResume}
            setSelectedResume={setSelectedResume}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-surface-900 flex flex-col font-sans selection:bg-brand-400/20 selection:text-surface-900">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar — visible on inner pages at lg breakpoint */}
        {activeTab !== 'dashboard' && activeTab !== 'login' && activeTab !== 'register' && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Content Viewport with page transition */}
        <main 
          key={activeTab}
          className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full animate-fadeIn ${
            activeTab === 'dashboard' ? 'w-full' : ''
          }`}
        >
          {renderActivePage()}
        </main>
      </div>

      {/* Footer */}
      <EnhancvFooter setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
