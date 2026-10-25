import React, { useState, useEffect } from 'react';
import {
  MessageSquareCode,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Loader2,
  BookOpen
} from 'lucide-react';
import { interviewAPI } from '../services/api';

const DEFAULT_QUESTIONS = [
  {
    id: "q_1",
    category: "Technical (Frontend & React)",
    question: "Explain the React reconciliation algorithm and how the Virtual DOM improves UI rendering performance compared to direct DOM manipulation.",
    keyPoints: ["Virtual DOM in-memory tree", "O(n) diffing heuristic algorithm", "Key prop optimization in lists", "Batching state updates in React 18"]
  },
  {
    id: "q_2",
    category: "Backend & Systems (Node.js)",
    question: "How does the Node.js Event Loop handle asynchronous non-blocking I/O operations despite being single-threaded? What is the role of the Libuv thread pool?",
    keyPoints: ["Call Stack and Microtask Queue", "Libuv thread pool for filesystem and crypto", "Event loop phases: Timers, Poll, Check"]
  },
  {
    id: "q_3",
    category: "Databases (MongoDB & NoSQL)",
    question: "When should you design MongoDB schemas using embedded documents versus referenced documents? How do you optimize indexing for high-frequency queries?",
    keyPoints: ["1-to-few vs 1-to-many relationships", "Document size 16MB limit", "Atomic updates within single doc", "Compound indexes and explain() plans"]
  },
  {
    id: "q_4",
    category: "System Architecture & Security",
    question: "How do you securely handle user authentication with JWT in REST APIs? What safeguards prevent token theft and Cross-Site Scripting (XSS)?",
    keyPoints: ["HMAC-SHA256 signature verification", "HttpOnly secure cookies", "Short expiration times with refresh tokens", "Sanitizing input to prevent XSS"]
  },
  {
    id: "q_5",
    category: "Behavioral & STAR Method",
    question: "Describe a challenging technical bug or performance bottleneck you resolved in a recent software project. How did you isolate the problem?",
    keyPoints: ["STAR structure: Situation, Task, Action, Result", "Systematic logging and profiler tools", "Measurable performance recovery metrics"]
  }
];

const MockInterview = ({ selectedJob }) => {
  const [roleTitle, setRoleTitle] = useState(selectedJob?.title || "Full Stack Developer");
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [generating, setGenerating] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handleGenerateQuestions = async () => {
    try {
      setGenerating(true);
      setEvaluation(null);
      setUserAnswer('');
      const res = await interviewAPI.generate(roleTitle, selectedJob?.requiredSkills || []);
      if (res.data.questions && res.data.questions.length > 0) {
        setQuestions(res.data.questions);
        setCurrentIdx(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) return;

    try {
      setEvaluating(true);
      const res = await interviewAPI.evaluate(
        currentQ.question,
        userAnswer,
        currentQ.keyPoints || []
      );
      if (res.data.evaluation) {
        setEvaluation(res.data.evaluation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserAnswer('');
      setEvaluation(null);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setUserAnswer('');
      setEvaluation(null);
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
                <MessageSquareCode className="w-3.5 h-3.5" />
                AI Role-Specific Interview Simulator
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 font-heading">
              AI Mock Interview & Answer Evaluation
            </h1>
            <p className="text-xs sm:text-sm text-surface-600 mt-1 max-w-xl font-medium">
              Practice role-specific technical and behavioral questions tailored to your target job. Receive instant rubric grading and missing concept hints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              className="px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 w-44 font-medium shadow-2xs"
            />
            <button
              onClick={handleGenerateQuestions}
              disabled={generating}
              className="btn-brand text-xs flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{generating ? 'Regenerating...' : 'New Questions'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question & Answer Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Question & Input Arena (lg:col-span-7) */}
        <div className="lg:col-span-7 enhancv-card bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-sm space-y-6">
          
          {/* Question Index & Category Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-surface-600 font-mono">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 shadow-2xs">
              {currentQ.category || 'Technical Evaluation'}
            </span>
          </div>

          {/* Question Statement */}
          <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200">
            <h2 className="text-sm sm:text-base font-bold text-surface-900 leading-relaxed font-heading">
              {currentQ.question}
            </h2>
          </div>

          {/* Key Topics Expected Hint */}
          <div className="text-xs text-surface-700">
            <span className="font-bold text-surface-900 flex items-center gap-1 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
              Recommended Concepts to Address in Your Answer:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentQ.keyPoints?.map((kp, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-white border border-surface-200 text-surface-800 px-2.5 py-0.5 rounded-md font-medium shadow-2xs"
                >
                  • {kp}
                </span>
              ))}
            </div>
          </div>

          {/* Answer Input Textarea */}
          <div>
            <label className="block text-xs font-bold text-surface-800 mb-2">
              Your Technical Response:
            </label>
            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your explanation here using standard software engineering terminology, architecture mechanics, and trade-offs..."
              className="w-full p-4 bg-white border border-surface-300 rounded-2xl text-xs sm:text-sm text-surface-900 placeholder-surface-400 focus:outline-none focus:border-brand-400 leading-relaxed font-sans shadow-2xs font-medium"
            />
          </div>

          {/* Navigation & Submit Action Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-100">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="btn-ghost text-xs disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleEvaluate}
              disabled={evaluating || !userAnswer.trim()}
              className="btn-brand text-xs flex items-center gap-2 disabled:opacity-50"
            >
              {evaluating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-surface-950" />
                  <span>Grading Answer...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Evaluate My Answer</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIdx === questions.length - 1}
              className="btn-ghost text-xs disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right Column: AI Feedback & Scoring Card (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200 shadow-sm min-h-[450px] flex flex-col justify-between">
            {evaluation ? (
              <div className="space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-surface-100">
                  <div>
                    <h3 className="text-sm font-bold text-surface-900 font-heading">AI Evaluation Result</h3>
                    <p className="text-[11px] text-surface-600 font-medium">Automated rubric response audit</p>
                  </div>
                  <div className={`px-3 py-1 rounded-xl text-xs font-extrabold border ${
                    evaluation.score >= 80
                      ? 'bg-brand-50 text-brand-800 border-brand-300'
                      : evaluation.score >= 65
                      ? 'bg-indigo-50 text-indigo-800 border-indigo-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {evaluation.score} / 100 • {evaluation.grade}
                  </div>
                </div>

                {/* Feedback narrative */}
                <div className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 text-xs text-surface-800 leading-relaxed font-medium">
                  <p>{evaluation.feedback}</p>
                </div>

                {/* Key Strengths */}
                {evaluation.strengths && evaluation.strengths.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                      Concepts You Covered Well:
                    </span>
                    <ul className="space-y-1 text-xs text-surface-800 font-medium">
                      {evaluation.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand-600 font-bold">✓</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggested Improvements */}
                {evaluation.improvements && evaluation.improvements.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Suggested Improvement Areas:
                    </span>
                    <ul className="space-y-1 text-xs text-surface-800 font-medium">
                      {evaluation.improvements.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-auto text-center py-12 text-surface-500 space-y-3">
                <Sparkles className="w-10 h-10 mx-auto text-brand-500" />
                <h4 className="text-sm font-bold text-surface-900">Awaiting Your Answer</h4>
                <p className="text-xs text-surface-600 max-w-xs mx-auto font-medium">
                  Type your explanation on the left and click "Evaluate My Answer" to see AI rubric feedback, strengths, and areas for improvement.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-surface-100 text-center">
              <span className="text-[11px] text-surface-600 font-medium">
                Viva Defense Tip: Practice concise, structured STAR method answers.
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MockInterview;
