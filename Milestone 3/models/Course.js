const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    departmentName: {
      type: String,
      required: [true, 'Department name is required'],
    },
    credits: {
      type: Number,
      required: [true, 'Credits are required'],
      min: 1,
      max: 6,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    professors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
      },
    ],
    overallRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      difficulty: { type: Number, default: 0, min: 0, max: 5 },
      workload: { type: Number, default: 0, min: 0, max: 5 },
      usefulness: { type: Number, default: 0, min: 0, max: 5 },
      contentQuality: { type: Number, default: 0, min: 0, max: 5 },
    },
    tags: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
courseSchema.index({ code: 'text', name: 'text', departmentName: 'text' });
courseSchema.index({ department: 1 });
courseSchema.index({ overallRating: -1 });

module.exports = mongoose.model('Course', courseSchema);
