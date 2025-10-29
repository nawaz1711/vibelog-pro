const express = require('express');
const { register, login, getProfile, updateProfile, followUser, unfollowUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.post('/follow/:userId', auth, followUser);
router.post('/unfollow/:userId', auth, unfollowUser);

module.exports = router;
