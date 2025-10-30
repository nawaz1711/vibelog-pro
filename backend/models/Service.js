const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Review comment cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a service title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['web-development', 'mobile-development', 'design', 'writing', 'marketing', 'consulting', 'other'],
    default: 'other'
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  deliveryTime: {
    type: Number, // in days
    required: [true, 'Please add delivery time'],
    min: [1, 'Delivery time must be at least 1 day']
  },
  features: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String // URLs to service images
  }],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  portfolio: [{
    title: String,
    url: String,
    description: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate average rating when reviews are added/updated
serviceSchema.methods.calculateRating = function() {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = sum / this.reviews.length;
    this.totalReviews = this.reviews.length;
  } else {
    this.rating = 0;
    this.totalReviews = 0;
  }
};

// Virtual for review count
serviceSchema.virtual('reviewCount').get(function() {
  return this.reviews.length;
});

// Index for better query performance
serviceSchema.index({ freelancer: 1, createdAt: -1 });
serviceSchema.index({ category: 1, rating: -1 });
serviceSchema.index({ featured: 1, rating: -1 });
serviceSchema.index({ tags: 1 });
serviceSchema.index({ price: 1 });

module.exports = mongoose.model('Service', serviceSchema);
