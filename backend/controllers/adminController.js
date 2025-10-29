const User = require('../models/User');
const Post = require('../models/Post');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Payment = require('../models/Payment');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalPayments = await Payment.countDocuments();
    res.json({ totalUsers, totalPosts, totalServices, totalProjects, totalPayments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUsers, deleteUser, getStats };
