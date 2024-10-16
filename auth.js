// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

// Rate Limiter for Auth Routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: 'Too many authentication attempts from this IP, please try again after 15 minutes'
});

// Debugging Log
console.log('Auth Controller:', authController);

// Register Route
router.post('/register', authLimiter, [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], authController.register);

// Login Route
router.post('/login', authLimiter, [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.login);

// Get Current User Route
router.get('/me', auth, authController.getCurrentUser);

// Logout Route
router.post('/logout', authController.logout);

module.exports = router;
