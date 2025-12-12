const express = require('express');
const router = express.Router();
const {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
  reportReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const {
  reviewValidation,
  validateId,
  validate,
} = require('../middleware/validator');

// Public routes
router.get('/', getAllReviews);
router.get('/:id', validateId, validate, getReview);

// Protected routes
router.use(protect);

router.post('/', reviewValidation, validate, createReview);
router.put('/:id', validateId, validate, updateReview);
router.delete('/:id', validateId, validate, deleteReview);
router.put('/:id/helpful', validateId, validate, markHelpful);
router.put('/:id/report', validateId, validate, reportReview);

module.exports = router;
