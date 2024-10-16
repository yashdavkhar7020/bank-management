// backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

// Register Controller
exports.register = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ msg: 'Internal Server Error during registration' });
    }
};

// Login Controller
exports.login = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create JWT Payload
        const payload = {
            userId: user.id,
            isAdmin: user.isAdmin
        };

        // Sign Token and Set as httpOnly Cookie
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expiration
            (err, token) => {
                if (err) {
                    console.error('Error signing JWT:', err.message);
                    return res.status(500).json({ msg: 'Error signing token' });
                }
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Set to true in production
                    sameSite: 'lax', // Adjust based on your requirements
                    maxAge: 3600000 // 1 hour in milliseconds
                });
                res.json({ msg: 'Logged in successfully' });
            }
        );
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ msg: 'Internal Server Error during login' });
    }
};

// Get Current User Controller
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching current user:', err.message);
        res.status(500).json({ msg: 'Internal Server Error fetching user' });
    }
};

// Logout Controller
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error('Error during logout:', err.message);
        res.status(500).json({ msg: 'Internal Server Error during logout' });
    }
};
