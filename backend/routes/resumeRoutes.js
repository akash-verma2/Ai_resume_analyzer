const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { authMiddleware } = require('../middleware/auth');
const {
  uploadResume,
  getResumes,
  getResumeById,
  deleteResume,
  compareResumes,
  getResumeRoadmap,
  improveBulletPoint
} = require('../controllers/resumeController');

router.post('/upload', authMiddleware, upload.single('file'), uploadResume);
router.get('/', authMiddleware, getResumes);
router.post('/compare', authMiddleware, compareResumes);
router.post('/improve', authMiddleware, improveBulletPoint);
router.get('/:id', authMiddleware, getResumeById);
router.delete('/:id', authMiddleware, deleteResume);
router.post('/:id/roadmap', authMiddleware, getResumeRoadmap);

module.exports = router;
