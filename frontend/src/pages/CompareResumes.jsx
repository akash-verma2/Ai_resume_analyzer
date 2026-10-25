import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Loader2
} from 'lucide-react';
import { resumeAPI } from '../services/api';

const CompareResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeAId, setResumeAId] = useState('');
  const [resumeBId, setResumeBId] = useState('');
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setLoading(true);
        const res = await resumeAPI.getAll();
        const list = res.data.resumes || [];
        setResumes(list);

        if (list.length >= 2) {
          setResumeAId(list[1]._id);
          setResumeBId(list[0]._id);
        } else if (list.length === 1) {
          setResumeAId(list[0]._id);
          setResumeBId(list[0]._id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  useEffect(() => {
    if (resumeAId && resumeBId) {
      handleCompare(resumeAId, resumeBId);
    }
  }, [resumeAId, resumeBId]);

  const handleCompare = async (idA, idB) => {
    try {
      setComparing(true);
      const res = await resumeAPI.compare(idA, idB);
      if (res.data.success) {
        setComparison(res.data.comparison);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="enhancv-card bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-brand flex items-center gap-1.5">
                <GitCompare className="w-3.5 h-3.5 text-purple-600" />
                Differentiator Feature
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 font-heading">
              Resume Revision & Version Comparator
            </h1>
            <p className="text-xs sm:text-sm text-surface-600 mt-1 max-w-xl font-medium">
              Evaluate whether your revised resume successfully improved ATS screening score, expanded technical keyword coverage, and eliminated red flags.
            </p>
          </div>

          {/* Version Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <label className="block text-[10px] uppercase font-bold text-surface-700 mb-1">Version A (Baseline):</label>
              <select
                value={resumeAId}
                onChange={(e) => setResumeAId(e.target.value)}
                className="bg-white border border-surface-300 text-xs text-surface-900 font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-brand-400 shadow-2xs cursor-pointer"
              >
                {resumes.map(r => (
                  <option key={r._id} value={r._id}>{r.fileName} (Score: {r.atsScore})</option>
                ))}
              </select>
            </div>

            <div className="text-surface-400 font-bold mt-4">→</div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-surface-700 mb-1">Version B (Revised):</label>
              <select
                value={resumeBId}
                onChange={(e) => setResumeBId(e.target.value)}
                className="bg-white border border-surface-300 text-xs text-surface-900 font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-brand-400 shadow-2xs cursor-pointer"
              >
                {resumes.map(r => (
                  <option key={r._id} value={r._id}>{r.fileName} (Score: {r.atsScore})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {comparing && (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-2" />
          <p className="text-xs text-surface-600 font-medium">Computing differential metrics...</p>
        </div>
      )}

      {/* Comparison Results Area */}
      {!comparing && comparison && (
        <div className="space-y-6">
          
          {/* Delta Verdict Card */}
          <div className={`p-6 rounded-3xl border flex items-center justify-between gap-4 shadow-sm ${
            comparison.scoreDelta >= 0
              ? 'bg-brand-50 border-brand-200 text-brand-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl shrink-0 ${
                comparison.scoreDelta >= 0 ? 'bg-brand-400 text-surface-950 shadow-brand' : 'bg-rose-600 text-white'
              }`}>
                {comparison.scoreDelta >= 0 ? `+${comparison.scoreDelta}` : comparison.scoreDelta}
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-surface-900">
                  {comparison.scoreDelta >= 0 ? 'ATS Score Improvement Detected' : 'Score Reduction Alert'}
                </h3>
                <p className="text-xs text-surface-800 mt-0.5 leading-relaxed font-medium">
                  {comparison.verdict}
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <span className="text-xs font-bold uppercase text-surface-600 block">Baseline vs Revised</span>
              <span className="text-lg font-mono font-extrabold text-surface-900">
                {comparison.resumeA?.score} → <strong className="text-brand-600">{comparison.resumeB?.score}</strong>
              </span>
            </div>
          </div>

          {/* Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Version A Card */}
            <div className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-surface-500">Version A (Baseline)</span>
                  <h4 className="text-sm font-bold text-surface-900 font-heading mt-0.5">
                    {comparison.resumeA?.fileName}
                  </h4>
                </div>
                <div className="text-2xl font-extrabold font-heading text-surface-900">
                  {comparison.resumeA?.score} <span className="text-xs font-normal text-surface-500">/ 100</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Completeness:</span>
                  <span className="font-mono text-surface-900 font-bold">{comparison.resumeA?.breakdown?.completeness || 80}%</span>
                </div>
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Skills Repertoire:</span>
                  <span className="font-mono text-surface-900 font-bold">{comparison.resumeA?.breakdown?.skillsRepertoire || 75}%</span>
                </div>
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Action Verbs & Impact:</span>
                  <span className="font-mono text-surface-900 font-bold">{comparison.resumeA?.breakdown?.actionVerbs || 70}%</span>
                </div>
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Formatting & Structure:</span>
                  <span className="font-mono text-surface-900 font-bold">{comparison.resumeA?.breakdown?.formatting || 85}%</span>
                </div>
              </div>
            </div>

            {/* Version B Card */}
            <div className="enhancv-card bg-white rounded-3xl p-6 border border-brand-300 space-y-4 shadow-brand">
              <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Version B (Revised Revision)</span>
                  <h4 className="text-sm font-bold text-surface-900 font-heading mt-0.5">
                    {comparison.resumeB?.fileName}
                  </h4>
                </div>
                <div className="text-2xl font-extrabold font-heading text-brand-600">
                  {comparison.resumeB?.score} <span className="text-xs font-normal text-surface-500">/ 100</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Completeness:</span>
                  <span className="font-mono text-brand-600 font-bold">{comparison.resumeB?.breakdown?.completeness || 90}%</span>
                </div>
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Skills Repertoire:</span>
                  <span className="font-mono text-brand-600 font-bold">{comparison.resumeB?.breakdown?.skillsRepertoire || 88}%</span>
                </div>
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Action Verbs & Impact:</span>
                  <span className="font-mono text-brand-600 font-bold">{comparison.resumeB?.breakdown?.actionVerbs || 85}%</span>
                </div>
                <div className="flex justify-between text-surface-700 font-medium">
                  <span>Formatting & Structure:</span>
                  <span className="font-mono text-brand-600 font-bold">{comparison.resumeB?.breakdown?.formatting || 92}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* New Skills Recognized Badges */}
          {comparison.newSkillsGained && comparison.newSkillsGained.length > 0 && (
            <div className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200 shadow-sm">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <CheckCircle className="w-4 h-4 text-brand-500" />
                Newly Recognized Competencies in Version B ({comparison.newSkillsGained.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {comparison.newSkillsGained.map((sk, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-brand-50 text-brand-800 border border-brand-200 text-xs font-bold shadow-2xs"
                  >
                    + {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default CompareResumes;
