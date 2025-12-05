const logger = require('../utils/logger');

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle Mongoose duplicate key error
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const message = `${field} already exists. Please use another value.`;
  return new AppError(message, 400);
};

// Handle Mongoose validation error
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// Handle JWT errors
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again.', 401);

// Send error in development
const sendErrorDev = (err, res) => {
  logger.error('Error:', {
    status: err.statusCode,
    message: err.message,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message,
    stack: err.stack,
    details: err,
  });
};

// Send error in production
const sendErrorProd = (err, res) => {
  // Operational errors - send to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // Programming or unknown errors - don't leak details
  else {
    logger.error('Unexpected Error:', err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
};

// Main error handling middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Mongoose duplicate key error
    if (err.code === 11000) error = handleDuplicateKeyError(err);

    // Mongoose validation error
    if (err.name === 'ValidationError') error = handleValidationError(err);

    // JWT errors
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

module.exports = { AppError, errorHandler };
