import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  BookmarkPlus,
  MessageSquareCode,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  CheckCheck
} from 'lucide-react';
import { applicationAPI } from '../services/api';

const JobCard = ({
  job,
  onPrepareInterview,
  onTrackSuccess,
  onApply,
  isApplied = false,
  applicationData = null
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [localApplied, setLocalApplied] = useState(false);

  const overallScore = job.overallScore !== undefined ? job.overallScore : (job.matchScore || 0);
  const skillScore = job.skillScore !== undefined ? job.skillScore : overallScore;
  const semanticScore = job.semanticScore !== undefined ? job.semanticScore : Math.round(overallScore * 0.9);

  const hasApplied = isApplied || localApplied || Boolean(applicationData);

  let badgeBg = "bg-brand-50 text-brand-700 border-brand-200";
  if (overallScore < 50) {
    badgeBg = "bg-rose-50 text-rose-700 border-rose-200";
  } else if (overallScore < 75) {
    badgeBg = "bg-amber-50 text-amber-800 border-amber-200";
  }

  const handleQuickTrackJob = async () => {
    try {
      setTracking(true);
      await applicationAPI.create({
        jobId: job.jobId || job._id,
        status: 'Saved',
        notes: `Saved from AI Job Matcher. Match score: ${overallScore}%.`,
        job: {
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          experienceLevel: job.experienceLevel
        }
      });
      setLocalApplied(true);
      if (onTrackSuccess) onTrackSuccess(job);
    } catch (err) {
      console.error(err);
      setLocalApplied(true);
    } finally {
      setTracking(false);
    }
  };

  return (
    <div className={`enhancv-card bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between hover:border-brand-300 hover:shadow-brand relative overflow-hidden ${
      hasApplied ? 'border-brand-300 ring-1 ring-brand-300/60 shadow-xs' : 'border-surface-200 shadow-sm'
    }`}>
      
      {/* Applied Ribbon Banner */}
      {hasApplied && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-600 to-brand-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1 z-10">
          <CheckCheck className="w-3 h-3" />
          <span>Applied ({applicationData?.status || 'In Pipeline'})</span>
        </div>
      )}

      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="pr-16">
            <h3 className="text-base sm:text-lg font-bold text-surface-900 font-heading hover:text-brand-500 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-surface-600 mt-1">
              <span className="flex items-center gap-1 font-bold text-surface-900">
                <Building2 className="w-3.5 h-3.5 text-brand-500" />
                {job.company}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-surface-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-surface-400" />
                {job.location}
              </span>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className={`px-3 py-1.5 rounded-2xl border flex flex-col items-center shrink-0 ${badgeBg}`}>
            <span className="text-base font-black font-heading leading-none">
              {overallScore}%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
              {overallScore >= 75 ? 'Strong Match' : overallScore >= 50 ? 'Good Fit' : 'Skill Gap'}
            </span>
          </div>
        </div>

        {/* Badges / Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-surface-700 mb-4">
          <span className="bg-surface-50 border border-surface-200 px-2.5 py-1 rounded-xl flex items-center gap-1 font-semibold text-surface-800">
            <Clock className="w-3 h-3 text-surface-400" />
            {job.experienceLevel || 'Entry-Level'}
          </span>
          <span className="bg-surface-50 border border-surface-200 px-2.5 py-1 rounded-xl font-semibold text-surface-800">
            {job.employmentType || 'Full-time'}
          </span>
          {job.salary && (
            <span className="bg-brand-50 border border-brand-200 text-brand-600 px-2.5 py-1 rounded-xl flex items-center gap-1 font-bold">
              <DollarSign className="w-3 h-3" />
              {job.salary}
            </span>
          )}
        </div>

        {/* Description snippet */}
        <p className="text-xs text-surface-700 line-clamp-2 mb-4 leading-relaxed font-normal">
          {job.description}
        </p>

        {/* Matched vs Missing Skills */}
        <div className="space-y-2 mb-4">
          {job.matchedSkills && job.matchedSkills.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-brand-600 flex items-center gap-1 mb-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-brand-500" />
                Matched Skills ({job.matchedSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {job.matchedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded-lg shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.missingSkills && job.missingSkills.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 mb-1.5 mt-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Missing / Target Competencies ({job.missingSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {job.missingSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Expandable Explanation Breakdown */}
        {showExplanation && (
          <div className="bg-surface-50 border border-surface-200 rounded-2xl p-3.5 text-xs text-surface-800 space-y-2 mb-4 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-brand-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explainable AI Score Calculation:</span>
            </div>
            <p className="text-[11px] text-surface-700 leading-relaxed font-medium">
              {job.explanation || `Formula: (0.70 × Skill Coverage [${skillScore}%]) + (0.30 × TF-IDF Semantic Similarity [${semanticScore}%]) = ${overallScore}% Composite Compatibility.`}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-200 text-[11px]">
              <div>
                <span className="text-surface-600 font-medium">Skill Coverage (70%):</span>
                <span className="font-mono text-brand-600 ml-1 font-bold">{skillScore}%</span>
              </div>
              <div>
                <span className="text-surface-600 font-medium">TF-IDF Vector Sim (30%):</span>
                <span className="font-mono text-purple-700 ml-1 font-bold">{semanticScore}%</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Card Action Buttons with Applying Section */}
      <div className="pt-3 border-t border-surface-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 font-bold transition-colors shrink-0"
        >
          <span>{showExplanation ? 'Hide Algorithm' : 'View AI Formula'}</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-2 ml-auto">
          {onPrepareInterview && (
            <button
              onClick={() => onPrepareInterview(job)}
              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs"
              title="Practice AI mock interview for this job role"
            >
              <MessageSquareCode className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Mock Interview</span>
            </button>
          )}

          {/* Primary Apply Button */}
          {hasApplied ? (
            <button
              onClick={() => onApply && onApply(job)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all bg-brand-50 text-brand-700 border border-brand-300 hover:bg-brand-100 shadow-2xs"
              title="Click to view or edit submitted application"
            >
              <CheckCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Applied ✓</span>
            </button>
          ) : (
            <button
              onClick={() => onApply ? onApply(job) : handleQuickTrackJob()}
              disabled={tracking}
              className="btn-brand px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm"
              title="Submit direct application with tailored AI pitch"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{tracking ? 'Saving...' : 'Apply Now'}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default JobCard;
