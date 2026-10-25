import React, { useState, useEffect } from 'react';
import {
  FileText,
  Target,
  Compass,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  Award,
  ShieldCheck,
  Lock
} from 'lucide-react';
import ResumeUploader from '../components/ResumeUploader';
import HeroScoreScanner from '../components/HeroScoreScanner';
import ResumeAnalyzerExplainer from '../components/ResumeAnalyzerExplainer';
import EnhancvChecksGrid from '../components/EnhancvChecksGrid';
import TwoTierAtsSection from '../components/TwoTierAtsSection';
import AtsUnderstandingCheck from '../components/AtsUnderstandingCheck';
import PutScoreToWorkSection from '../components/PutScoreToWorkSection';
import EnhancvReviews from '../components/EnhancvReviews';
import EnhancvFaq from '../components/EnhancvFaq';
import { resumeAPI, jobAPI, applicationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = ({ setActiveTab, selectedResume, setSelectedResume }) => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resumesRes, jobsRes, appsRes] = await Promise.all([
          resumeAPI.getAll(),
          jobAPI.getAll(),
          applicationAPI.getAll()
        ]);

        const resList = resumesRes.data.resumes || [];
        setResumes(resList);
        setJobs(jobsRes.data.jobs || []);
        setApplications(appsRes.data.applications || []);

        if (!selectedResume && resList.length > 0) {
          setSelectedResume(resList[0]);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const activeResume = selectedResume || resumes[0];

  const stats = [
    { label: 'Checks Done', value: '27 Checks', color: 'text-brand-400' },
    { label: 'Taxonomy', value: '500+ Skills', color: 'text-surface-900' },
    { label: 'Average Speed', value: '< 3.0s', color: 'text-surface-900' },
  ];

  return (
    <div className="space-y-16 enhancv-mesh-bg">
      
      {/* HERO SECTION */}
      <section className="pt-6 sm:pt-10 pb-6 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="badge-brand inline-block mb-3 uppercase tracking-widest">
                AI RESUME CHECKER & ATS AUDITOR
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-surface-900 font-heading tracking-tight leading-tight">
                Is your resume <br className="hidden sm:inline" />
                <span className="text-brand-400">good enough?</span>
              </h1>

              <p className="text-surface-700 text-sm sm:text-base mt-4 leading-relaxed max-w-xl font-medium">
                A free and fast AI resume checker doing <strong className="text-surface-900 font-bold">27 crucial checks</strong> to ensure your resume's content, layout and design is technically compatible with applicant tracking systems and get you interview callbacks.
              </p>
            </div>

            {/* Uploader */}
            <div className="pt-2">
              <ResumeUploader
                onUploadSuccess={(newResume) => {
                  setSelectedResume(newResume);
                  setResumes([newResume, ...resumes]);
                  setActiveTab('analyzer');
                }}
              />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="section-divider col-span-3 mb-2" />
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white p-3 rounded-2xl border border-surface-200 shadow-sm text-center animate-fadeInUp`}
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <span className="text-[10px] text-surface-500 font-bold uppercase block">{stat.label}</span>
                  <span className={`text-base font-extrabold font-heading ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Score Scanner */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroScoreScanner activeResume={activeResume} />
          </div>

        </div>
      </section>

      {/* EXPLAINER SECTION */}
      <ResumeAnalyzerExplainer onStartAnalysis={() => setActiveTab('analyzer')} />

      {/* TWO-TIER ATS SECTION (Hardware Scanner & Running Meter) */}
      <TwoTierAtsSection
        onStartAnalysis={() => setActiveTab('analyzer')}
        setActiveTab={setActiveTab}
      />

      {/* ATS UNDERSTANDING CHECK (Animated Floating Resumes Moving Right and Left) */}
      <AtsUnderstandingCheck
        onStartAnalysis={() => setActiveTab('analyzer')}
        setActiveTab={setActiveTab}
      />

      {/* 27 CHECKS GRID */}
      <EnhancvChecksGrid />

      {/* PUT SCORE TO WORK */}
      <PutScoreToWorkSection onSelectTab={(tabId) => setActiveTab(tabId)} />

      {/* REVIEWS */}
      <EnhancvReviews />

      {/* FAQ */}
      <EnhancvFaq />

    </div>
  );
};

export default Dashboard;
