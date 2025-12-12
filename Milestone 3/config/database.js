const mongoose = require('mongoose');
const logger = require('../utils/logger');

let isConnected = false;

const connectDB = async () => {
  // Reuse existing connection in serverless environments
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    logger.error('MongoDB connection error:', error);
    console.error(`Error: ${error.message}`);

    // In serverless environments, don't exit - let it retry on next request
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      throw error; // Throw error instead of exiting in production
    }
  }
};

module.exports = connectDB;
