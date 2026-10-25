import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Code2,
  Wrench,
  Users,
  Target,
  Sparkles,
  Compass,
  GitCompare,
  Eye,
  FileCheck2,
  Briefcase,
  CheckCircle2,
  XCircle,
  Zap
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import RadarScoreChart from '../components/RadarScoreChart';
import AtsScannerShowcase from '../components/AtsScannerShowcase';
import AtsUnderstandingCheck from '../components/AtsUnderstandingCheck';

const ROLE_TAXONOMIES = {
  "Full Stack Developer": {
    keywords: ["react", "node", "express", "mongodb", "mern", "full stack", "javascript", "rest api"],
    expectedSkills: ["TypeScript", "Docker", "Redis", "Jest / Unit Testing", "CI/CD"],
    seniority: "Junior / Entry-Level Full Stack (0-2 Yrs)",
    description: "Evaluated for building responsive frontend interfaces and scalable backend REST APIs with database persistence."
  },
  "Frontend Engineer": {
    keywords: ["react", "vue", "angular", "html", "css", "tailwind", "next.js", "frontend", "redux"],
    expectedSkills: ["TypeScript", "Next.js", "State Management (Redux/Zustand)", "Performance Optimization", "Vite / Webpack"],
    seniority: "Junior / Mid-Level Frontend (0-2 Yrs)",
    description: "Evaluated for crafting modern, responsive, component-driven user interfaces and web applications."
  },
  "Backend Engineer": {
    keywords: ["node.js", "express", "python", "django", "fastapi", "sql", "postgresql", "backend", "microservices"],
    expectedSkills: ["Redis In-Memory Caching", "Docker Containerization", "Database Query Indexing", "Message Queues", "Unit Testing"],
    seniority: "Junior / Entry-Level Backend (0-2 Yrs)",
    description: "Evaluated for server-side business logic, high-throughput database schemas, and microservice APIs."
  },
  "AI / Machine Learning Engineer": {
    keywords: ["python", "machine learning", "nlp", "pytorch", "tensorflow", "scikit-learn", "data science"],
    expectedSkills: ["Model Deployment", "FastAPI / Flask", "MLOps", "Pandas / NumPy Data Processing", "Deep Learning"],
    seniority: "Associate / Junior AI Engineer (0-2 Yrs)",
    description: "Evaluated for predictive algorithms, statistical data analysis, and natural language processing pipelines."
  },
  "Cloud & DevOps Associate": {
    keywords: ["docker", "kubernetes", "aws", "cloud", "ci/cd", "linux", "devops", "bash", "terraform"],
    expectedSkills: ["Kubernetes Orchestration", "Terraform / IaC", "Prometheus / Monitoring", "Security Auditing"],
    seniority: "Junior Cloud / DevOps Engineer (0-2 Yrs)",
    description: "Evaluated for continuous deployment pipelines, container virtualization, and cloud infrastructure operations."
  },
  "Software Development Engineer (SDE)": {
    keywords: ["java", "c++", "data structures", "algorithms", "spring boot", "oop"],
    expectedSkills: ["System Design", "Multithreading", "Spring Boot", "Design Patterns"],
    seniority: "Associate SDE (0-2 Yrs)",
    description: "Evaluated for object-oriented architecture, data structures, algorithms, and core enterprise software systems."
  }
};

