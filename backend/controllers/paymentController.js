const Payment = require('../models/Payment');
const Project = require('../models/Project');

// @desc    Process payment
// @route   POST /api/payments
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { projectId, amount, paymentMethod } = req.body;

    // Check if project exists and user is the client
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.client.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to make payment for this project'
      });
    }

    // Create payment record
    const payment = await Payment.create({
      project: projectId,
      client: req.user.id,
      freelancer: project.freelancer,
      amount,
      paymentMethod,
      status: 'completed' // In a real app, this would be 'pending' until payment is confirmed
    });

    // Update project status
    project.status = 'in_progress';
    await project.save();

    const populatedPayment = await Payment.findById(payment._id)
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('project', 'title');

    res.status(201).json({
      success: true,
      data: populatedPayment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get payments
// @route   GET /api/payments
// @access  Private
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      $or: [
        { client: req.user.id },
        { freelancer: req.user.id }
      ]
    })
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('project', 'title')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  processPayment,
  getPayments
};
