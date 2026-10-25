const express = require('express');
const router = express.Router();
const { matchResumeWithJobs } = require('../controllers/matchController');
const { authMiddleware } = require('../middleware/auth');

router.post('/:resumeId', authMiddleware, matchResumeWithJobs);

module.exports = router;
