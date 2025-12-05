const { body, param, query, validationResult } = require('express-validator');

// Validation error handler
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// User validation rules
exports.registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .matches(/@aucegypt\.edu$/)
    .withMessage('Email must be an @aucegypt.edu address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
];

exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Review validation rules
exports.reviewValidation = [
  body('type')
    .isIn(['professor', 'course'])
    .withMessage('Type must be either professor or course'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Overall rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage('Comment must be between 50 and 2000 characters'),
];

// Professor validation
exports.professorValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('departmentName')
    .trim()
    .notEmpty()
    .withMessage('Department name is required'),
];

// Course validation
exports.courseValidation = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Course code is required')
    .toUpperCase(),
  body('name').trim().notEmpty().withMessage('Course name is required'),
  body('department').trim().notEmpty().withMessage('Department is required'),
  body('departmentName')
    .trim()
    .notEmpty()
    .withMessage('Department name is required'),
  body('credits')
    .isInt({ min: 1, max: 6 })
    .withMessage('Credits must be between 1 and 6'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
];

// ID validation
exports.validateId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];
