import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Play,
  Pause,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const AtsScannerShowcase = ({ onStartAnalysis, setActiveTab }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanSpeed, setScanSpeed] = useState('normal'); // 'normal' | 'fast'
  const [currentScore, setCurrentScore] = useState(88);

  const toggleScan = () => setIsScanning(!isScanning);

  return (
    <div className="w-full bg-gradient-to-br from-white via-surface-50/70 to-emerald-50/25 border border-surface-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden my-8 animate-fadeIn">
      
      {/* Subtle background glow decorative blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* =========================================================================
            LEFT COLUMN: ANIMATED HARDWARE RESUME SCANNER & GRADER APPARATUS
           ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* Main Apparatus Wrapper */}
          <div className="relative flex items-center justify-center w-full max-w-lg select-none">
            
            {/* 1. RESUME GRADER (Left Dark Control Module) */}
            <div className="relative z-20 w-36 sm:w-44 bg-[#1f2330] rounded-2xl p-3 sm:p-3.5 border border-slate-700/80 shadow-2xl flex flex-col justify-between shrink-0 h-[380px] sm:h-[410px]">
              
              {/* Header Label */}
              <div className="text-center pt-1 pb-2 border-b border-slate-800">
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-300 font-mono block leading-tight">
                  RESUME
                </span>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-300 font-mono block leading-tight">
                  GRADER
                </span>
              </div>

              {/* 2. LIVE RUNNING METER / SPEEDOMETER */}
              <div className="bg-[#141722] rounded-xl p-2.5 border border-slate-800 relative flex flex-col items-center overflow-hidden">
                <div className="flex items-center justify-between w-full text-[9px] text-slate-400 font-mono font-bold mb-1 px-1">
                  <span>ATS GAUGE</span>
                  <span className="text-emerald-400 font-extrabold">{isScanning ? `${currentScore}%` : 'PAUSED'}</span>
                </div>

                {/* Semicircle Gauge SVG */}
                <div className="relative w-28 h-16 sm:w-32 sm:h-18 flex items-end justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 55">
                    {/* Gauge Arc Segments */}
                    <path
                      d="M 12 50 A 38 38 0 0 1 88 50"
                      fill="none"
                      stroke="#272d3f"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    {/* Colored Gradient Track */}
                    <path
                      d="M 12 50 A 38 38 0 0 1 35 23"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 35 23 A 38 38 0 0 1 65 23"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="8"
                    />
                    <path
                      d="M 65 23 A 38 38 0 0 1 88 50"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Gauge Needle with dynamic swinging animation */}
                    <g 
                      transform="translate(50, 50)" 
                      className={isScanning ? "animate-needle-gauge" : ""}
                      style={{
                        transformOrigin: '0px 0px',
                        transform: !isScanning ? 'rotate(35deg)' : undefined
                      }}
                    >
                      {/* Needle Body */}
                      <polygon points="-2,0 0,-38 2,0" fill="#f97316" />
                      <polygon points="-1,0 0,-38 1,0" fill="#fb923c" />
                      {/* Glowing Needle Tip */}
                      <circle cx="0" cy="-36" r="2.5" fill="#fde047" className="animate-ping" style={{ animationDuration: '2s' }} />
                      <circle cx="0" cy="-36" r="2" fill="#fde047" />
                      {/* Needle Pivot Cap */}
                      <circle cx="0" cy="0" r="4.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* 3. OSCILLOSCOPE / ECG HEARTBEAT SCANNER SCREEN */}
              <div className="bg-[#0e111a] rounded-xl p-2 border border-slate-800 space-y-1.5 overflow-hidden">
                <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono uppercase">
                  <span>Keyword Pulse</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    LIVE
                  </span>
                </div>

                {/* Oscilloscope Screen with Infinite Scrolling ECG Waveform */}
                <div className="h-10 bg-black/80 rounded-lg border border-slate-800/80 relative overflow-hidden flex items-center">
                  <div className={`flex w-[200%] ${isScanning ? "animate-ecg-scroll" : ""}`}>
                    {/* Waveform segment 1 */}
                    <svg className="w-1/2 h-8 text-[#10b981] shrink-0" viewBox="0 0 200 40" fill="none">
                      <path
                        d="M0 20 L20 20 L30 8 L38 32 L46 15 L52 23 L60 20 L80 20 L90 5 L98 35 L106 18 L114 22 L125 20 L150 20 L160 10 L168 30 L176 16 L184 20 L200 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Waveform segment 2 (mirror for seamless infinite loop) */}
                    <svg className="w-1/2 h-8 text-[#10b981] shrink-0" viewBox="0 0 200 40" fill="none">
                      <path
                        d="M0 20 L20 20 L30 8 L38 32 L46 15 L52 23 L60 20 L80 20 L90 5 L98 35 L106 18 L114 22 L125 20 L150 20 L160 10 L168 30 L176 16 L184 20 L200 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Grid Lines on CRT Screen */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
                </div>

                {/* Sub-monitor level bar */}
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-brand-400 to-indigo-400 rounded-full transition-all duration-700"
                    style={{ width: isScanning ? '84%' : '20%' }}
                  />
                </div>
              </div>

              {/* 4. STATUS LED INDICATOR LIGHTS */}
              <div className="flex items-center justify-between px-2 pt-1">
                {/* Dot 1: White */}
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                {/* Dot 2: Light Blue */}
                <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                {/* Dot 3: Soft Pink/White */}
                <div className="w-2.5 h-2.5 rounded-full bg-pink-200 shadow-[0_0_6px_rgba(244,114,182,0.8)]" />
                {/* Dot 4: Coral Red Blinking LED */}
                <div className={`w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] ${isScanning ? "animate-led-blink" : ""}`} />
              </div>

              {/* 5. AUDIT TAPE / RECEIPT PRINTER SLOT */}
              <div className="relative pt-2">
                {/* Slit */}
                <div className="h-1 bg-black rounded-full border border-slate-800" />

                {/* Ejected Paper Receipt */}
                <div className={`absolute top-2.5 left-1/2 -translate-x-1/2 w-28 bg-white text-surface-900 p-2 rounded-b-md shadow-xl border-x border-b border-surface-300 text-[8px] font-mono leading-tight z-30 ${isScanning ? "animate-paper-flutter" : ""}`}>
                  <div className="text-[7px] text-surface-500 font-bold uppercase tracking-wider text-center">
                    CreatiCV ATS PASS
                  </div>
                  {/* Printed squiggly waveform on paper */}
                  <svg className="w-full h-3 my-0.5 text-rose-500" viewBox="0 0 100 15" fill="none">
                    <path
                      d="M0 8 Q 12 1 25 8 T 50 8 T 75 8 T 100 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                  <div className="flex justify-between items-center text-[7px] font-bold text-surface-800 pt-0.5 border-t border-surface-200">
                    <span>SCORE</span>
                    <span className="text-emerald-700">88/100 ✓</span>
                  </div>
                </div>
              </div>

            </div>

            {/* MECHANICAL CONNECTING ARM / BRACKET */}
            <div className="hidden sm:block w-5 h-7 bg-[#171a24] border-y border-slate-700 z-10 shrink-0 shadow-md" />

            {/* =========================================================================
                2. MAIN SCANNER MACHINE BED WITH RESUME BEING SCANNED
               ========================================================================= */}
            <div className="relative flex-1 bg-[#181a24] rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-slate-700 shadow-2xl overflow-hidden min-h-[380px] sm:min-h-[410px] flex flex-col justify-end">
              
              {/* Scanner Bed Glass Glowing Ambient Lighting */}
              <div className={`absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-purple-950/40 to-slate-900 ${isScanning ? "animate-scanner-ambient" : ""}`} />
              
              {/* Scanner Top Housing Lip */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-slate-800 to-[#181a24] border-b border-slate-700/60 z-20 flex items-center justify-between px-3">
                <span className="text-[9px] font-mono font-bold text-slate-400">OPTICAL ATS BED</span>
                <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_6px_#2dc08d]" />
              </div>

              {/* THE RESUME DOCUMENT (Taylor Foster) */}
              <div className="relative z-10 bg-white rounded-t-xl sm:rounded-t-2xl shadow-2xl p-4 sm:p-5 text-surface-900 border border-slate-200 max-w-sm mx-auto w-full transition-transform duration-300 hover:scale-[1.01]">
                
                {/* Document Header */}
                <div className="border-b border-surface-200 pb-2 mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-black font-heading text-surface-900 tracking-tight leading-none">
                      Taylor Foster
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-brand-600 font-bold block mt-0.5">
                      Certified Project Management Professional
                    </span>
                  </div>
                  <div className="text-right text-[8px] text-surface-500 font-mono">
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Resume Section 1: Summary */}
                <div className="mb-2">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-surface-400 block mb-0.5 font-mono">
                    SUMMARY
                  </span>
                  <p className="text-[9px] text-surface-600 leading-tight">
                    Results-driven Senior PM with 6+ years managing enterprise cross-functional teams, roadmap scaling, and agile methodologies.
                  </p>
                </div>

                {/* Resume Section 2: Technical Skills Badges */}
                <div className="mb-2.5">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-surface-400 block mb-1 font-mono">
                    TECHNICAL SKILLS
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {['Product Lifecycle', 'SDLC', 'Tableau', 'JIRA', 'Python'].map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-brand-50 text-brand-700 border border-brand-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume Section 3: Professional Experience */}
                <div className="mb-2">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-surface-400 block mb-0.5 font-mono">
                    PROFESSIONAL EXPERIENCE
                  </span>
                  <div className="text-[9px]">
                    <span className="font-bold text-surface-900">Senior IT Project Manager</span>
                    <p className="text-[8px] text-surface-600 leading-tight mt-0.5">
                      • Architected automated release systems reducing cycle times by 35%.
                    </p>
                    <p className="text-[8px] text-surface-600 leading-tight">
                      • Managed multi-tier enterprise platforms serving 250k+ daily users.
                    </p>
                  </div>
                </div>

                {/* Resume Section 4: Key Achievements Box */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 rounded-lg p-2 text-[8px]">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                    KEY ACHIEVEMENTS
                  </span>
                  <div className="flex items-center justify-between text-surface-700">
                    <span>Exceeded throughput target by 115%</span>
                    <strong className="text-emerald-700 font-black">+35% Efficiency</strong>
                  </div>
                </div>

                {/* =================================================================
                    LASER SCANNING BEAM ANIMATION
                   ================================================================= */}
                {isScanning && (
                  <div className="absolute left-0 right-0 z-30 pointer-events-none animate-laser-scan">
                    {/* The Ultra-Bright Laser Line */}
                    <div className="h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_16px_3px_rgba(34,211,238,0.95)]" />
                    {/* Secondary emerald highlight diffuse glow */}
                    <div className="h-6 -mt-3 bg-gradient-to-b from-cyan-400/20 via-emerald-400/10 to-transparent blur-xs" />
                  </div>
                )}

              </div>

              {/* Bottom Scanner Base Tray */}
              <div className="relative z-20 mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span className="font-mono font-bold text-slate-200">27 ATS CHECKS ACTIVE</span>
                </div>
                
                {/* Pause/Play Button */}
                <button
                  type="button"
                  onClick={toggleScan}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] flex items-center gap-1 transition-colors border border-slate-600"
                  title={isScanning ? "Pause scanning animation" : "Resume scanning animation"}
                >
                  {isScanning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  <span>{isScanning ? 'Pause' : 'Scan'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Interactive controls pill below scanner */}
          <div className="mt-4 flex items-center gap-2 bg-white border border-surface-200 px-3.5 py-1.5 rounded-full shadow-2xs text-xs">
            <span className="text-surface-600 font-medium">Scanner Simulation:</span>
            <span className="font-bold text-brand-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              Live ATS Parsing Engine
            </span>
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: ENHANCV TWO-TIER ATS SYSTEM EXPLANATION
           ========================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step Pill 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c8f5df] text-[#0d593c] font-black font-heading flex items-center justify-center text-sm shadow-2xs shrink-0">
              1
            </div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-700 font-mono">
              Tier-1 & Tier-2 Architecture
            </span>
          </div>

          {/* Headline matching screenshot */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-surface-900 font-heading leading-tight tracking-tight">
            CreatiCV’s Resume Checker forms its ATS score with a two-tier system
          </h2>

          {/* Body Paragraphs matching screenshot */}
          <div className="space-y-4 text-xs sm:text-sm text-surface-700 leading-relaxed font-normal">
            <p>
              When you’re applying for a job, there’s a high chance your resume will be screened through an applicant tracking system before it finds its way on a recruiter’s screen. ATS helps hiring managers find the right candidates by adding their resumes to a database in a searchable format, extracting their content.
            </p>

            <p>
              That’s why the success of your application is highly dependent on how tailored your resume is for the job you’re applying for, the resume template you’re using, and what skills and keywords you have included.
            </p>

            <p>
              And then your resume must stand out in a pile of applicants, as well as deal with potential red flags, bias, discrimination, and role fit. CreatiCV’s Resume Checker handles that by giving you the exact strategies you need to overcome this step.
            </p>
          </div>

          {/* Two-Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            <div className="p-3.5 rounded-2xl bg-white border border-surface-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-1 text-brand-600 font-bold text-xs">
                <Cpu className="w-4 h-4 text-brand-500" />
                <span>Tier 1: Machine ATS Parsing</span>
              </div>
              <p className="text-[11px] text-surface-600 leading-normal">
                Verifies machine readability, section hierarchy, table avoidance, and OCR compliance.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-surface-200 shadow-2xs">
              <div className="flex items-center gap-2 mb-1 text-purple-700 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Tier 2: Recruiter Content Quality</span>
              </div>
              <p className="text-[11px] text-surface-600 leading-normal">
                Audits action verb strength, quantified achievements (%), and role-specific competencies.
              </p>
            </div>

          </div>

          {/* CTA Action Button */}
          {onStartAnalysis && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartAnalysis}
                className="btn-brand-lg px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-brand"
              >
                <Zap className="w-4 h-4" />
                <span>Test My Resume in Real Time</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AtsScannerShowcase;
