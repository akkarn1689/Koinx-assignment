// middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10000, 
  message: "Too many requests from this IP, please try again after 15 minutes.",
  headers: true, 
});

module.exports = limiter;
