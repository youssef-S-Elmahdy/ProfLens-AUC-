const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  validate,
} = require('../middleware/validator');

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.use(protect); // All routes below require authentication

router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/password', changePassword);

module.exports = router;
