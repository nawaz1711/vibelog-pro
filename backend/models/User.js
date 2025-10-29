const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['creator', 'client', 'admin'], default: 'creator' },
  skills: [{ type: String }],
  bio: { type: String },
  profilePic: { type: String },
  wallet: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  socialLinks: {
    twitter: String,
    linkedin: String,
    youtube: String,
    instagram: String,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isVerified: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
