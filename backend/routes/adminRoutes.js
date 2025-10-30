const express = require('express');
const { getUsers, deleteUser, getStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/users', protect, isAdmin, getUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);
router.get('/stats', protect, isAdmin, getStats);

module.exports = router;
