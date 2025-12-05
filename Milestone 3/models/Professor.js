const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      enum: ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Instructor'],
      default: 'Professor',
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
    },
    departmentName: {
      type: String,
      required: [true, 'Department name is required'],
    },
    courses: [
      {
        type: String, // Course codes like "CSCE 2301"
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
      clarity: { type: Number, default: 0, min: 0, max: 5 },
      helpfulness: { type: Number, default: 0, min: 0, max: 5 },
      engagement: { type: Number, default: 0, min: 0, max: 5 },
      grading: { type: Number, default: 0, min: 0, max: 5 },
      workload: { type: Number, default: 0, min: 0, max: 5 },
      communication: { type: Number, default: 0, min: 0, max: 5 },
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
professorSchema.index({ firstName: 'text', lastName: 'text', departmentName: 'text' });
professorSchema.index({ department: 1 });
professorSchema.index({ overallRating: -1 });

module.exports = mongoose.model('Professor', professorSchema);
