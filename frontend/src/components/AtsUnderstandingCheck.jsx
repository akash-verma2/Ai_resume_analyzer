import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Search,
  ExternalLink,
  Tag,
  UserCheck,
  Cpu
} from 'lucide-react';

const AtsUnderstandingCheck = ({ onStartAnalysis, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null); // 'keywords' | 'contact' | 'skills'

  return (
    <div className="w-full bg-gradient-to-br from-white via-surface-50/60 to-brand-50/20 border border-surface-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden my-8 animate-fadeIn">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        
        {/* =========================================================================
            LEFT COLUMN: ANIMATED OVERLAPPING RESUMES SWAYING RIGHT AND LEFT
           ========================================================================= */}
        <div 
          className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[460px] sm:min-h-[520px] select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Main Visual Container */}
          <div className="relative w-full max-w-[440px] sm:max-w-[480px] h-[440px] sm:h-[490px] flex items-center justify-center">
            
            {/* -------------------------------------------------------------
                BACK RESUME: Jasmine Bell (Left / Underneath)
                Animated: sways smoothly left & right
               ------------------------------------------------------------- */}
            <div 
              className={`absolute top-10 sm:top-12 left-2 sm:left-4 w-[280px] sm:w-[320px] bg-white rounded-2xl p-4 sm:p-5 border border-surface-200/90 shadow-xl transition-all duration-700 ease-out z-10 ${
                isHovered 
                  ? '-translate-x-10 -rotate-3 scale-[0.98]' 
                  : 'animate-resume-sway-left'
              } ${activeHighlight === 'contact' ? 'ring-2 ring-amber-400 shadow-amber-100' : ''}`}
            >
              {/* Header */}
              <div className="border-b border-surface-100 pb-2 mb-2">
                <h4 className="text-base sm:text-lg font-black font-heading text-surface-900 tracking-tight leading-none">
                  JASMINE BELL
                </h4>
                <span className="text-[10px] text-amber-600 font-bold block mt-0.5">
                  Video Editor
                </span>
                
                {/* Contact Information block highlighted */}
                <div className={`mt-1.5 p-1 rounded-lg text-[8px] text-surface-500 font-mono transition-colors ${
                  activeHighlight === 'contact' ? 'bg-amber-50 text-amber-900 font-bold' : ''
                }`}>
                  <div>123 Your Street • Your City, ST 12345</div>
                  <div>123.456.7890 • my_email@example.com</div>
                </div>
              </div>

              {/* Portfolio */}
              <div className="mb-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-surface-400 font-mono block">
                  Portfolio
                </span>
                <p className="text-[8px] text-surface-600 leading-tight mt-0.5">
                  Experienced video editor with industry presence, creating cinematic narrative cuts, feature-length television, and commercial campaigns.
                </p>
              </div>

              {/* Experience 2016 */}
              <div className="mb-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-surface-400 font-mono block">
                  2016 Timeline
                </span>
                <div className="text-[8px] text-surface-700 space-y-0.5 mt-0.5">
                  <p className="font-bold text-surface-900">Mandarin 10.3 / Lead Post-Production</p>
                  <p className="text-surface-600">• Spearheaded color grading and digital sound sync for broadcast.</p>
                  <p className="text-surface-600">• Implemented non-linear archival systems saving 20h weekly.</p>
                </div>
              </div>

              {/* Thompson Ltd */}
              <div>
                <span className="text-[8px] font-bold text-surface-900 block">Thompson Ltd / Video Consultant</span>
                <p className="text-[8px] text-surface-500">• Advised on video production and commercial advertising standards.</p>
              </div>
            </div>

            {/* -------------------------------------------------------------
                FRONT RESUME: Jasmine Bell with Avatar & Grid
                Animated: sways smoothly right & left
               ------------------------------------------------------------- */}
            <div 
              className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-[300px] sm:w-[340px] bg-white rounded-2xl p-4 sm:p-5 border border-surface-200 shadow-2xl transition-all duration-700 ease-out z-20 ${
                isHovered 
                  ? 'translate-x-8 rotate-2 scale-[1.02]' 
                  : 'animate-resume-sway-right'
              } ${activeHighlight === 'keywords' ? 'ring-2 ring-emerald-400' : activeHighlight === 'skills' ? 'ring-2 ring-indigo-400' : ''}`}
            >
              {/* Header with Circular Geometric Pattern Avatar */}
              <div className="border-b border-surface-200 pb-2.5 mb-2.5 flex items-start justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-black font-heading text-surface-900 tracking-tight leading-none">
                    JASMINE BELL
                  </h4>
                  <span className="text-[10px] text-brand-600 font-bold block mt-0.5">
                    Video Editor
                  </span>
                  <div className="flex items-center gap-2 text-[8px] text-surface-500 font-mono mt-1">
                    <span>123.456.7890</span>
                    <span>•</span>
                    <span>jasmine@example.com</span>
                  </div>
                </div>

                {/* Geometric Photo Avatar */}
                <div className="relative w-10 h-10 rounded-full border-2 border-brand-400 p-0.5 shadow-sm overflow-hidden bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {/* SVG Geometric Face / Honeycomb Pattern */}
                    <svg className="w-8 h-8 text-surface-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" fill="#fcd34d" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#fb923c" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Two Column Layout inside Resume */}
              <div className="grid grid-cols-2 gap-3 text-[8px]">
                
                {/* Left Mini Column */}
                <div className="space-y-2">
                  <div>
                    <span className="font-bold text-surface-400 uppercase tracking-wider font-mono block mb-0.5">
                      PORTFOLIO
                    </span>
                    <p className={`text-surface-600 leading-tight transition-colors ${
                      activeHighlight === 'keywords' ? 'bg-emerald-50 text-emerald-950 font-medium p-1 rounded' : ''
                    }`}>
                      Experienced video editor with over 10 years of experience in film, television, and narrative storytelling across Premiere & Final Cut.
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-surface-400 uppercase tracking-wider font-mono block mb-0.5">
                      EDUCATION
                    </span>
                    <p className="font-bold text-surface-800">B.S. Computer Science</p>
                    <p className="text-surface-500">Animation Technical Track</p>
                  </div>

                  <div>
                    <span className="font-bold text-surface-400 uppercase tracking-wider font-mono block mb-0.5">
                      EXPERIENCE
                    </span>
                    <p className="font-bold text-surface-800">Associate Producer</p>
                    <p className="text-surface-500">Blue Marble Media • 2017 - Present</p>
                  </div>
                </div>

                {/* Right Mini Column: SKILLS & ACHIEVEMENTS */}
                <div className="space-y-2 border-l border-surface-100 pl-2.5">
                  
                  {/* Skills Grid */}
                  <div className={`transition-all rounded-lg p-1 ${
                    activeHighlight === 'skills' ? 'bg-indigo-50 ring-1 ring-indigo-300' : ''
                  }`}>
                    <span className="font-bold text-indigo-700 uppercase tracking-wider font-mono block mb-1">
                      SKILLS
                    </span>
                    <div className="text-[7px] text-surface-500 font-semibold mb-0.5">Design Tools:</div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {['Premiere Pro', 'Final Cut', 'After Effects', 'Photoshop'].map((s, idx) => (
                        <span key={idx} className="bg-surface-100 px-1 py-0.5 rounded text-[7px] font-bold text-surface-800">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="text-[7px] text-surface-500 font-semibold mb-0.5">Computer Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {['Java', 'Python', 'HTML', 'Git'].map((s, idx) => (
                        <span key={idx} className="bg-brand-50 text-brand-700 px-1 py-0.5 rounded text-[7px] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements Cards */}
                  <div>
                    <span className="font-bold text-surface-400 uppercase tracking-wider font-mono block mb-0.5">
                      ACHIEVEMENTS
                    </span>
                    <div className="bg-amber-50/80 border border-amber-200 rounded p-1 text-[7px] text-amber-900 font-medium">
                      ★ Exceeded viewer target by 140%
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* =============================================================
                3. FLOATING BADGES / PILLS
               ============================================================= */}
            
            {/* Pill 1: Keywords (Top Left) */}
            <div 
              onMouseEnter={() => setActiveHighlight('keywords')}
              onMouseLeave={() => setActiveHighlight(null)}
              className="absolute -top-1 sm:top-2 left-2 sm:left-4 z-30 animate-pill-float-1 cursor-pointer transition-transform hover:scale-110"
              title="Click or hover to highlight extracted Keywords"
            >
              <div className="bg-[#c8f5df] text-[#065f46] font-extrabold text-xs px-4 py-2 rounded-2xl shadow-lg border border-[#a7f3d0] flex items-center gap-1.5 backdrop-blur-xs">
                <Tag className="w-3.5 h-3.5 text-[#065f46]" />
                <span>Keywords</span>
              </div>
            </div>

            {/* Pill 2: Contact information (Middle Left) */}
            <div 
              onMouseEnter={() => setActiveHighlight('contact')}
              onMouseLeave={() => setActiveHighlight(null)}
              className="absolute top-1/2 -left-2 sm:left-0 -translate-y-1/2 z-30 animate-pill-float-2 cursor-pointer transition-transform hover:scale-110"
              title="Click or hover to highlight parsed Contact information"
            >
              <div className="bg-[#fed7aa] text-[#78350f] font-extrabold text-xs px-4 py-2 rounded-2xl shadow-lg border border-[#fdba74] flex items-center gap-1.5 backdrop-blur-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#78350f]" />
                <span>Contact information</span>
              </div>
            </div>

            {/* Pill 3: Skills (Bottom Center/Right) */}
            <div 
              onMouseEnter={() => setActiveHighlight('skills')}
              onMouseLeave={() => setActiveHighlight(null)}
              className="absolute bottom-1 sm:bottom-4 left-1/3 sm:left-2/5 z-30 animate-pill-float-3 cursor-pointer transition-transform hover:scale-110"
              title="Click or hover to highlight extracted Skills taxonomy"
            >
              <div className="bg-[#e0e7ff] text-[#3730a3] font-extrabold text-xs px-4 py-2 rounded-2xl shadow-lg border border-[#c7d2fe] flex items-center gap-1.5 backdrop-blur-xs">
                <Cpu className="w-3.5 h-3.5 text-[#3730a3]" />
                <span>Skills</span>
              </div>
            </div>

          </div>

          {/* Micro-interaction indicator */}
          <div className="mt-2 text-[11px] text-surface-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping inline-block" />
            <span>Interactive 3D Layer Parallax: Hover over resumes to inspect</span>
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: ATS UNDERSTANDING CHECK CONTENT MATCHING IMAGE
           ========================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="flex items-center gap-2">
            <span className="badge-brand inline-flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              Parsability Verification
            </span>
          </div>

          {/* Heading matching screenshot */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-surface-900 font-heading leading-tight tracking-tight">
            Get an ATS understanding check
          </h2>

          {/* Body Paragraphs matching screenshot exactly */}
          <div className="space-y-4 text-xs sm:text-sm text-surface-700 leading-relaxed font-normal">
            <p>
              Part of the resume checker score we assign is based on the parsability rate of your resume. We’ve reverse-engineered the most popular applicant tracking systems currently used, such as <strong className="text-surface-900 font-bold">BambooHR</strong>, <strong className="text-surface-900 font-bold">Greenhouse</strong>, <strong className="text-surface-900 font-bold">Lever</strong>, <strong className="text-surface-900 font-bold">SAP SuccessFactors</strong> and <strong className="text-surface-900 font-bold">Workday</strong>, and we look for signs of ATS compatibility.
            </p>

            <p>
              For each resume uploaded, we look for skills and keywords connected to the job and industry you’re applying for, readable contact information, date format, links, file type, and length. Then, we’ll give you suggestions on how to improve your resume.
            </p>
          </div>

          {/* Enterprise ATS Platform Badges */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-surface-500 uppercase tracking-wider block mb-2 font-mono">
              Reverse-Engineered ATS Parsers Checked:
            </span>
            <div className="flex flex-wrap gap-2">
              {['BambooHR', 'Greenhouse', 'Lever', 'Workday', 'SAP SuccessFactors', 'iCIMS', 'Taleo'].map((ats, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-surface-200 text-surface-800 text-xs font-bold shadow-2xs hover:border-brand-300 transition-colors"
                >
                  {ats}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onStartAnalysis) onStartAnalysis();
                else if (setActiveTab) setActiveTab('analyzer');
              }}
              className="btn-brand px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check My Resume Parsability</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AtsUnderstandingCheck;
