import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "What is an ATS resume checker?",
    a: "An ATS resume checker evaluates how well your resume can be scanned and indexed by Applicant Tracking Systems (such as Workday, Greenhouse, and Lever). It verifies standard section headings, contact information readability, file integrity, and keyword density against industry standards."
  },
  {
    q: "How is the ATS score calculated?",
    a: "Our system calculates an ATS score (0-100) using a transparent multi-axis rubric: Section Completeness (25%), Skill Density & Taxonomy (30%), Quantified Metrics & Action Verbs (25%), and Formatting & Length (20%). A score higher than 80 indicates that your resume is interview-ready."
  },
  {
    q: "Can an ATS read PDF resumes?",
    a: "Yes. Contrary to popular internet myths, modern ATS systems have native support for text-based PDFs. In fact, research demonstrates that PDFs maintain exact typography, margins, and section ordering without the device-dependent layout shifts of Word documents."
  },
  {
    q: "How does the AI Job Matching algorithm work?",
    a: "Unlike opaque 'black box' AI tools, CreatiCV uses an explainable dual-score mathematical formula: Match Score = (0.70 × Skill Coverage) + (0.30 × TF-IDF Cosine Semantic Similarity). It separates matched competencies from missing requirements so you know exactly why you received your score."
  },
  {
    q: "How can I improve my resume score?",
    a: "Start by quantifying your accomplishments with measurable percentages (e.g. 'reduced latency by 35%'). Begin bullet points with active engineering verbs ('Architected', 'Implemented', 'Automated'). Ensure standard headings are used and essential links (GitHub, LinkedIn) are present."
  }
];

const EnhancvFaq = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 border-t border-surface-200 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="badge-brand inline-block mb-3 uppercase tracking-widest">
          Knowledge Base
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 font-heading tracking-tight leading-tight">
          Frequently asked questions
        </h2>
        <p className="text-surface-600 text-xs sm:text-sm mt-2 font-medium">
          Clear answers on ATS compliance, parsing accuracy, and job matching algorithms.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="enhancv-card bg-white rounded-2xl border border-surface-200 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-brand-500 transition-colors"
              >
                <span className="text-sm font-bold text-surface-900 font-heading">
                  {item.q}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? 'bg-brand-400 text-surface-950 font-bold' : 'bg-surface-100 text-surface-500'
                }`}>
                  {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-surface-700 leading-relaxed border-t border-surface-100 animate-fadeIn font-medium">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EnhancvFaq;
