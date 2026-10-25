import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShieldCheck, FileCheck, TrendingUp, Zap } from 'lucide-react';

const HeroScoreScanner = ({ activeResume }) => {
  const score = activeResume?.atsScore || 88;
  const name = activeResume?.contact?.name || "Aman Sharma";
  const title = "Full Stack MERN Developer";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const checks = [
    { label: 'Hard & Soft Skills Density', value: '16 Matched', icon: Zap },
    { label: 'Quantifiable Impact Metrics', value: '+35% Latency', icon: TrendingUp },
    { label: 'Section Reading Order', value: 'Optimal', icon: CheckCircle2 },
  ];

  return (
    <div className={`relative w-full max-w-md mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Ambient glow */}
      <div className="absolute -inset-3 bg-gradient-to-br from-brand-400/15 via-purple-400/10 to-sky-400/10 rounded-[2rem] blur-2xl opacity-70 pointer-events-none animate-pulse" />

      {/* Main Scanner Card */}
      <div className="relative bg-white border border-surface-200 rounded-3xl p-6 shadow-elevated overflow-hidden">
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-400/5 to-transparent rounded-bl-full pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-100 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-400/15 to-brand-400/5 border border-brand-400/20 flex items-center justify-center text-brand-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-surface-900 font-heading">{name}</h4>
              <p className="text-[11px] text-surface-600 font-medium">{title}</p>
            </div>
          </div>

          <span className="badge-brand flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>ATS Certified</span>
          </span>
        </div>

        {/* Score Circle */}
        <div className="py-6 flex items-center justify-center gap-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Subtle glow ring */}
            <div className="absolute inset-1 rounded-full bg-brand-400/5 blur-md" />
            
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
              <circle
                cx="50" cy="50" r="40"
                stroke="#2DC08D"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={isVisible ? 251.2 - (score / 100) * 251.2 : 251.2}
                strokeLinecap="round"
                fill="transparent"
                style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s" }}
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-black text-surface-900 font-heading">{score}</span>
              <span className="text-[9px] block text-surface-500 font-black uppercase tracking-wider">/ 100</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="font-extrabold text-surface-900 text-sm font-heading">High ATS Compatibility</div>
            <p className="text-[11px] text-surface-600 leading-snug font-medium">
              Passed 25 of 27 automated recruitment benchmarks.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                Workday: Ready
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                Greenhouse: 98%
              </span>
            </div>
          </div>
        </div>

        {/* Check Items */}
        <div className="space-y-2 pt-4 border-t border-surface-100 text-xs">
          {checks.map((check, idx) => {
            const Icon = check.icon;
            return (
              <div 
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded-xl bg-surface-50/80 border border-surface-200/80 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                style={{ transitionDelay: `${0.5 + idx * 0.15}s` }}
              >
                <div className="flex items-center gap-2 text-surface-900 font-bold">
                  <Icon className="w-4 h-4 text-brand-400" />
                  <span>{check.label}</span>
                </div>
                <span className="font-mono text-brand-400 font-bold">{check.value}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HeroScoreScanner;
