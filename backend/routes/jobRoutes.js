const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob } = require('../controllers/jobController');
const { authMiddleware, requireAdmin } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', authMiddleware, requireAdmin, createJob);

module.exports = router;
