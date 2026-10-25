const Application = require('../models/Application');
const { isMongoActive, getStore } = require('../config/db');

const getApplications = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'user_demo_01';
    let apps;

    if (isMongoActive()) {
      apps = await Application.find({ userId }).populate('jobId').sort({ appliedAt: -1 });
    } else {
      const store = getStore();
      apps = store.applications
        .filter(a => a.userId === userId || a.userId === 'user_demo_01')
        .map(a => {
          const job = store.jobs.find(j => String(j._id) === String(a.jobId) || String(j.jobId) === String(a.jobId));
          return {
            ...a,
            job: job || a.job || { title: 'Software Engineer', company: 'Tech Corp', location: 'Remote' }
          };
        });
    }

    res.json({ success: true, count: apps.length, applications: apps });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createApplication = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : 'user_demo_01';
    const { jobId, status = 'Applied', notes = '' } = req.body;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'jobId is required' });
    }

    let savedApp;
    if (isMongoActive()) {
      savedApp = await Application.create({
        userId,
        jobId,
        status,
        notes,
        appliedAt: new Date()
      });
      savedApp = await Application.findById(savedApp._id).populate('jobId');
    } else {
      const store = getStore();
      const job = store.jobs.find(j => String(j._id) === String(jobId) || String(j.jobId) === String(jobId));
      const existingIdx = store.applications.findIndex(a => (a.userId === userId || a.userId === 'user_demo_01') && (String(a.jobId) === String(jobId)));
      
      if (existingIdx !== -1) {
        store.applications[existingIdx].status = status;
        if (notes) store.applications[existingIdx].notes = notes;
        savedApp = store.applications[existingIdx];
      } else {
        savedApp = {
          _id: 'app_' + Date.now(),
          userId,
          jobId,
          status,
          notes,
          appliedAt: new Date(),
          job: job || req.body.job || { 
            title: req.body.jobTitle || 'Software Engineer', 
            company: req.body.company || 'Tech Corp',
            location: req.body.location || 'Remote'
          }
        };
        store.applications.unshift(savedApp);
      }
    }

    res.status(201).json({ success: true, message: 'Application tracked successfully', application: savedApp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    let updated;
    if (isMongoActive()) {
      updated = await Application.findByIdAndUpdate(
        id,
        { ...(status && { status }), ...(notes !== undefined && { notes }) },
        { new: true }
      ).populate('jobId');
    } else {
      const store = getStore();
      const app = store.applications.find(a => a._id === id);
      if (app) {
        if (status) app.status = status;
        if (notes !== undefined) app.notes = notes;
        updated = app;
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Application record not found.' });
    }

    res.json({ success: true, message: 'Application updated', application: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoActive()) {
      await Application.findByIdAndDelete(id);
    } else {
      const store = getStore();
      store.applications = store.applications.filter(a => a._id !== id);
    }

    res.json({ success: true, message: 'Application removed from tracker' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication
};
