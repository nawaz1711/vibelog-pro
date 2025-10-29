const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password, role, skills } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role, skills: skills || [] });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.status(201).json({ message: 'User registered successfully', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, bio, skills, socialLinks, profilePic } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };
    if (profilePic) user.profilePic = profilePic;
    
    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    
    if (userId === currentUserId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }
    
    const user = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);
    
    if (!user || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.followers.includes(currentUserId)) {
      user.followers.push(currentUserId);
      currentUser.following.push(userId);
      await user.save();
      await currentUser.save();
      res.json({ message: 'Followed successfully', followers: user.followers });
    } else {
      res.status(400).json({ message: 'Already following this user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;
    
    const user = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);
    
    if (!user || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.followers = user.followers.filter(id => id.toString() !== currentUserId);
    currentUser.following = currentUser.following.filter(id => id.toString() !== userId);
    
    await user.save();
    await currentUser.save();
    res.json({ message: 'Unfollowed successfully', followers: user.followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getProfile, updateProfile, followUser, unfollowUser };
