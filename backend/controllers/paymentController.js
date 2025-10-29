const Payment = require('../models/Payment');

const processPayment = async (req, res) => {
  try {
    const { projectId, amount } = req.body;
    const payment = new Payment({
      projectId,
      clientId: req.user.id,
      creatorId: req.body.creatorId,
      amount
    });
    await payment.save();
    // Here you would integrate with Razorpay/Stripe
    res.status(201).json({ message: 'Payment processed', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ $or: [{ clientId: req.user.id }, { creatorId: req.user.id }] })
      .populate('projectId', 'title')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { processPayment, getPayments };
