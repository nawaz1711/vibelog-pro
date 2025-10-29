const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  amount: { type: Number, required: true },
  deadline: { type: Date },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
