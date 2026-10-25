const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Remote'
  },
  experienceLevel: {
    type: String,
    default: 'Entry-Level'
  },
  employmentType: {
    type: String,
    default: 'Full-time'
  },
  salary: {
    type: String,
    default: 'Competitive'
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: [{
    type: String
  }],
  preferredSkills: [{
    type: String
  }],
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
