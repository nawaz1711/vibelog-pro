const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const services = await Service.find()
      .populate('freelancer', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments();

    res.json({
      success: true,
      data: services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get featured services
// @route   GET /api/services/featured
// @access  Public
const getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find({ featured: true })
      .populate('freelancer', 'name email')
      .sort({ rating: -1 })
      .limit(6);

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private (Freelancer only)
const createService = async (req, res) => {
  try {
    const { title, description, category, price, deliveryTime, features } = req.body;

    const service = await Service.create({
      title,
      description,
      category,
      price,
      deliveryTime,
      features,
      freelancer: req.user.id
    });

    const populatedService = await Service.findById(service._id).populate('freelancer', 'name email');

    res.status(201).json({
      success: true,
      data: populatedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('freelancer', 'name email bio skills portfolio')
      .populate('reviews.user', 'name email');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Service owner only)
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if user owns the service
    if (service.freelancer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this service'
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('freelancer', 'name email');

    res.json({
      success: true,
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Service owner only)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if user owns the service
    if (service.freelancer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this service'
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
const getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category })
      .populate('freelancer', 'name email')
      .sort({ rating: -1 });

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getServices,
  getFeaturedServices,
  createService,
  getServiceById,
  updateService,
  deleteService,
  getServicesByCategory
};
