const express = require('express');
const { processPayment, getPayments } = require('../controllers/paymentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, processPayment);
router.get('/', auth, getPayments);

module.exports = router;
