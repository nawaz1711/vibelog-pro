const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add payment amount'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'INR']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please add payment method'],
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true // Allows null values but ensures uniqueness when present
  },
  paymentGateway: {
    type: String,
    enum: ['stripe', 'paypal', 'razorpay', 'other']
  },
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed // Store gateway-specific response data
  },
  description: {
    type: String,
    trim: true
  },
  fee: {
    type: Number,
    default: 0,
    min: 0
  },
  netAmount: {
    type: Number,
    default: function() {
      return this.amount - this.fee;
    }
  },
  refundedAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  refundReason: {
    type: String,
    trim: true
  },
  processedAt: {
    type: Date
  },
  refundedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate net amount
paymentSchema.pre('save', function(next) {
  if (this.isModified('amount') || this.isModified('fee')) {
    this.netAmount = this.amount - this.fee;
  }
  next();
});

// Index for better query performance
paymentSchema.index({ client: 1, createdAt: -1 });
paymentSchema.index({ freelancer: 1, createdAt: -1 });
paymentSchema.index({ project: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
