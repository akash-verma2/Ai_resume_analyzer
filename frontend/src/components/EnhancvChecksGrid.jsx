import React from 'react';
import {
  FileText,
  Layers,
  Edit3,
  Target,
  Flag,
  Award,
  Check
} from 'lucide-react';

const CATEGORIES = [
  {
    title: "ATS Essentials",
    icon: FileText,
    iconColor: "text-brand-500 bg-brand-50 border-brand-200",
    checks: [
      "File format and size validation (PDF & DOCX)",
      "ATS-friendly layout & parseable structure",
      "Professional email address detection",
      "Header links & contact compliance",
      "Standard resume file naming convention",
      "Consistent chronology & date format"
    ]
  },
  {
    title: "Resume Sections",
    icon: Layers,
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    checks: [
      "Essential standard sections (Summary, Skills, Exp, Edu)",
      "Comprehensive contact info (Phone, Email, Profiles)",
      "Reverse chronological section ordering"
    ]
  },
  {
    title: "Content & Impact",
    icon: Edit3,
    iconColor: "text-purple-600 bg-purple-50 border-purple-200",
    checks: [
      "Overall ATS parseability rate (0-100)",
      "Quantifying impact with AI rewrite suggestions",
      "Repetition of words and buzzword reduction",
      "Spelling, grammar and tone clarity",
      "Bullet length and structural consistency"
    ]
  },
  {
    title: "Job Tailoring",
    icon: Target,
    iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    checks: [
      "Hard skills match (500+ tech taxonomy)",
      "Soft skills & collaboration signals",
      "Strong action verbs (Architected, Optimized, etc.)",
      "Targeted job title & role alignment"
    ]
  },
  {
    title: "Recruiter Red Flags",
    icon: Flag,
    iconColor: "text-rose-600 bg-rose-50 border-rose-200",
    checks: [
      "Resume credibility & verifiable achievements",
      "Interview risk signals & ambiguous claims",
      "Peer benchmarking against candidate cohort",
      "LinkedIn & GitHub profile match"
    ]
  },
  {
    title: "Seniority & Impact",
    icon: Award,
    iconColor: "text-sky-600 bg-sky-50 border-sky-200",
    checks: [
      "Career progression & milestone trajectory",
      "Concrete technical skills evidence",
      "Leadership signals & project ownership",
      "Addressing employment gaps gracefully"
    ]
  }
];

const EnhancvChecksGrid = () => {
  return (
    <section className="py-12 border-t border-surface-200">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="badge-brand inline-block mb-3 uppercase tracking-widest">
          27 Crucial Checks
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 font-heading tracking-tight leading-tight">
          The AI-powered Resume Checker goes beyond typos and punctuation
        </h2>
        <p className="text-surface-700 text-xs sm:text-sm mt-3 leading-relaxed font-medium">
          We’ve built in transparent NLP models to check your resume against what both ATS software and human recruiters look for. The tool evaluates 27 crucial benchmarks across 6 core categories:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200/80 hover:border-brand-300 hover:shadow-brand transition-all flex flex-col justify-between"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.iconColor} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-surface-900 text-base">
                      {cat.title}
                    </h3>
                    <span className="text-[11px] text-surface-500 font-semibold">
                      {cat.checks.length} Quality Benchmarks
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-surface-100">
                  {cat.checks.map((checkText, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5 text-xs text-surface-800">
                      <div className="w-4 h-4 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 border border-brand-200">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium leading-snug">{checkText}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-surface-100 flex items-center justify-between text-[11px] font-bold text-surface-500">
                <span>Category {idx + 1} of 6</span>
                <span className="text-brand-500 font-semibold">Verified against 2026 Standards</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EnhancvChecksGrid;
