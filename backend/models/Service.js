const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  pricing: [{
    tier: { type: String, enum: ['basic', 'standard', 'premium'], required: true },
    price: { type: Number, required: true },
    description: { type: String },
  }],
  samples: [{ type: String }], // URLs to sample work
  rating: { type: Number, default: 0 },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
