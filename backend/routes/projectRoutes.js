const express = require('express');
const { getProjects, createProject, getProjectById, updateProject, completeProject } = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.get('/:id', auth, getProjectById);
router.put('/:id', auth, updateProject);
router.post('/:id/complete', auth, completeProject);

module.exports = router;
