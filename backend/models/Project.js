const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  requirements: {
    type: String,
    required: [true, 'Please add project requirements'],
    maxlength: [5000, 'Requirements cannot be more than 5000 characters']
  },
  budget: {
    type: Number,
    required: [true, 'Please add a budget'],
    min: [0, 'Budget cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  deadline: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  attachments: [{
    name: String,
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Message cannot be more than 1000 characters']
    },
    attachments: [{
      name: String,
      url: String
    }]
  }],
  milestones: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending'
    },
    completedAt: Date
  }],
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  rating: {
    freelancerRating: {
      type: Number,
      min: 1,
      max: 5
    },
    clientRating: {
      type: Number,
      min: 1,
      max: 5
    },
    freelancerReview: String,
    clientReview: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (this.completedAt && this.createdAt) {
    return Math.ceil((this.completedAt - this.createdAt) / (1000 * 60 * 60 * 24)); // days
  }
  return null;
});

// Index for better query performance
projectSchema.index({ client: 1, createdAt: -1 });
projectSchema.index({ freelancer: 1, createdAt: -1 });
projectSchema.index({ status: 1 });
projectSchema.index({ service: 1 });

module.exports = mongoose.model('Project', projectSchema);
