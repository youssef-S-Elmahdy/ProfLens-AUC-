const Professor = require('../models/Professor');
const { AppError } = require('../middleware/errorHandler');

// @desc    Get all professors
// @route   GET /api/professors
// @access  Public
exports.getAllProfessors = async (req, res, next) => {
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
    const professors = await Professor.find(query)
      .sort(sortBy === 'name' ? { lastName: 1 } : { [sortBy]: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-reviews');

    // Get total count
    const count = await Professor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: professors.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: { professors },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single professor by ID
// @route   GET /api/professors/:id
// @access  Public
exports.getProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.findById(req.params.id).populate({
      path: 'reviews',
      select: 'rating comment createdAt semester helpful',
      options: { sort: { createdAt: -1 }, limit: 50 },
    });

    if (!professor) {
      return next(new AppError('Professor not found', 404));
    }

    res.status(200).json({
      success: true,
      data: { professor },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create professor
// @route   POST /api/professors
// @access  Private (Admin only)
exports.createProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Professor created successfully',
      data: { professor },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update professor
// @route   PUT /api/professors/:id
// @access  Private (Admin only)
exports.updateProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!professor) {
      return next(new AppError('Professor not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Professor updated successfully',
      data: { professor },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete professor
// @route   DELETE /api/professors/:id
// @access  Private (Admin only)
exports.deleteProfessor = async (req, res, next) => {
  try {
    const professor = await Professor.findByIdAndDelete(req.params.id);

    if (!professor) {
      return next(new AppError('Professor not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Professor deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search professors
// @route   GET /api/professors/search
// @access  Public
exports.searchProfessors = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        data: { professors: [] },
      });
    }

    const professors = await Professor.find({
      $text: { $search: q },
    })
      .select('firstName lastName title department departmentName overallRating totalReviews')
      .limit(10);

    res.status(200).json({
      success: true,
      count: professors.length,
      data: { professors },
    });
  } catch (error) {
    next(error);
  }
};
