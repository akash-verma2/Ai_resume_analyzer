const mongoose = require('mongoose');
const { SEED_JOBS, SAMPLE_BENCHMARK_RESUMES } = require('../data/seedData');

let isConnectedToMongo = false;

// Fallback in-memory database store for instant demonstration if local mongod is not running
const inMemoryStore = {
  users: [
    {
      _id: "user_demo_01",
      name: "CSE Demo Student",
      email: "demo@student.edu",
      passwordHash: "$2a$10$wK1V.J4iN7pZpDkJnO6vUegpC5R9uE3z8C8wK0dZqI8L5gR2T3kOy", // Password123!
      role: "user",
      targetRole: "Full Stack Developer",
      createdAt: new Date()
    },
    {
      _id: "admin_demo_01",
      name: "Department Faculty / Admin",
      email: "admin@college.edu",
      passwordHash: "$2a$10$wK1V.J4iN7pZpDkJnO6vUegpC5R9uE3z8C8wK0dZqI8L5gR2T3kOy", // Password123!
      role: "admin",
      targetRole: "Professor / Evaluator",
      createdAt: new Date()
    }
  ],
  jobs: [...SEED_JOBS],
  resumes: [
    {
      _id: "res_seed_01",
      userId: "user_demo_01",
      fileName: SAMPLE_BENCHMARK_RESUMES[0].fileName,
      rawText: SAMPLE_BENCHMARK_RESUMES[0].rawText,
      contact: {
        name: "Aman Sharma",
        email: "aman.sharma@example.com",
        phone: "+91 9876543210",
        links: ["github.com/amansharma-dev", "linkedin.com/in/amansharma-cs"]
      },
      skills: SAMPLE_BENCHMARK_RESUMES[0].skills,
      atsScore: SAMPLE_BENCHMARK_RESUMES[0].atsScore,
      breakdown: SAMPLE_BENCHMARK_RESUMES[0].breakdown,
      tips: SAMPLE_BENCHMARK_RESUMES[0].tips,
      createdAt: new Date()
    }
  ],
  applications: [
    {
      _id: "app_seed_01",
      userId: "user_demo_01",
      jobId: "job_001",
      status: "Interview",
      appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      notes: "Technical round scheduled for next Tuesday. Preparing system design & MERN questions."
    },
    {
      _id: "app_seed_02",
      userId: "user_demo_01",
      jobId: "job_002",
      status: "Applied",
      appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      notes: "Resume matched 84% - waiting for HR recruiter screening response."
    }
  ],
  matches: []
};

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_resume_job_matcher';
  try {
    // Attempt Mongoose connection with 3-second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    isConnectedToMongo = true;
    console.log(`\x1b[32m✔ MongoDB connected successfully: ${mongoose.connection.host}\x1b[0m`);
    
    // Seed initial jobs if collection is empty
    const Job = require('../models/Job');
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      await Job.insertMany(SEED_JOBS);
      console.log(`\x1b[36m✔ Seeded ${SEED_JOBS.length} benchmark CSE jobs into MongoDB.\x1b[0m`);
    }
  } catch (err) {
    isConnectedToMongo = false;
    console.log(`\x1b[33m⚠ Local MongoDB server not detected (${err.message}).\x1b[0m`);
    console.log(`\x1b[32m✔ Activating High-Availability Embedded In-Memory Store with pre-seeded jobs & benchmark resumes!\x1b[0m`);
    console.log(`\x1b[36mℹ Ready for instant viva defense and zero-configuration demonstration.\x1b[0m`);
  }
};

const getStore = () => inMemoryStore;
const isMongoActive = () => isConnectedToMongo;

module.exports = {
  connectDB,
  getStore,
  isMongoActive
};
