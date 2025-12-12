const Review = require('../models/Review');
const Professor = require('../models/Professor');
const Course = require('../models/Course');
const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');

// Helper function to update ratings
const updateRatings = async (targetModel, targetId, type) => {
  const reviews = await Review.find({
    [type]: targetId,
  });

  if (reviews.length === 0) return;

  const totalReviews = reviews.length;
  let ratings = {};

  if (type === 'professor') {
    ratings = {
      overallRating: 0,
      'ratings.clarity': 0,
      'ratings.helpfulness': 0,
      'ratings.engagement': 0,
      'ratings.grading': 0,
      'ratings.workload': 0,
      'ratings.communication': 0,
    };

    reviews.forEach((review) => {
      ratings.overallRating += review.rating;
      ratings['ratings.clarity'] += review.clarity || 0;
      ratings['ratings.helpfulness'] += review.helpfulness || 0;
      ratings['ratings.engagement'] += review.engagement || 0;
      ratings['ratings.grading'] += review.grading || 0;
      ratings['ratings.workload'] += review.workload || 0;
      ratings['ratings.communication'] += review.communication || 0;
    });
  } else {
    ratings = {
      overallRating: 0,
      'ratings.difficulty': 0,
      'ratings.workload': 0,
      'ratings.usefulness': 0,
      'ratings.contentQuality': 0,
    };

    reviews.forEach((review) => {
      ratings.overallRating += review.rating;
      ratings['ratings.difficulty'] += review.difficulty || 0;
      ratings['ratings.workload'] += review.workload || 0;
      ratings['ratings.usefulness'] += review.usefulness || 0;
      ratings['ratings.contentQuality'] += review.contentQuality || 0;
    });
  }

  // Calculate averages
  Object.keys(ratings).forEach((key) => {
    ratings[key] = ratings[key] / totalReviews;
  });

  // Update target
  await targetModel.findByIdAndUpdate(targetId, {
    ...ratings,
    totalReviews,
  });
};

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getAllReviews = async (req, res, next) => {
  try {
    const { type, professorId, courseId, sortBy = 'createdAt', page = 1, limit = 20 } = req.query;

    let query = {};

    if (type) query.type = type;
    if (professorId) query.professor = professorId;
    if (courseId) query.course = courseId;

    const reviews = await Review.find(query)
      .sort(sortBy === 'rating' ? { rating: -1 } : { [sortBy]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'firstName lastName')
      .populate('professor', 'firstName lastName title')
      .populate('course', 'code name');

    const count = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      count: reviews.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: { reviews },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'firstName lastName')
      .populate('professor', 'firstName lastName title')
      .populate('course', 'code name');

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    res.status(200).json({
      success: true,
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { type, professorId, courseId, ...reviewData } = req.body;

    // Validate type-specific requirements
    if (type === 'professor' && !professorId) {
      return next(new AppError('Professor ID is required for professor reviews', 400));
    }
    if (type === 'course' && !courseId) {
      return next(new AppError('Course ID is required for course reviews', 400));
    }

    // Check if target exists
    let target;
    if (type === 'professor') {
      target = await Professor.findById(professorId);
      if (!target) {
        return next(new AppError('Professor not found', 404));
      }
    } else {
      target = await Course.findById(courseId);
      if (!target) {
        return next(new AppError('Course not found', 404));
      }
    }

    // Create review
    const review = await Review.create({
      ...reviewData,
      type,
      professor: type === 'professor' ? professorId : undefined,
      course: type === 'course' ? courseId : undefined,
      user: req.user.id,
      semester: reviewData.semester || `Fall ${new Date().getFullYear()}`,
    });

    // Add review to target
    if (type === 'professor') {
      await Professor.findByIdAndUpdate(professorId, {
        $push: { reviews: review._id },
      });
      await updateRatings(Professor, professorId, 'professor');
    } else {
      await Course.findByIdAndUpdate(courseId, {
        $push: { reviews: review._id },
      });
      await updateRatings(Course, courseId, 'course');
    }

    // Add review to user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { reviewsSubmitted: review._id },
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    // Check ownership
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to update this review', 403));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Update ratings
    const targetModel = review.type === 'professor' ? Professor : Course;
    const targetId = review.type === 'professor' ? review.professor : review.course;
    await updateRatings(targetModel, targetId, review.type);

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    // Check ownership
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('Not authorized to delete this review', 403));
    }

    await review.deleteOne();

    // Remove from target
    const targetModel = review.type === 'professor' ? Professor : Course;
    const targetId = review.type === 'professor' ? review.professor : review.course;

    await targetModel.findByIdAndUpdate(targetId, {
      $pull: { reviews: review._id },
    });

    await updateRatings(targetModel, targetId, review.type);

    // Remove from user
    await User.findByIdAndUpdate(review.user, {
      $pull: { reviewsSubmitted: review._id },
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark review as helpful
// @route   PUT /api/reviews/:id/helpful
// @access  Private
exports.markHelpful = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    // Check if user already marked as helpful
    const alreadyMarked = review.helpfulBy.includes(req.user.id);

    if (alreadyMarked) {
      // Remove helpful mark
      review.helpfulBy = review.helpfulBy.filter(
        (userId) => userId.toString() !== req.user.id
      );
      review.helpful = Math.max(0, review.helpful - 1);
    } else {
      // Add helpful mark
      review.helpfulBy.push(req.user.id);
      review.helpful += 1;
    }

    await review.save();

    res.status(200).json({
      success: true,
      message: alreadyMarked ? 'Helpful mark removed' : 'Marked as helpful',
      data: { helpful: review.helpful },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Report review
// @route   PUT /api/reviews/:id/report
// @access  Private
exports.reportReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('Review not found', 404));
    }

    review.reported = true;
    review.reportCount = (review.reportCount || 0) + 1;
    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review reported. Our team will review it shortly.',
      data: { reportCount: review.reportCount },
    });
  } catch (error) {
    next(error);
  }
};
