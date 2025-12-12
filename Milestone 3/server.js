const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database (non-blocking for serverless)
connectDB().catch(err => {
  logger.error('Initial MongoDB connection failed:', err);
  console.error('MongoDB connection will retry on first request');
});

// Security middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

// Ensure database connection before processing requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    logger.error('Database connection failed:', error);
    res.status(503).json({
      success: false,
      message: 'Database connection unavailable. Please try again.',
    });
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/professors', require('./routes/professors'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/reviews', require('./routes/reviews'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to ProfLens AUC API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      professors: '/api/professors',
      courses: '/api/courses',
      reviews: '/api/reviews',
    },
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`
┌─────────────────────────────────────────┐
│  ProfLens AUC API Server                │
│  Running on http://localhost:${PORT}    │
│  Environment: ${process.env.NODE_ENV || 'development'}              │
└─────────────────────────────────────────┘
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err);
  process.exit(1);
});

module.exports = app;
