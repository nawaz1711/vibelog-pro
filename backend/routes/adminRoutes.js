const express = require('express');
const { getUsers, deleteUser, getStats } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/users', auth, roleCheck('admin'), getUsers);
router.delete('/users/:id', auth, roleCheck('admin'), deleteUser);
router.get('/stats', auth, roleCheck('admin'), getStats);

module.exports = router;
