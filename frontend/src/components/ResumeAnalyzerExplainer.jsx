import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Brain,
  FileSearch,
  Target,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Automated Document Scanning",
    subtitle: "Text & Structure Extraction",
    desc: "Using NLP (Natural Language Processing) and document extractors (PyPDF, python-docx), the system converts your PDF/DOCX into machine-readable text while mapping essential sections (Summary, Skills, Experience, Education).",
    icon: FileSearch,
    color: "text-brand-600 bg-brand-50 border-brand-200"
  },
  {
    step: "02",
    title: "Mistakes & Skill Gap Detection",
    subtitle: "500+ Skill Taxonomy Match",
    desc: "The AI cross-checks your competencies against a database of 500+ technical, tool, and soft skills. It detects missing mandatory skills, weak responsibilities, lack of measurable metrics, and formatting issues.",
    icon: Search,
    color: "text-purple-700 bg-purple-50 border-purple-200"
  },
  {
    step: "03",
    title: "Targeted Improvement & Shortlisting",
    subtitle: "ATS Score & Actionable Tips",
    desc: "Generates an ATS score (0-100) and provides categorized tips with action verb rewrites and metric enhancements to maximize your chances of getting shortlisted by recruiters and applicant tracking systems.",
    icon: TrendingUp,
    color: "text-sky-700 bg-sky-50 border-sky-200"
  }
];

const ResumeAnalyzerExplainer = ({ onStartAnalysis }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="enhancv-card rounded-3xl p-6 sm:p-10 border border-surface-200/90 shadow-xl relative overflow-hidden my-8 bg-white">
      
      {/* Decorative gradient light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner with Exact User Definitions */}
      <div className="max-w-3xl mb-8 relative z-10">
        <div className="badge-brand inline-flex items-center gap-2 mb-3">
          <Brain className="w-3.5 h-3.5" />
          <span>WHAT IS AN AI RESUME ANALYZER?</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-surface-900 font-heading tracking-tight leading-tight">
          AI Resume Analysis & Mistake Detection
        </h2>

        {/* User's Exact Definition Block */}
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-surface-50 border border-surface-200 shadow-sm space-y-2.5">
          <p className="text-sm sm:text-base text-surface-900 font-bold leading-relaxed">
            "An <span className="text-brand-500">AI Resume Analyzer</span> is a software application that uses <span className="text-surface-950 font-black">Artificial Intelligence (AI)</span> to check a person's resume and tell them how good it is for a particular job."
          </p>
          <p className="text-xs sm:text-sm text-surface-800 font-medium leading-relaxed border-t border-surface-200 pt-2.5">
            In easy words, it <strong className="text-brand-500 font-bold">checks your resume</strong>, <strong className="text-amber-700 font-bold">finds mistakes or missing skills</strong>, and <strong className="text-purple-700 font-bold">suggests how to improve it</strong> so you have a much higher chance of getting shortlisted for a job.
          </p>
        </div>
      </div>

      {/* 3 Step Interactive Process Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeStep === idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-brand-400 shadow-brand scale-[1.02]'
                  : 'bg-surface-50/80 border-surface-200 hover:border-surface-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-black text-surface-500">
                    STEP {item.step}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-surface-900 mb-1">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-brand-600 block mb-3">
                  {item.subtitle}
                </span>

                <p className="text-xs text-surface-700 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-200/60 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${isSelected ? 'text-brand-500' : 'text-surface-400'}`}>
                  {isSelected ? 'Active Step' : 'Click to inspect'}
                </span>
                <span className="text-xs font-mono font-bold text-surface-400">
                  0{idx + 1}/03
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Explanation Box for currently selected step */}
      <div className="mt-6 p-5 rounded-2xl bg-surface-50/70 border border-surface-200 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200 text-brand-500 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-surface-900 font-heading">
              Ready to see this analysis on your resume?
            </h4>
            <p className="text-xs text-surface-600">
              Upload your resume above to run these 3 stages automatically in under 3 seconds.
            </p>
          </div>
        </div>

        {onStartAnalysis && (
          <button
            onClick={onStartAnalysis}
            className="btn-brand shrink-0 inline-flex items-center gap-2"
          >
            <span>Analyze Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </section>
  );
};

export default ResumeAnalyzerExplainer;
