const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { client: req.user.id },
        { freelancer: req.user.id }
      ]
    })
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('service', 'title')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { serviceId, requirements, budget } = req.body;

    const project = await Project.create({
      service: serviceId,
      client: req.user.id,
      requirements,
      budget
    });

    const populatedProject = await Project.findById(project._id)
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('service', 'title');

    res.status(201).json({
      success: true,
      data: populatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('service', 'title description');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is involved in the project
    if (project.client.toString() !== req.user.id && project.freelancer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this project'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is involved in the project
    if (project.client.toString() !== req.user.id && project.freelancer.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('service', 'title');

    res.json({
      success: true,
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Complete project
// @route   PUT /api/projects/:id/complete
// @access  Private
const completeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user is the client
    if (project.client.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Only client can mark project as completed'
      });
    }

    project.status = 'completed';
    project.completedAt = new Date();
    await project.save();

    const updatedProject = await Project.findById(req.params.id)
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .populate('service', 'title');

    res.json({
      success: true,
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  completeProject
};
