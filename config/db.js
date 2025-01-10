const mongoose = require("mongoose");
const logger = require("./../utils/logger"); 
const config = require("./config");

// Default MongoDB URI from environment variables
const MONGO_URI = config.mongoURI || "mongodb://127.0.0.1:27017/crypto";

/**
 * Establishes a connection to MongoDB using Mongoose.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        // MongoDB Connection Options
        const options = {
            autoIndex: process.env.NODE_ENV === "development", // Auto-create indexes in dev only
            maxPoolSize: 10, // Maintain a pool of 10 connections
        };

        // Connecting to MongoDB
        const conn = await mongoose.connect(MONGO_URI, options);

        // Log successful connection
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        // Log connection errors
        logger.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit process on fatal connection error
    }
};

/**
 * Disconnects from MongoDB, useful for graceful shutdown or testing.
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed successfully.");
    } catch (err) {
        logger.error(`Error closing MongoDB connection: ${err.message}`);
    }
};

module.exports = { connectDB, disconnectDB };
