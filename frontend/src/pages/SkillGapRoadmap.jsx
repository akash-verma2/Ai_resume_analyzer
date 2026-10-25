import React, { useState, useEffect } from 'react';
import {
  Compass,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Video,
  Code,
  FolderGit2,
  Calendar,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { resumeAPI } from '../services/api';

const TARGET_ROLES = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Data Scientist / AI Engineer",
  "Cloud & DevOps Associate"
];

const SkillGapRoadmap = ({ resume }) => {
  const [selectedRole, setSelectedRole] = useState("Full Stack Developer");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSkills, setCompletedSkills] = useState({});

  const missingSkillsDefault = ["TypeScript", "Docker", "Redis", "Jest", "CI/CD"];

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        if (resume && (resume._id || resume.id)) {
          const res = await resumeAPI.getRoadmap(
            resume._id || resume.id,
            selectedRole,
            missingSkillsDefault
          );
          if (res.data.success) {
            setRoadmap(res.data.roadmap);
          }
        } else {
          // Fallback demo roadmap
          setRoadmap({
            targetRole: selectedRole,
            totalMissingSkills: 4,
            missingSkillsList: ["TypeScript", "Docker", "Redis", "Jest"],
            roadmapPhases: [
              {
                phaseNumber: 1,
                title: "Phase 1: Strongly-Typed Architecture & Modern Tooling",
                timeline: "Weeks 1 - 2",
                targetSkills: ["TypeScript", "ESNext", "Modern Build Tools"],
                resources: [
                  {
                    skill: "TypeScript",
                    title: "TypeScript Official Handbook & React Patterns",
                    docUrl: "https://www.typescriptlang.org/docs/",
                    videoUrl: "https://youtube.com/results?search_query=typescript+course",
                    description: "Learn static typing, interfaces, generics, and strict tsconfig settings."
                  }
                ],
                milestoneProject: "Refactor a full-stack CRUD application to strict TypeScript with unified shared types."
              },
              {
                phaseNumber: 2,
                title: "Phase 2: Microservices, Containerization & Caching",
                timeline: "Weeks 3 - 4",
                targetSkills: ["Docker", "Redis", "Microservices"],
                resources: [
                  {
                    skill: "Docker",
                    title: "Docker Containerization Guide for Node & React",
                    docUrl: "https://docs.docker.com/get-started/",
                    videoUrl: "https://youtube.com/results?search_query=docker+tutorial",
                    description: "Containerize multi-service applications using Docker Compose."
                  },
                  {
                    skill: "Redis",
                    title: "Redis In-Memory Caching and Session Management",
                    docUrl: "https://redis.io/docs/",
                    videoUrl: "https://youtube.com/results?search_query=redis+caching",
                    description: "Implement high-speed query caching and token revocation stores."
                  }
                ],
                milestoneProject: "Build an API Gateway caching slow database responses in Redis with multi-container Docker compose."
              },
              {
                phaseNumber: 3,
                title: "Phase 3: Automated Testing, CI/CD & Cloud Deployment",
                timeline: "Weeks 5 - 6",
                targetSkills: ["Jest", "CI/CD", "AWS / Cloud Deployment"],
                resources: [
                  {
                    skill: "Jest",
                    title: "Jest & Supertest Backend Automated Testing",
                    docUrl: "https://jestjs.io/docs/getting-started",
                    videoUrl: "https://youtube.com/results?search_query=jest+testing",
                    description: "Unit and integration test suites achieving >80% code coverage."
                  }
                ],
                milestoneProject: "Publish an open-source GitHub repository with automated CI/CD workflow running tests and deploying to cloud."
              }
            ],
            recommendedCapstone: `Complete an end-to-end ${selectedRole} Capstone Platform demonstrating TypeScript, Docker, and Redis with live cloud hosting.`
          });
        }
      } catch (err) {
        console.error("Roadmap fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [selectedRole, resume]);

  const toggleSkill = (skill) => {
    setCompletedSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="enhancv-card bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-brand flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Adaptive Learning Curriculum
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900 font-heading">
              Personalized Skill Gap Analyzer & Learning Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-surface-600 mt-1 max-w-2xl leading-relaxed font-medium">
              We evaluated your resume against employer requirements for <span className="text-brand-600 font-bold">{selectedRole}</span>. Follow this step-by-step roadmap to bridge competency gaps.
            </p>
          </div>

          {/* Role Selector Dropdown */}
          <div className="shrink-0">
            <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-1.5">
              Select Target Role:
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-white border border-surface-300 text-surface-900 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-brand-400 cursor-pointer shadow-sm"
            >
              {TARGET_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 mx-auto mb-3" />
          <p className="text-sm text-surface-600 font-medium">Synthesizing personalized curriculum from industry skill benchmarks...</p>
        </div>
      )}

      {/* Roadmap Phased Sequence */}
      {!loading && roadmap && (
        <div className="space-y-6">
          
          {/* Capstone Recommendation Banner */}
          <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-start gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-purple-950 font-heading">Recommended Capstone Portfolio Project:</h3>
              <p className="text-xs text-purple-900 mt-1 leading-relaxed font-medium">
                {roadmap.recommendedCapstone}
              </p>
            </div>
          </div>

          {/* 3 Phases List */}
          <div className="space-y-6">
            {(roadmap.roadmapPhases || []).map((phase, idx) => (
              <div
                key={idx}
                className="enhancv-card bg-white rounded-3xl p-6 sm:p-8 border border-surface-200 shadow-sm space-y-5"
              >
                
                {/* Phase Title & Timeline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-surface-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-400 text-surface-950 font-black flex items-center justify-center text-sm shadow-brand">
                      {phase.phaseNumber}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-surface-900 font-heading">
                        {phase.title}
                      </h2>
                      <span className="text-xs text-surface-600 font-medium flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-500" />
                        Estimated Duration: {phase.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Target Skills Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {phase.targetSkills?.map((skill, sIdx) => {
                      const isDone = !!completedSkills[skill];
                      return (
                        <button
                          key={sIdx}
                          onClick={() => toggleSkill(skill)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                            isDone
                              ? 'bg-brand-50 text-brand-800 border-brand-300 shadow-2xs'
                              : 'bg-surface-50 text-surface-800 border-surface-200 hover:border-surface-300 shadow-2xs'
                          }`}
                        >
                          <CheckCircle className={`w-3.5 h-3.5 ${isDone ? 'text-brand-600' : 'text-surface-400'}`} />
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Learning Resources */}
                <div>
                  <h4 className="text-xs font-bold text-surface-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                    Curated Learning Resources & Documentation:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.resources?.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="bg-surface-50 border border-surface-200 rounded-2xl p-4 flex flex-col justify-between hover:border-brand-300 hover:shadow-brand transition-all"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-white border border-brand-200 px-2 py-0.5 rounded shadow-2xs">
                            {res.skill}
                          </span>
                          <h5 className="text-xs font-bold text-surface-900 mt-2 font-heading">
                            {res.title}
                          </h5>
                          <p className="text-[11px] text-surface-700 mt-1 leading-relaxed font-normal">
                            {res.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-surface-200/80 text-xs">
                          {res.docUrl && (
                            <a
                              href={res.docUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-surface-800 hover:text-brand-600 flex items-center gap-1 font-bold transition-colors"
                            >
                              <BookOpen className="w-3 h-3 text-brand-500" />
                              <span>Official Docs</span>
                              <ExternalLink className="w-2.5 h-2.5 text-surface-400" />
                            </a>
                          )}
                          {res.videoUrl && (
                            <a
                              href={res.videoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-surface-800 hover:text-purple-600 flex items-center gap-1 font-bold transition-colors"
                            >
                              <Video className="w-3 h-3 text-purple-600" />
                              <span>Video Crash Course</span>
                              <ExternalLink className="w-2.5 h-2.5 text-surface-400" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Project Card */}
                {phase.milestoneProject && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                      <FolderGit2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
                        Phase Milestone Task:
                      </span>
                      <p className="text-xs text-indigo-950 mt-0.5 leading-relaxed font-medium">
                        {phase.milestoneProject}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default SkillGapRoadmap;
