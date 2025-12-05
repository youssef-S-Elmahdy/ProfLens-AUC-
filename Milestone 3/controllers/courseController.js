const Course = require('../models/Course');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res, next) => {
  try {
    const {
      department,
      search,
      minRating,
      sortBy = 'overallRating',
      page = 1,
      limit = 20,
    } = req.query;

    // Build query
    let query = {};

    if (department) {
      query.department = department;
    }

    if (minRating) {
      query.overallRating = { $gte: parseFloat(minRating) };
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const courses = await Course.find(query)
      .sort(sortBy === 'name' ? { name: 1 } : { [sortBy]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('professors', 'firstName lastName title overallRating')
      .select('-reviews');

    // Get total count
    const count = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      count: courses.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: { courses },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('professors', 'firstName lastName title email overallRating totalReviews')
      .populate({
        path: 'reviews',
        select: 'rating comment createdAt semester helpful',
        options: { sort: { createdAt: -1 }, limit: 50 },
      });

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Admin only)
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin only)
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: { course },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search courses
// @route   GET /api/courses/search
// @access  Public
exports.searchCourses = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        data: { courses: [] },
      });
    }

    const courses = await Course.find({
      $text: { $search: q },
    })
      .select('code name department departmentName credits overallRating totalReviews')
      .limit(10);

    res.status(200).json({
      success: true,
      count: courses.length,
      data: { courses },
    });
  } catch (error) {
    next(error);
  }
};