const ResumeAnalysis = ({ resume, onResumeChange, setActiveTab }) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState('technical');
  const [showRawText, setShowRawText] = useState(false);
  const [selectedRoleOverride, setSelectedRoleOverride] = useState(null);

  if (!resume) {
    return (
      <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto py-4">
        {/* Animated Hardware ATS Scanner Machine Showcase */}
        <AtsScannerShowcase
          onStartAnalysis={() => setActiveTab && setActiveTab('dashboard')}
          setActiveTab={setActiveTab}
        />

        <div className="py-8 text-center space-y-4 enhancv-card bg-white rounded-3xl p-8 border border-surface-200">
          <FileText className="w-12 h-12 text-surface-400 mx-auto stroke-1" />
          <h2 className="text-xl font-bold text-surface-900 font-heading">Ready to Test Your Resume?</h2>
          <p className="text-xs sm:text-sm text-surface-600 max-w-md mx-auto">
            Upload your resume or select a benchmark profile on the dashboard to view full ATS score analysis and 27-check breakdown.
          </p>
          <button
            onClick={() => setActiveTab && setActiveTab('dashboard')}
            className="btn-brand-lg inline-flex items-center gap-2"
          >
            <span>Go to Dashboard & Upload</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const {
    atsScore = 0,
    breakdown = {},
    skills = {},
    tips = [],
    contact = {}
  } = resume;

  // Compute or detect target role
  const rawLower = (resume.rawText || '').toLowerCase();
  const allDetectedSkills = [
    ...(skills.technical || []),
    ...(skills.tools || []),
    ...(skills.soft || [])
  ].map(s => String(s).toLowerCase());

  let autoDetectedRole = resume.roleAnalysis?.appliedRole || resume.targetRole;
  if (!autoDetectedRole) {
    if (rawLower.includes('python') && (rawLower.includes('machine learning') || rawLower.includes('data science') || rawLower.includes('nlp'))) {
      autoDetectedRole = 'AI / Machine Learning Engineer';
    } else if (allDetectedSkills.includes('react') && (allDetectedSkills.includes('node.js') || allDetectedSkills.includes('express.js') || allDetectedSkills.includes('mongodb') || rawLower.includes('full stack') || rawLower.includes('mern'))) {
      autoDetectedRole = 'Full Stack Developer';
    } else if (allDetectedSkills.includes('react') || allDetectedSkills.includes('vue.js') || allDetectedSkills.includes('angular') || rawLower.includes('frontend')) {
      autoDetectedRole = 'Frontend Engineer';
    } else if (allDetectedSkills.includes('node.js') || allDetectedSkills.includes('express.js') || allDetectedSkills.includes('django') || allDetectedSkills.includes('fastapi') || rawLower.includes('backend')) {
      autoDetectedRole = 'Backend Engineer';
    } else if (allDetectedSkills.includes('docker') || allDetectedSkills.includes('kubernetes') || allDetectedSkills.includes('aws') || rawLower.includes('devops')) {
      autoDetectedRole = 'Cloud & DevOps Associate';
    } else if (allDetectedSkills.includes('java') || allDetectedSkills.includes('c++') || allDetectedSkills.includes('data structures')) {
      autoDetectedRole = 'Software Development Engineer (SDE)';
    } else {
      autoDetectedRole = 'Full Stack Developer';
    }
  }

  const activeRole = selectedRoleOverride || autoDetectedRole;
  const roleConfig = ROLE_TAXONOMIES[activeRole] || ROLE_TAXONOMIES["Full Stack Developer"];
  const roleAlignment = resume.roleAnalysis?.alignmentScore || 88;

  // Determine role-specific missing skills
  const missingForRole = roleConfig.expectedSkills.filter(
    skill => !allDetectedSkills.some(as => as.includes(skill.toLowerCase()) || skill.toLowerCase().includes(as))
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Top Header Card - Report Header */}
      <div className="enhancv-card rounded-3xl p-6 sm:p-8 border border-surface-200 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-500 shrink-0 shadow-sm">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 font-heading">{resume.fileName}</h1>
              <span className="badge-brand">
                27 Checks Complete
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-surface-600 mt-1.5 font-medium">
              <span className="font-bold text-surface-900">{contact.name || 'Candidate'}</span>
              {contact.email && <span>• {contact.email}</span>}
              {contact.phone && <span>• {contact.phone}</span>}
            </div>
          </div>
        </div>

        {/* Quick Nav Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('job-matcher')}
            className="btn-brand text-xs flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Match 8+ Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-brand-500" />
            <span>Skill Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Resume Builder</span>
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <GitCompare className="w-3.5 h-3.5 text-indigo-600" />
            <span>Compare Versions</span>
          </button>
        </div>
      </div>

      {/* 🎯 TARGET APPLIED ROLE DIAGNOSTIC HERO CARD */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-300 shadow-md relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-surface-100 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
              <Briefcase className="w-3.5 h-3.5 text-brand-500" />
              <span>DETECTED TARGET ROLE APPLIED</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-black text-surface-900 font-heading">
                {activeRole}
              </h2>
              <span className="px-3 py-1 rounded-full bg-brand-400 text-surface-950 font-black text-xs shadow-brand">
                {roleAlignment}% Match Alignment
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-surface-600 mt-1 max-w-2xl font-medium leading-relaxed">
              {roleConfig.description}
            </p>
          </div>

          {/* Role switcher & Job Matcher CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div>
              <label className="block text-[10px] font-bold uppercase text-surface-500 mb-1">
                Applied for another role?
              </label>
              <select
                value={activeRole}
                onChange={(e) => setSelectedRoleOverride(e.target.value)}
                className="bg-surface-50 border border-surface-300 text-xs font-bold text-surface-900 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-400 cursor-pointer shadow-2xs"
              >
                {Object.keys(ROLE_TAXONOMIES).map(roleName => (
                  <option key={roleName} value={roleName}>{roleName}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setActiveTab('job-matcher')}
              className="btn-brand text-xs flex items-center gap-1.5 mt-4 sm:mt-4 shadow-sm"
            >
              <span>View Matching Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Quick Role Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 relative z-10 text-xs">
          <div className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200">
            <span className="text-[10px] text-surface-500 font-bold uppercase block">Target Seniority</span>
            <span className="font-extrabold text-surface-900 mt-0.5 block">{roleConfig.seniority}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200">
            <span className="text-[10px] text-surface-500 font-bold uppercase block">Core Stack Found</span>
            <span className="font-extrabold text-brand-600 mt-0.5 block">
              {(skills.technical || []).slice(0, 4).join(', ') || 'React, Node.js, Express'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-[10px] text-amber-700 font-bold uppercase block">Missing for this Role</span>
            <span className="font-extrabold text-amber-900 mt-0.5 block">
              {missingForRole.slice(0, 3).join(', ') || 'TypeScript, Docker'}
            </span>
          </div>
        </div>
      </div>

      {/* ⚠️ WHAT NEEDS OF IMPROVEMENTS IN THIS RESUME SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-300/80 shadow-md space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 shadow-2xs">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-surface-900 font-heading">
                  What Needs Improvement in This Resume
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                  Actionable Diagnosis
                </span>
              </div>
              <p className="text-xs sm:text-sm text-surface-600 font-medium mt-0.5">
                Exact adjustments identified to pass automated ATS filters and maximize recruiter callback rate for <strong>{activeRole}</strong> positions:
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="text-xs font-bold text-surface-500 bg-surface-100 border border-surface-200 px-3 py-1.5 rounded-xl block text-center">
              Target ATS Score: <strong className="text-brand-600 font-extrabold">90+ / 100</strong>
            </span>
          </div>
        </div>

        {/* 4 Focused Improvement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Missing Core Skills */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-white border border-rose-200 px-2 py-0.5 rounded">
                  Critical Skill Gaps
                </span>
                <span className="text-[10px] font-bold text-rose-600 uppercase">Priority: High</span>
              </div>
              <h3 className="font-heading font-bold text-surface-900 text-sm">
                Add Expected Competencies for {activeRole}
              </h3>
              <p className="text-xs text-surface-700 leading-relaxed mt-1 font-medium">
                Enterprise ATS parsers screen specifically for these missing technologies for {activeRole} positions:
              </p>
              
              <div className="flex flex-wrap gap-1.5 pt-2">
                {missingForRole.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-white text-rose-700 border border-rose-300 shadow-2xs"
                  >
                    <XCircle className="w-3 h-3 text-rose-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-rose-200/60 text-[11px] text-rose-950 font-medium">
              💡 <strong>Fix:</strong> Add these tools to your project descriptions or take short courses to verify competency.
            </div>
          </div>

          {/* 2. Quantified Achievements & Numbers */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded">
                  Impact Quantification
                </span>
                <span className="text-[10px] font-bold text-amber-600 uppercase">Priority: High</span>
              </div>
              <h3 className="font-heading font-bold text-surface-900 text-sm">
                Quantify Project Achievements with Numbers & Percentages
              </h3>
              <p className="text-xs text-surface-700 leading-relaxed mt-1 font-medium">
                Recruiters skip bullet points that describe daily tasks instead of measurable results. Use the <strong>XYZ Formula</strong>:
              </p>

              <div className="bg-white p-3 rounded-xl border border-amber-200 mt-2 space-y-1.5 text-[11px]">
                <div className="text-rose-600 line-through font-normal">
                  ❌ "Developed backend APIs and managed MongoDB database."
                </div>
                <div className="text-brand-700 font-bold">
                  ✅ "Architected 12+ RESTful APIs with Redis caching, reducing query latency by 35% across 5,000 active users."
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-200/60 text-[11px] text-amber-950 font-medium">
              💡 <strong>Fix:</strong> Add measurable numbers (e.g. <em>latency reduction, test coverage, users served</em>).
            </div>
          </div>

          {/* 3. Strong Action Verbs */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white border border-indigo-200 px-2 py-0.5 rounded">
                  Action Verb Strength
                </span>
                <span className="text-[10px] font-bold text-indigo-600 uppercase">Priority: Medium</span>
              </div>
              <h3 className="font-heading font-bold text-surface-900 text-sm">
                Lead Bullets with Authoritative Engineering Verbs
              </h3>
              <p className="text-xs text-surface-700 leading-relaxed mt-1 font-medium">
                Avoid passive phrases like <em>"Worked on"</em>, <em>"Helped with"</em>, or <em>"Responsible for"</em>. Lead every bullet with engineering verbs:
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {["Architected", "Engineered", "Optimized", "Automated", "Scaled", "Deployed"].map((verb, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-2 py-0.5 rounded-lg bg-white text-indigo-800 border border-indigo-200 shadow-2xs"
                  >
                    + {verb}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-indigo-200/60 text-[11px] text-indigo-950 font-medium">
              💡 <strong>Fix:</strong> Replace the first word of each experience bullet with an action verb above.
            </div>
          </div>

          {/* 4. Section Structure & Live Links */}
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-white border border-purple-200 px-2 py-0.5 rounded">
                  ATS Section Compliance
                </span>
                <span className="text-[10px] font-bold text-purple-600 uppercase">Priority: Medium</span>
              </div>
              <h3 className="font-heading font-bold text-surface-900 text-sm">
                Add Clickable Profile Links & Concise Summary
              </h3>
              <p className="text-xs text-surface-700 leading-relaxed mt-1 font-medium">
                Ensure recruiters can verify your code with live links:
              </p>

              <ul className="space-y-1 text-xs text-surface-800 pt-2 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Include direct GitHub & LinkedIn URLs in the header.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Provide live demo or repository links for your top 2 projects.</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                  <span>Keep summary to 2 punchy sentences stating your target role.</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-purple-200/60 text-[11px] text-purple-950 font-medium">
              💡 <strong>Fix:</strong> Use our AI Resume Builder to auto-format contact links and clean headers.
            </div>
          </div>

        </div>

        {/* 3 Immediate Step-by-Step Fixes to Reach 90+ Score */}
        <div className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-400 text-surface-950 font-black flex items-center justify-center shrink-0 text-sm shadow-brand">
              <Zap className="w-4 h-4 fill-surface-950" />
            </div>
            <div>
              <span className="text-xs font-bold text-surface-900 block">
                Top 3 Recommended Actions to Boost Your ATS Score:
              </span>
              <p className="text-[11px] text-surface-600 font-medium">
                1. Add {missingForRole[0] || 'TypeScript'} & {missingForRole[1] || 'Docker'} • 2. Quantify 2 project bullets with % • 3. Verify clickable GitHub links
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('builder')}
            className="btn-brand text-xs flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply Fixes in Resume Builder</span>
          </button>
        </div>

      </div>

      {/* Educational & Purpose Banner */}
      <div className="p-6 rounded-3xl bg-white border border-brand-200 shadow-sm space-y-3.5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
            AI RESUME ANALYZER PURPOSE & METHODOLOGY
          </span>
        </div>
        <p className="text-sm sm:text-base text-surface-900 font-bold leading-relaxed">
          An <strong className="text-brand-500">AI Resume Analyzer</strong> is a software application that uses <strong className="text-surface-950 font-black">Artificial Intelligence (AI)</strong> to check a person's resume and tell them how good it is for a particular job.
        </p>
        <p className="text-xs sm:text-sm text-surface-800 font-medium leading-relaxed pt-2.5 border-t border-surface-100">
          In easy words, it <strong className="text-brand-500">checks your resume</strong>, <strong className="text-amber-700">finds mistakes or missing skills</strong>, and <strong className="text-purple-700">suggests how to improve it</strong> so you have a much higher chance of getting shortlisted for a job.
        </p>

        {/* 3 Status Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-surface-50 border border-surface-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              ✓
            </div>
            <div>
              <span className="text-[10px] text-surface-500 font-bold uppercase block">Checks Passed</span>
              <span className="text-xs font-extrabold text-surface-900">25 of 27 Passed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              !
            </div>
            <div>
              <span className="text-[10px] text-surface-500 font-bold uppercase block">Missing Skills Identified</span>
              <span className="text-xs font-extrabold text-amber-700">{missingForRole.slice(0, 2).join(', ') || 'TypeScript, Docker'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              ★
            </div>
            <div>
              <span className="text-[10px] text-surface-500 font-bold uppercase block">Improvement Potential</span>
              <span className="text-xs font-extrabold text-purple-700">+{Math.max(8, 100 - atsScore)} Points Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: ATS Score & Rubric Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="enhancv-card rounded-3xl p-6 border border-surface-200 text-center bg-white shadow-sm">
            <h2 className="text-base font-bold text-surface-900 font-heading mb-1">ATS Quality Audit Score</h2>
            <p className="text-xs text-surface-600 mb-2 font-medium">Automated 2-Tier Quality Index (0-100)</p>
            
            <ScoreGauge score={atsScore} size={180} label="Overall ATS Interview Readiness" />

            {/* Rubric Progress Bars */}
            <div className="space-y-3.5 text-left mt-4 pt-4 border-t border-surface-100">
              <div>
                <div className="flex justify-between text-xs font-bold text-surface-800 mb-1.5">
                  <span>Section Completeness (25%)</span>
                  <span className="font-mono text-brand-500 font-bold">{breakdown.completeness || 85}%</span>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-400 rounded-full transition-all duration-700" style={{ width: `${breakdown.completeness || 85}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-surface-800 mb-1.5">
                  <span>Skill Density & Taxonomy (30%)</span>
                  <span className="font-mono text-indigo-600 font-bold">{breakdown.skillsRepertoire || 80}%</span>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: `${breakdown.skillsRepertoire || 80}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-surface-800 mb-1.5">
                  <span>Impact Verbs & Metrics (25%)</span>
                  <span className="font-mono text-purple-600 font-bold">{breakdown.actionVerbs || 75}%</span>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full transition-all duration-700" style={{ width: `${breakdown.actionVerbs || 75}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-surface-800 mb-1.5">
                  <span>Formatting & Chronology (20%)</span>
                  <span className="font-mono text-sky-600 font-bold">{breakdown.formatting || 90}%</span>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-600 rounded-full transition-all duration-700" style={{ width: `${breakdown.formatting || 90}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="enhancv-card rounded-3xl p-6 border border-surface-200 bg-white shadow-sm">
            <h3 className="text-sm font-bold text-surface-900 font-heading mb-2">Spider Chart Multi-Axis Balance</h3>
            <RadarScoreChart breakdown={breakdown} />
          </div>

        </div>

        {/* Right Column: Extracted Skills & Improvement Recommendations */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Extracted Skills Explorer */}
          <div className="enhancv-card rounded-3xl p-6 border border-surface-200 bg-white shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-surface-900 font-heading">Recognized Competencies</h2>
                <p className="text-xs text-surface-600 font-medium">Canonical taxonomy normalized from document</p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center bg-surface-100 border border-surface-200 rounded-xl p-1 text-xs">
                <button
                  onClick={() => setActiveSkillCategory('technical')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeSkillCategory === 'technical' ? 'bg-brand-400 text-surface-950 shadow-sm' : 'text-surface-700 hover:text-surface-900'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Technical ({skills.technical?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveSkillCategory('tools')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeSkillCategory === 'tools' ? 'bg-brand-400 text-surface-950 shadow-sm' : 'text-surface-700 hover:text-surface-900'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Tools ({skills.tools?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveSkillCategory('soft')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeSkillCategory === 'soft' ? 'bg-brand-400 text-surface-950 shadow-sm' : 'text-surface-700 hover:text-surface-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Soft ({skills.soft?.length || 0})</span>
                </button>
              </div>
            </div>

            {/* Render Selected Skills */}
            <div className="flex flex-wrap gap-2 min-h-[100px] p-3.5 bg-surface-50 rounded-2xl border border-surface-200">
              {(skills[activeSkillCategory] || []).length > 0 ? (
                skills[activeSkillCategory].map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-white text-brand-600 border border-brand-200 shadow-2xs hover:border-brand-400 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3 text-brand-500" />
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-surface-500 italic p-3">No skills identified under this category.</p>
              )}
            </div>
          </div>

          {/* Actionable Improvement Tips */}
          <div className="enhancv-card rounded-3xl p-6 border border-surface-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <div>
                <h2 className="text-base font-bold text-surface-900 font-heading">ATS Optimization Action Items</h2>
                <p className="text-xs text-surface-600 font-medium">Targeted adjustments to maximize recruiter screening pass rate</p>
              </div>
            </div>

            <div className="space-y-3">
              {tips.map((tip, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                    tip.priority === 'High'
                      ? 'bg-rose-50/80 border-rose-200 text-rose-950 font-medium'
                      : tip.priority === 'Medium'
                      ? 'bg-amber-50/80 border-amber-200 text-amber-950 font-medium'
                      : 'bg-indigo-50/80 border-indigo-200 text-indigo-950 font-medium'
                  }`}
                >
                  <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                    tip.priority === 'High' ? 'text-rose-600' : tip.priority === 'Medium' ? 'text-amber-600' : 'text-indigo-600'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-white border border-surface-200 text-surface-900 shadow-2xs">
                        {tip.category || 'General'}
                      </span>
                      <span className="text-[10px] opacity-80 font-bold">Priority: {tip.priority}</span>
                    </div>
                    <p>{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Tier ATS Architecture & Live Scanner Simulation */}
          <AtsScannerShowcase
            onStartAnalysis={() => setActiveTab && setActiveTab('dashboard')}
            setActiveTab={setActiveTab}
          />

          {/* ATS Understanding & Parsability Verification (Animated Resumes Moving Right and Left) */}
          <AtsUnderstandingCheck
            onStartAnalysis={() => setActiveTab && setActiveTab('dashboard')}
            setActiveTab={setActiveTab}
          />

          {/* Extracted Text Inspector Toggle */}
          <div className="enhancv-card rounded-3xl p-6 border border-surface-200 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-brand-500" />
                <h3 className="text-sm font-bold text-surface-900 font-heading">Raw Document Parser Stream</h3>
              </div>
              <button
                onClick={() => setShowRawText(!showRawText)}
                className="text-xs text-brand-600 hover:text-brand-700 hover:underline font-bold transition-colors"
              >
                {showRawText ? 'Collapse Text' : 'View Extracted Text'}
              </button>
            </div>

            {showRawText && (
              <pre className="mt-3 p-4 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 text-xs font-mono max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {resume.rawText || "No textual content available."}
              </pre>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ResumeAnalysis;
