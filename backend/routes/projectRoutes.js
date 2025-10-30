const express = require('express');
const { getProjects, createProject, getProjectById, updateProject, completeProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getProjects);
router.post('/', protect, createProject);
router.get('/:id', protect, getProjectById);
router.put('/:id', protect, updateProject);
router.post('/:id/complete', protect, completeProject);

module.exports = router;
