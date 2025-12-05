const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    type: {
      type: String,
      enum: ['professor', 'course'],
      required: [true, 'Review type is required'],
    },
    // For professor reviews
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    // Overall rating
    rating: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: 1,
      max: 5,
    },
    // Professor-specific ratings
    clarity: {
      type: Number,
      min: 0,
      max: 5,
    },
    helpfulness: {
      type: Number,
      min: 0,
      max: 5,
    },
    engagement: {
      type: Number,
      min: 0,
      max: 5,
    },
    grading: {
      type: Number,
      min: 0,
      max: 5,
    },
    workload: {
      type: Number,
      min: 0,
      max: 5,
    },
    communication: {
      type: Number,
      min: 0,
      max: 5,
    },
    // Course-specific ratings
    difficulty: {
      type: Number,
      min: 0,
      max: 5,
    },
    usefulness: {
      type: Number,
      min: 0,
      max: 5,
    },
    contentQuality: {
      type: Number,
      min: 0,
      max: 5,
    },
    // Written review
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      minlength: [50, 'Comment must be at least 50 characters'],
      maxlength: [2000, 'Comment cannot exceed 2000 characters'],
    },
    // Metadata
    semester: {
      type: String,
    },
    anonymous: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    helpfulBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reported: {
      type: Boolean,
      default: false,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reviewSchema.index({ professor: 1, createdAt: -1 });
reviewSchema.index({ course: 1, createdAt: -1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: -1 });

module.exports = mongoose.model('Review', reviewSchema);
