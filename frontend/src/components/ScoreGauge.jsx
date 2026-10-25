import React, { useEffect, useState } from 'react';

const ScoreGauge = ({ score = 0, size = 180, label = "ATS Quality Score" }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  // Animate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedOffset(circumference - (score / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  let gradientId = "emerald-grad";
  let badgeClasses = "text-emerald-700 bg-emerald-50 border-emerald-200";
  let ratingText = "Excellent / Interview Ready";
  let glowColor = "rgba(16, 185, 129, 0.15)";

  if (score < 50) {
    gradientId = "rose-grad";
    badgeClasses = "text-rose-700 bg-rose-50 border-rose-200";
    ratingText = "Needs Critical Revisions";
    glowColor = "rgba(244, 63, 94, 0.12)";
  } else if (score < 75) {
    gradientId = "amber-grad";
    badgeClasses = "text-amber-700 bg-amber-50 border-amber-200";
    ratingText = "Moderate / Add Impact Metrics";
    glowColor = "rgba(245, 158, 11, 0.12)";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className="relative flex items-center justify-center" 
        style={{ width: size, height: size }}
      >
        {/* Ambient glow behind the gauge */}
        <div 
          className="absolute inset-4 rounded-full blur-2xl pointer-events-none" 
          style={{ background: glowColor }} 
        />

        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DC08D" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>

          {/* Track ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Score arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
            strokeLinecap="round"
            fill="transparent"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />
        </svg>

        {/* Center Label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold tracking-tight text-surface-900 font-heading">
            {score}
          </span>
          <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-widest mt-0.5">
            out of 100
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${badgeClasses}`}>
          {ratingText}
        </span>
        <p className="text-xs text-surface-500 mt-1 font-medium">{label}</p>
      </div>
    </div>
  );
};

export default ScoreGauge;
