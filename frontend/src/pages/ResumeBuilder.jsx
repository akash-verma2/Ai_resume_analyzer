import React, { useState } from 'react';
import {
  FileEdit,
  Download,
  Sparkles,
  Printer,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Wand2,
  Briefcase,
  GraduationCap,
  Code
} from 'lucide-react';
import { resumeAPI } from '../services/api';

const SAMPLE_TEMPLATE = {
  fullName: "Aman Sharma",
  title: "Full Stack MERN Developer",
  email: "aman.sharma@example.com",
  phone: "+91 9876543210",
  location: "Bengaluru, India",
  links: "github.com/amansharma-dev | linkedin.com/in/amansharma-cs",
  summary: "Results-driven Full Stack Engineer with strong expertise in React, Node.js, and MongoDB. Passionate about architecting scalable microservices, high-performance web systems, and responsive modern user experiences.",
  skills: "JavaScript, TypeScript, React, Node.js, Express.js, MongoDB, Docker, Git, REST APIs, Tailwind CSS, SQL",
  education: [
    { degree: "B.Tech in Computer Science and Engineering", institution: "Apex Institute of Technology", year: "2022 - 2026", gpa: "8.8 / 10.0" }
  ],
  experience: [
    {
      role: "Full Stack Engineering Intern",
      company: "TechNovation Labs",
      period: "June 2025 - August 2025",
      bullets: [
        "Architected and deployed 12+ RESTful API endpoints using Express and Node.js with JWT authentication.",
        "Refactored legacy UI components into reusable React hooks, improving render speed by 28% across 5,000 active users.",
        "Collaborated in Agile Scrum sprints and conducted weekly code reviews with senior engineering mentors."
      ]
    }
  ],
  projects: [
    {
      name: "E-Commerce Microservices Platform",
      stack: "React, Node.js, MongoDB, Docker",
      bullets: [
        "Engineered reactive single-page app utilizing React and Redux Toolkit with responsive cart checkout.",
        "Implemented MongoDB indexing and Redis caching, cutting average database query latency by 35%."
      ]
    }
  ]
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState(SAMPLE_TEMPLATE);
  const [enhancing, setEnhancing] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  const handlePrint = () => {
    window.print();
  };

  const handleEnhanceSummary = async () => {
    try {
      setEnhancing(true);
      const res = await resumeAPI.improve(resumeData.summary, resumeData.title);
      if (res.data.suggestions && res.data.suggestions.length > 0) {
        setResumeData(prev => ({ ...prev, summary: res.data.suggestions[0] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  const handleAddProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "New Software Engineering Project",
          stack: "React, Node.js, Express",
          bullets: ["Implemented robust full-stack architecture with unit testing and API validation."]
        }
      ]
    }));
  };

  const handleAddExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          role: "Software Engineering Intern",
          company: "Innovate Solutions",
          period: "Jan 2026 - Present",
          bullets: ["Developed scalable web applications and integrated modern RESTful backend services."]
        }
      ]
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Top Action Bar */}
      <div className="enhancv-card bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-brand flex items-center gap-1.5">
              <FileEdit className="w-3.5 h-3.5" />
              ATS Template Generator
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 font-heading">
            AI-Powered Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-surface-600 font-medium">
            Create an ATS-friendly single-page resume with impact action verbs and instant PDF export.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setResumeData(SAMPLE_TEMPLATE)}
            className="btn-ghost text-xs"
          >
            Reset Template
          </button>
          <button
            onClick={handlePrint}
            className="btn-brand-lg inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Form Editor vs Live Paper Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Editor (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Personal Info */}
          <div className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-surface-900 font-heading uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              Candidate Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-surface-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-surface-700 mb-1">Headline / Target Role</label>
                <input
                  type="text"
                  value={resumeData.title}
                  onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-surface-700 mb-1">Email</label>
                <input
                  type="email"
                  value={resumeData.email}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-surface-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-surface-700 mb-1">Portfolio & GitHub Links</label>
              <input
                type="text"
                value={resumeData.links}
                onChange={(e) => setResumeData({ ...resumeData, links: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
              />
            </div>
          </div>

          {/* Professional Summary with AI rewrite */}
          <div className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-surface-900 font-heading uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                Professional Summary
              </h2>
              <button
                type="button"
                onClick={handleEnhanceSummary}
                disabled={enhancing}
                className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 flex items-center gap-1.5 transition-all font-bold shadow-2xs"
              >
                <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                <span>{enhancing ? 'Optimizing...' : 'AI Enhance Summary'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 leading-relaxed shadow-2xs font-medium"
            />
          </div>

          {/* Technical Skills */}
          <div className="enhancv-card bg-white rounded-3xl p-6 border border-surface-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-surface-900 font-heading uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400" />
              Technical Skills (Comma Separated)
            </h2>
            <textarea
              rows={2}
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-surface-300 rounded-xl text-xs text-surface-900 focus:outline-none focus:border-brand-400 shadow-2xs font-medium"
            />
          </div>

          {/* Projects and Experience controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddProject}
              className="btn-ghost flex-1 py-2.5 text-xs flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-brand-500" />
              <span>Add Another Project</span>
            </button>
            <button
              onClick={handleAddExperience}
              className="btn-ghost flex-1 py-2.5 text-xs flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-purple-600" />
              <span>Add Work Experience</span>
            </button>
          </div>

        </div>

        {/* Right Column: Live Printable ATS Paper Preview (lg:col-span-6) */}
        <div className="lg:col-span-6">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-surface-700 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-brand-500" />
                Live ATS Paper Preview
              </span>
              <span className="text-[11px] text-surface-500 font-medium">Standard 8.5" × 11" Clean Format</span>
            </div>

            {/* Resume Sheet Container (printable) */}
            <div
              id="printable-resume"
              className="bg-white text-surface-900 p-8 sm:p-10 rounded-2xl shadow-xl border border-surface-300 font-sans text-xs leading-normal select-text min-h-[700px]"
            >
              
              {/* Header */}
              <div className="text-center pb-4 border-b border-surface-300 mb-4">
                <h1 className="text-xl font-bold uppercase tracking-wider text-surface-900 font-heading">
                  {resumeData.fullName}
                </h1>
                <p className="text-xs font-bold text-surface-700 mt-0.5">
                  {resumeData.title}
                </p>
                <div className="text-[11px] text-surface-700 mt-1 flex flex-wrap justify-center gap-2 font-medium">
                  <span>{resumeData.email}</span>
                  <span>•</span>
                  <span>{resumeData.phone}</span>
                  <span>•</span>
                  <span>{resumeData.location}</span>
                </div>
                <div className="text-[10px] text-surface-600 mt-1 font-mono">
                  {resumeData.links}
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-surface-300 pb-1 mb-1 text-surface-900">
                    Professional Summary
                  </h3>
                  <p className="text-[11px] text-surface-800 leading-relaxed text-justify font-normal">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Technical Skills */}
              {resumeData.skills && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-surface-300 pb-1 mb-1 text-surface-900">
                    Technical Skills
                  </h3>
                  <p className="text-[11px] text-surface-800 font-normal">
                    {resumeData.skills}
                  </p>
                </div>
              )}

              {/* Projects */}
              {resumeData.projects && resumeData.projects.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-surface-300 pb-1 mb-2 text-surface-900">
                    Key Technical Projects
                  </h3>
                  <div className="space-y-2.5">
                    {resumeData.projects.map((proj, pIdx) => (
                      <div key={pIdx}>
                        <div className="flex justify-between items-baseline font-bold text-surface-900 text-[11px]">
                          <span>{proj.name}</span>
                          <span className="text-[10px] text-surface-600 font-normal">Tech: {proj.stack}</span>
                        </div>
                        <ul className="list-disc list-inside text-[11px] text-surface-800 space-y-0.5 mt-0.5 ml-1 font-normal">
                          {proj.bullets?.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-surface-300 pb-1 mb-2 text-surface-900">
                    Work Experience
                  </h3>
                  <div className="space-y-2.5">
                    {resumeData.experience.map((exp, eIdx) => (
                      <div key={eIdx}>
                        <div className="flex justify-between items-baseline font-bold text-surface-900 text-[11px]">
                          <span>{exp.role} — <span className="font-semibold text-surface-700">{exp.company}</span></span>
                          <span className="text-[10px] text-surface-600 font-normal">{exp.period}</span>
                        </div>
                        <ul className="list-disc list-inside text-[11px] text-surface-800 space-y-0.5 mt-0.5 ml-1 font-normal">
                          {exp.bullets?.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider border-b border-surface-300 pb-1 mb-1 text-surface-900">
                    Education
                  </h3>
                  {resumeData.education.map((edu, edIdx) => (
                    <div key={edIdx} className="flex justify-between items-baseline text-[11px] text-surface-900">
                      <div>
                        <span className="font-bold">{edu.degree}</span> • {edu.institution}
                      </div>
                      <div className="text-[10px] text-surface-600 font-medium">
                        {edu.year} (CGPA: {edu.gpa})
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ResumeBuilder;
