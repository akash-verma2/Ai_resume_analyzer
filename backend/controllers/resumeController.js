const Resume = require('../models/Resume');
const { isMongoActive, getStore } = require('../config/db');
const { extractAndAnalyzeResume, generateRoadmapWithAI } = require('../services/aiService');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a resume file (.pdf, .docx, or .txt).' });
    }

    const { buffer, originalname } = req.file;
    const userId = req.user ? req.user.id : 'user_demo_01';

    // Call AI microservice (or embedded fallback)
    const analysis = await extractAndAnalyzeResume(buffer, originalname);

    const resumePayload = {
      userId,
      fileName: originalname,
      rawText: analysis.text || "",
      contact: analysis.contact || {},
      skills: analysis.skills || { technical: [], tools: [], soft: [] },
      atsScore: analysis.atsScore || 0,
      breakdown: analysis.breakdown || {},
      roleAnalysis: analysis.roleAnalysis || {},
      improvementsNeeded: analysis.improvementsNeeded || [],
      tips: analysis.tips || [],
      createdAt: new Date()
    };

    let savedResume;
    if (isMongoActive()) {
      savedResume = await Resume.create(resumePayload);
    } else {
      const store = getStore();
      savedResume = {
        _id: 'res_' + Date.now(),
        ...resumePayload
      };
      store.resumes.unshift(savedResume);
    }

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully',
      resume: savedResume
    });
  } catch (err) {
    console.error("Resume Upload Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getResumes = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'user_demo_01';
    let resumes;

    if (isMongoActive()) {
      resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    } else {
      const store = getStore();
      resumes = store.resumes.filter(r => r.userId === userId || r.userId === 'user_demo_01');
    }

    res.json({ success: true, count: resumes.length, resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    let resume;

    if (isMongoActive()) {
      resume = await Resume.findById(id);
    } else {
      const store = getStore();
      resume = store.resumes.find(r => r._id === id);
    }

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoActive()) {
      await Resume.findByIdAndDelete(id);
    } else {
      const store = getStore();
      store.resumes = store.resumes.filter(r => r._id !== id);
    }

    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const compareResumes = async (req, res) => {
  try {
    const { resumeIdA, resumeIdB } = req.body;
    const store = getStore();

    let resA, resB;
    if (isMongoActive()) {
      resA = await Resume.findById(resumeIdA);
      resB = await Resume.findById(resumeIdB);
    } else {
      resA = store.resumes.find(r => r._id === resumeIdA);
      resB = store.resumes.find(r => r._id === resumeIdB);
    }

    if (!resA || !resB) {
      return res.status(404).json({ success: false, message: 'One or both resumes could not be found.' });
    }

    const scoreA = resA.atsScore || 0;
    const scoreB = resB.atsScore || 0;
    const delta = scoreB - scoreA;

    const skillsA = new Set([...(resA.skills?.technical || []), ...(resA.skills?.tools || [])].map(s => s.toLowerCase()));
    const skillsB = new Set([...(resB.skills?.technical || []), ...(resB.skills?.tools || [])].map(s => s.toLowerCase()));

    const gained = [...skillsB].filter(s => !skillsA.has(s));
    const removed = [...skillsA].filter(s => !skillsB.has(s));

    res.json({
      success: true,
      resumeA: { id: resA._id, fileName: resA.fileName, score: scoreA, breakdown: resA.breakdown },
      resumeB: { id: resB._id, fileName: resB.fileName, score: scoreB, breakdown: resB.breakdown },
      scoreDelta: delta,
      isImproved: delta > 0,
      newSkillsGained: gained.map(s => s.toUpperCase()),
      skillsRemoved: removed.map(s => s.toUpperCase()),
      verdict: delta > 0
        ? `Revision improved your ATS quality by +${delta} points with ${gained.length} new recognized competencies.`
        : `Score decreased or remained flat (${delta} points). Consider reviewing impact verbs and technical keyword density.`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getResumeRoadmap = async (req, res) => {
  try {
    const { id } = req.params;
    const { targetRole, missingSkills = [] } = req.body;

    const roadmap = await generateRoadmapWithAI(targetRole, missingSkills);
    res.json({ success: true, roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const improveBulletPoint = async (req, res) => {
  try {
    const { originalText, targetRole = "Software Engineer" } = req.body;
    if (!originalText) {
      return res.status(400).json({ success: false, message: "Please provide text to improve." });
    }

    // AI Rewrite Heuristic Engine
    const actionVerbs = ["Architected", "Engineered", "Implemented", "Spearheaded", "Optimized", "Automated"];
    const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];

    const cleaned = originalText.replace(/^(worked on|helped with|responsible for|did|built)/i, '').trim();

    const suggestions = [
      `${randomVerb} ${cleaned}, reducing processing latency by 32% and ensuring high availability across microservices.`,
      `Engineered robust ${cleaned} leveraging modern industry design patterns, improving code maintainability and test coverage by 40%.`,
      `Spearheaded the development of ${cleaned}, collaborating in Agile sprints to deliver features 2 weeks ahead of scheduled deadline.`
    ];

    res.json({
      success: true,
      original: originalText,
      targetRole,
      suggestions
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  uploadResume,
  getResumes,
  getResumeById,
  deleteResume,
  compareResumes,
  getResumeRoadmap,
  improveBulletPoint
};
