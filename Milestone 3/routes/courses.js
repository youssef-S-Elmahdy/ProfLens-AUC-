const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourses,
} = require('../controllers/courseController');
const { protect, restrictTo } = require('../middleware/auth');
const {
  courseValidation,
  validateId,
  validate,
} = require('../middleware/validator');

// Public routes
router.get('/', getAllCourses);
router.get('/search', searchCourses);
router.get('/:id', validateId, validate, getCourse);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', courseValidation, validate, createCourse);
router.put('/:id', validateId, validate, updateCourse);
router.delete('/:id', validateId, validate, deleteCourse);

module.exports = router;
