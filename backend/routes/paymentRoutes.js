const express = require('express');
const { processPayment, getPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, processPayment);
router.get('/', protect, getPayments);

module.exports = router;
