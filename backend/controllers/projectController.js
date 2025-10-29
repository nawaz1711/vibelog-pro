const Project = require('../models/Project');
const Service = require('../models/Service');
const User = require('../models/User');
const Notification = require('../models/Notification');

const getProjects = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { $or: [{ clientId: req.user.id }, { creatorId: req.user.id }] };
    if (status) query.status = status;
    
    const projects = await Project.find(query)
      .populate('clientId', 'name profilePic email')
      .populate('creatorId', 'name profilePic email')
      .populate('serviceId', 'title')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { serviceId, amount, deadline, pricingTier } = req.body;
    
    // Verify service exists
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    const project = new Project({
      clientId: req.user.id,
      creatorId: service.creatorId,
      serviceId,
      amount,
      deadline: deadline ? new Date(deadline) : undefined,
      pricingTier
    });
    
    await project.save();
    
    // Create notification for creator
    await Notification.create({
      userId: service.creatorId,
      message: `${req.user.name} hired you for "${service.title}"`,
      type: 'project',
      link: `/projects/${project._id}`
    });
    
    const populatedProject = await Project.findById(project._id)
      .populate('clientId', 'name profilePic')
      .populate('creatorId', 'name profilePic')
      .populate('serviceId', 'title');
    
    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('clientId', 'name profilePic email')
      .populate('creatorId', 'name profilePic email')
      .populate('serviceId', 'title description pricing');
    
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    // Check authorization
    const isAuthorized = project.clientId._id.toString() === req.user.id || 
                         project.creatorId._id.toString() === req.user.id;
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    const isAuthorized = project.clientId.toString() === req.user.id || 
                         project.creatorId.toString() === req.user.id;
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // Only allow certain fields to be updated
    const { status, messages } = req.body;
    if (status) project.status = status;
    if (messages) project.messages = messages;
    
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    // Only client can mark as completed
    if (project.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only client can complete project' });
    }
    
    project.status = 'completed';
    await project.save();
    
    res.json({ message: 'Project completed', project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProjects, createProject, getProjectById, updateProject, completeProject };
