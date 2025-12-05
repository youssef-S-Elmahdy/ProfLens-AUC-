const express = require('express');
const router = express.Router();
const {
  getAllProfessors,
  getProfessor,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  searchProfessors,
} = require('../controllers/professorController');
const { protect, restrictTo } = require('../middleware/auth');
const {
  professorValidation,
  validateId,
  validate,
} = require('../middleware/validator');

// Public routes
router.get('/', getAllProfessors);
router.get('/search', searchProfessors);
router.get('/:id', validateId, validate, getProfessor);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', professorValidation, validate, createProfessor);
router.put('/:id', validateId, validate, updateProfessor);
router.delete('/:id', validateId, validate, deleteProfessor);

module.exports = router;
