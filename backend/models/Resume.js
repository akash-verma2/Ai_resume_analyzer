const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  fileName: {
    type: String,
    required: true
  },
  rawText: {
    type: String,
    required: true
  },
  contact: {
    name: String,
    email: String,
    phone: String,
    links: [String]
  },
  skills: {
    technical: [String],
    tools: [String],
    soft: [String]
  },
  atsScore: {
    type: Number,
    default: 0
  },
  breakdown: {
    completeness: Number,
    skillsRepertoire: Number,
    actionVerbs: Number,
    formatting: Number
  },
  tips: [{
    category: String,
    priority: String,
    text: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);
