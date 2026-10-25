const express = require('express');
const router = express.Router();
const { generateQuestions, evaluateAnswer } = require('../controllers/interviewController');
const { authMiddleware } = require('../middleware/auth');

router.post('/generate', authMiddleware, generateQuestions);
router.post('/evaluate', authMiddleware, evaluateAnswer);

module.exports = router;
