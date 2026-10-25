const express = require('express');
const router = express.Router();
const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getApplications);
router.post('/', authMiddleware, createApplication);
router.patch('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication);

module.exports = router;
