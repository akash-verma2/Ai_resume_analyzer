import React, { useState } from 'react';
import {
  FileEdit,
  Target,
  Compass,
  Kanban,
  MessageSquareCode,
  GitCompare,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const TABS = [
  {
    id: 'analyzer',
    label: 'Resume Checker',
    title: 'Turn audit feedback into a stronger resume',
    desc: 'Your report flags what to fix. Our ATS evaluator checks your resume against what modern applicant tracking systems and human recruiters scan for.',
    bullets: [
      '27 crucial criteria evaluated across 6 categories',
      'Actionable recommendations to pass automated filters',
      'Instant skill taxonomy classification across 500+ tech stacks'
    ],
    ctaText: 'Open Full Resume Audit'
  },
  {
    id: 'job-matcher',
    label: 'AI Job Matcher',
    title: 'Match your resume with active job listings',
    desc: 'Describe the role you want or match your parsed resume across active tech job descriptions, scored with an explainable hybrid formula.',
    bullets: [
      '70% Skill Coverage score + 30% TF-IDF Cosine Similarity',
      'Separate breakdown of matched vs missing skills',
      'Filter by role, seniority, and compatibility score threshold'
    ],
    ctaText: 'Find Matching Jobs'
  },
  {
    id: 'skill-gap',
    label: 'Skill Gap & Roadmap',
    title: 'Bridge missing skills with a structured learning sequence',
    desc: 'Stop guessing which tech stack to learn next. Get a personalized 3-phase curriculum with documentation links and capstone portfolio projects.',
    bullets: [
      'Targeted for your specific engineering role',
      'Curated official documentation and video crash courses',
      'Hands-on milestone coding deliverables'
    ],
    ctaText: 'View Learning Roadmap'
  },
  {
    id: 'builder',
    label: 'Resume Builder',
    title: 'Build an ATS-optimized resume in minutes',
    desc: 'Transform your experience into an interactive, recruiter-scannable format with live paper preview and 1-click PDF download.',
    bullets: [
      'Pre-formatted standard sections that parsers understand',
      'AI rewriting for bullet points and professional summaries',
      'Clean printable layout formatted for US & international hiring'
    ],
    ctaText: 'Start Building Resume'
  },
  {
    id: 'tracker',
    label: 'Job Tracker',
    title: 'Keep every application organized in one view',
    desc: 'Manage your job search across a Kanban pipeline holding each version, interview stage, contact deadline, and custom notes.',
    bullets: [
      'Organize across Saved, Applied, Interview, Offer, and Rejected',
      'Log recruiter notes and scheduled interview rounds',
      'Monitor pipeline metrics and conversion performance'
    ],
    ctaText: 'Open Application Tracker'
  },
  {
    id: 'mock-interview',
    label: 'Interview Help',
    title: 'Prepare for the interviews your resume earns',
    desc: 'When your resume gets you the interview call, practice role-specific technical and behavioral questions generated from the job description.',
    bullets: [
      'Technical, system design, and behavioral STAR questions',
      'Instant automated scoring (0-100) with key topic hints',
      'Identifies strengths and topics needing more preparation'
    ],
    ctaText: 'Practice Mock Interview'
  },
  {
    id: 'compare',
    label: 'Version Comparator',
    title: 'Compare resume revisions side-by-side',
    desc: 'Ensure your changes actually increased your ATS score before applying. Compare baseline vs revised versions side-by-side.',
    bullets: [
      'Detect score delta (+/- points) in real-time',
      'Highlight newly recognized skills and keywords',
      'Academic improvement verdict for final year defense'
    ],
    ctaText: 'Compare Revisions'
  }
];

const PutScoreToWorkSection = ({ onSelectTab }) => {
  const [activeSubTab, setActiveSubTab] = useState('analyzer');

  const currentTab = TABS.find(t => t.id === activeSubTab) || TABS[0];

  return (
    <section className="py-12 border-t border-surface-200">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="badge-brand inline-block mb-3 uppercase tracking-widest">
          Complete Career Suite
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 font-heading tracking-tight leading-tight">
          Put your resume score to work
        </h2>
        <p className="text-surface-700 text-xs sm:text-sm mt-2 font-medium">
          Checking is step one. CreatiCV covers the rest of the application process: the rewrite, the matching, the tracking, and interview prep.
        </p>

        {/* Tab Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-brand-400 text-surface-950 font-bold shadow-brand'
                  : 'bg-white text-surface-700 hover:text-surface-900 border border-surface-200 hover:border-surface-300 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Spotlight Card */}
      <div className="enhancv-card bg-white rounded-3xl p-6 sm:p-10 border border-surface-200/90 max-w-4xl mx-auto shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="badge-brand inline-block">
              Module: {currentTab.label}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-surface-900 font-heading">
              {currentTab.title}
            </h3>
            <p className="text-xs sm:text-sm text-surface-700 leading-relaxed font-medium">
              {currentTab.desc}
            </p>

            <ul className="space-y-2.5 pt-2">
              {currentTab.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-surface-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onSelectTab(currentTab.id)}
                className="btn-brand-lg inline-flex items-center gap-2"
              >
                <span>{currentTab.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 bg-surface-50 border border-surface-200 rounded-2xl p-6 text-center space-y-3 shadow-inner">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-surface-900 font-heading">Integrated Platform Suite</h4>
            <p className="text-xs text-surface-600 leading-relaxed">
              All tools share parsed resume tokens and persistent application data across sessions.
            </p>
            <div className="pt-2 border-t border-surface-200 text-[11px] text-brand-600 font-mono font-bold">
              Live MERN + FastAPI NLP Architecture
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PutScoreToWorkSection;
