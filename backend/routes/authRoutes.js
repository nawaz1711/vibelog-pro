const express = require('express');
const { register, login, getProfile, updateProfile, followUser, unfollowUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/follow/:userId', protect, followUser);
router.post('/unfollow/:userId', protect, unfollowUser);

module.exports = router;
