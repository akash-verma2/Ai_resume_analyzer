import React, { useState } from 'react';
import {
  Globe,
  ChevronDown,
  Shield,
  Heart,
  Sparkles,
  ExternalLink,
  Check
} from 'lucide-react';

const EnhancvFooter = ({ setActiveTab }) => {
  const [preferredAdded, setPreferredAdded] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');

  const languages = ['English (US)', 'English (UK)', 'Español', 'Français', 'Deutsch', 'हिन्दी'];

  return (
    <footer className="w-full bg-surface-50 border-t border-surface-200 pt-16 pb-10 mt-20 text-surface-700 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4 Columns Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-surface-200">
          
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-brand-400 flex items-center justify-center text-surface-950 font-black shadow-brand text-sm">
                ✓
              </div>
              <span className="font-heading font-extrabold text-lg text-surface-900 tracking-tight">
                Creati<span className="text-brand-400">CV</span>
              </span>
            </div>
            <p className="text-xs text-surface-600 leading-relaxed mb-4">
              AI-Powered ATS Resume Analyzer & Job Matcher. Academic Final Year Capstone Project.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-surface-200 text-[11px] text-brand-600 font-bold shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-brand-500" />
              <span>IEEE Std 830 Architecture</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-surface-900 text-xs uppercase tracking-wider mb-3.5 font-heading">
              Resume Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab && setActiveTab('analyzer')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  ATS Resume Checker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab && setActiveTab('builder')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  AI Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab && setActiveTab('compare')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  Version Comparator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab && setActiveTab('skill-gap')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  Skill Gap & Roadmap
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-surface-900 text-xs uppercase tracking-wider mb-3.5 font-heading">
              Job Search Suite
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab && setActiveTab('job-matcher')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  AI Job Matcher
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab && setActiveTab('tracker')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab && setActiveTab('mock-interview')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  Mock Interview Help
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab && setActiveTab('admin')} className="text-surface-600 hover:text-brand-500 font-medium transition-colors">
                  Department Admin Portal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-surface-900 text-xs uppercase tracking-wider mb-3.5 font-heading">
              Engineering Specs
            </h4>
            <ul className="space-y-2 text-xs text-surface-600">
              <li><strong className="text-surface-800">Stack:</strong> MERN + FastAPI Microservice</li>
              <li><strong className="text-surface-800">Database:</strong> MongoDB & Embedded Store</li>
              <li><strong className="text-surface-800">Matching:</strong> TF-IDF Cosine Vector Sim</li>
              <li><strong className="text-surface-800">NLP Engine:</strong> PyPDF & ATS Heuristics</li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            ATTACHED SECTION FROM SCREENSHOT
           ========================================================================= */}
        <div className="space-y-8 pt-2">
          
          {/* Row 1: Reviews.io Trust Stars (Left) & Preferred Source / Language Select (Right) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Reviews.io Star Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-xs bg-[#10b981] flex items-center justify-center text-white shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-xs text-surface-800 font-semibold">
                <strong>5,357</strong> reviews on{' '}
                <a
                  href="https://reviews.io"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-brand-600 font-bold text-surface-900 transition-colors"
                >
                  Reviews.io
                </a>
              </span>
            </div>

            {/* Pill Buttons: Add as preferred source + Language Dropdown */}
            <div className="flex items-center gap-3 flex-wrap">
              
              {/* Google Preferred Source Pill */}
              <button
                type="button"
                onClick={() => setPreferredAdded(!preferredAdded)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold shadow-2xs transition-all ${
                  preferredAdded
                    ? 'bg-brand-50 border-brand-300 text-brand-700'
                    : 'bg-white border-surface-300 hover:border-surface-400 text-surface-800 hover:bg-surface-50'
                }`}
                title="Add as a preferred news and career source on Google"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{preferredAdded ? 'Preferred Source Added ✓' : 'Add as a preferred source'}</span>
              </button>

              {/* Language Selector Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-surface-300 bg-white hover:border-surface-400 text-surface-800 hover:bg-surface-50 text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Globe className="w-4 h-4 text-surface-600" />
                  <span>{selectedLang}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-surface-500" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-2xl shadow-xl border border-surface-200 py-1.5 z-50 animate-fadeIn">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          setSelectedLang(lang);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between font-medium ${
                          selectedLang === lang
                            ? 'bg-brand-50 text-brand-700 font-bold'
                            : 'text-surface-700 hover:bg-surface-50'
                        }`}
                      >
                        <span>{lang}</span>
                        {selectedLang === lang && <Check className="w-3.5 h-3.5 text-brand-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Row 2: Company Navigation Links (Left) & Legal Policies (Right) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-surface-200">
            
            {/* Left Nav Links */}
            <div className="flex items-center gap-6 text-xs font-medium text-surface-800 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('dashboard')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Company
              </button>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('job-matcher')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Careers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('analyzer')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Reviews
              </button>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('admin')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Press & PR
              </button>
            </div>

            {/* Right Legal Links */}
            <div className="flex items-center gap-6 text-xs font-medium text-surface-800 flex-wrap">
              <button
                type="button"
                onClick={() => alert('Cookie Preferences: All essential cookies active for MERN auth and secure sessions.')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Cookie Preferences
              </button>
              <button
                type="button"
                onClick={() => alert('Privacy Policy: All resume files parsed in-memory and strictly confidential.')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => alert('Terms of Service: Standard IEEE academic fair-use terms apply.')}
                className="hover:text-brand-600 hover:underline transition-colors"
              >
                Terms of Service
              </button>
            </div>

          </div>

          {/* Row 3: Made with love & LLM text (Left) + Social Icons & Badges (Right) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4">
            
            {/* Left text with looping icon */}
            <div className="flex items-center gap-2 text-xs text-surface-600 flex-wrap">
              <span>Made with love by people who care.</span>
              
              {/* Green Looping Infinity Emblem */}
              <svg
                className="w-6 h-3.5 text-[#10b981] inline-block shrink-0"
                viewBox="0 0 32 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 3 C 5 3 2 5.5 2 8 C 2 10.5 5 13 9 13 C 13.5 13 18.5 3 23 3 C 27 3 30 5.5 30 8 C 30 10.5 27 13 23 13 C 18.5 13 13.5 3 9 3 Z" />
              </svg>

              <span>© 2026. All rights reserved.</span>
              <span>
                LLMs come read{' '}
                <a
                  href="#llms"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('CreatiCV LLM Policy: AI models are welcomed to index open career taxonomy benchmarks.');
                  }}
                  className="underline hover:text-brand-600 font-semibold text-surface-800 transition-colors"
                >
                  here
                </a>
              </span>
            </div>

            {/* Right: Social Media Icons + Certification Seals */}
            <div className="flex items-center gap-4 flex-wrap">
              
              {/* Social Circles */}
              <div className="flex items-center gap-2">
                
                {/* Reddit */}
                <a
                  href="https://reddit.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Reddit"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm5.5 0c-.69 0-1.25.56-1.25 1.25 0 .688.56 1.25 1.25 1.25.688 0 1.25-.56 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 3.99a.327.327 0 0 0-.231.096.327.327 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .591.045.87.134V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3.14 15.68 6.34 6.34 0 0 0 9.48 22a6.33 6.33 0 0 0 6.34-6.33V9.17a8.16 8.16 0 0 0 4.77 1.52V7.24a4.85 4.85 0 0 1-1-.55z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-7 h-7 rounded-full bg-surface-200 text-surface-700 flex items-center justify-center hover:bg-surface-300 hover:text-surface-900 transition-colors shadow-2xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

              </div>

              {/* Badges: PARW/CC & CPRW Circular Seal */}
              <div className="flex items-center gap-2.5">
                
                {/* PARW/CC Badge */}
                <div
                  className="px-2 py-1 bg-white border border-surface-300 rounded-md flex items-center gap-1.5 shadow-2xs hover:border-surface-400 transition-colors"
                  title="Professional Association of Résumé Writers & Career Coaches"
                >
                  <div className="w-5 h-5 bg-[#0b4870] text-white rounded-xs flex flex-col items-center justify-center text-[6px] font-black leading-none p-0.5">
                    <span>PA</span>
                    <span>RW</span>
                  </div>
                  <div className="text-[8px] font-serif leading-tight text-surface-800">
                    <span className="block font-sans font-bold text-[7px] text-surface-600">Professional Association of</span>
                    <span className="font-bold italic text-surface-900">Résumé Writers</span>
                    <span className="block text-[7px] text-surface-600 font-sans">& Career Coaches</span>
                  </div>
                </div>

                {/* CPRW / Quality Seal */}
                <div
                  className="w-8 h-8 rounded-full border-2 border-surface-800 bg-white flex flex-col items-center justify-center text-center p-0.5 shadow-2xs hover:scale-105 transition-transform"
                  title="Certified Professional Resume Writing Standard"
                >
                  <span className="text-[6px] font-black text-surface-900 tracking-tighter uppercase leading-none">
                    CPRW
                  </span>
                  <div className="w-4 h-[1px] bg-surface-400 my-0.5" />
                  <span className="text-[5px] font-bold text-surface-600 tracking-tighter leading-none">
                    SEAL
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Row 4: Disclaimer (Right-aligned / bottom) */}
          <div className="text-right text-[11px] text-surface-500 pt-1">
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-surface-700"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-surface-700"
            >
              Terms of Service
            </a>{' '}
            apply.
          </div>

        </div>

      </div>
    </footer>
  );
};

export default EnhancvFooter;
