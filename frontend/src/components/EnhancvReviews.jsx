import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const REVIEWS = [
  {
    name: "Nikhil K.",
    role: "Computer Science Graduate",
    date: "1 day ago",
    text: "Great product! Does a very good job in creating bespoke resumes tailored to job descriptions. Helped me identify that I was missing TypeScript and Docker from my application.",
    rating: 5
  },
  {
    name: "Ananya Sharma",
    role: "Full Stack Engineering Applicant",
    date: "2 days ago",
    text: "The 27 checks caught that my achievements were just job duties. The AI bullet point rewrite suggestions helped me quantify results with real percentages.",
    rating: 5
  },
  {
    name: "Dr. K. Raman",
    role: "Department Faculty Reviewer",
    date: "3 days ago",
    text: "Impressive project architecture. The dual-score formulation combining explicit skill coverage with TF-IDF cosine distance offers genuine explainability rather than a black box.",
    rating: 5
  }
];

const EnhancvReviews = () => {
  return (
    <section className="py-12 border-t border-surface-200">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-200 mb-3 text-xs shadow-sm">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="font-bold text-surface-900">4.8 Rating</span>
          <span className="text-surface-300">•</span>
          <span className="text-surface-600 font-medium">Trusted by students & faculty</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-900 font-heading tracking-tight leading-tight">
          Trusted by students, graduates & evaluators
        </h2>
        <p className="text-surface-600 text-xs sm:text-sm mt-2 font-medium">
          Real feedback on ATS parsability, job matchmaking, and interview readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200/90 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-surface-500 font-semibold">{rev.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-surface-800 leading-relaxed mb-6 font-normal">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-surface-100 flex items-center justify-between text-xs">
              <span className="font-bold text-surface-900">{rev.name}</span>
              <span className="text-[11px] text-surface-600 font-semibold">{rev.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnhancvReviews;
