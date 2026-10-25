const Job = require('../models/Job');
const { isMongoActive, getStore } = require('../config/db');

const getJobs = async (req, res) => {
  try {
    const { search, role, location, experienceLevel } = req.query;
    let jobs;

    if (isMongoActive()) {
      let query = {};
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      if (location) query.location = { $regex: location, $options: 'i' };
      if (experienceLevel) query.experienceLevel = { $regex: experienceLevel, $options: 'i' };

      jobs = await Job.find(query).sort({ postedAt: -1 });
    } else {
      const store = getStore();
      jobs = store.jobs.filter(j => {
        let match = true;
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            j.title.toLowerCase().includes(s) ||
            j.company.toLowerCase().includes(s) ||
            j.description.toLowerCase().includes(s) ||
            (j.requiredSkills || []).some(sk => sk.toLowerCase().includes(s))
          );
        }
        if (location && location !== 'All') {
          match = match && j.location.toLowerCase().includes(location.toLowerCase());
        }
        if (experienceLevel && experienceLevel !== 'All') {
          match = match && j.experienceLevel.toLowerCase().includes(experienceLevel.toLowerCase());
        }
        return match;
      });
    }

    res.json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    let job;

    if (isMongoActive()) {
      job = await Job.findById(id);
    } else {
      const store = getStore();
      job = store.jobs.find(j => String(j._id) === String(id));
    }

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job listing not found.' });
    }

    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, experienceLevel, employmentType, salary, description, requiredSkills, preferredSkills } = req.body;
    if (!title || !company || !description) {
      return res.status(400).json({ success: false, message: 'Title, company, and description are required.' });
    }

    const jobPayload = {
      title,
      company,
      location: location || 'Remote',
      experienceLevel: experienceLevel || 'Entry-Level',
      employmentType: employmentType || 'Full-time',
      salary: salary || 'Competitive',
      description,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : (requiredSkills ? requiredSkills.split(',').map(s => s.trim()) : []),
      preferredSkills: Array.isArray(preferredSkills) ? preferredSkills : (preferredSkills ? preferredSkills.split(',').map(s => s.trim()) : []),
      postedAt: new Date()
    };

    let newJob;
    if (isMongoActive()) {
      newJob = await Job.create(jobPayload);
    } else {
      const store = getStore();
      newJob = { _id: 'job_' + Date.now(), ...jobPayload };
      store.jobs.unshift(newJob);
    }

    res.status(201).json({ success: true, message: 'Job listing posted successfully', job: newJob });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob
};
