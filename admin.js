const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// GET /api/admin/users - Fetch all registered users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'username email createdAt'); // Select fields to return
        res.json({ users }); // Ensure this matches the expected structure in AdminPanel
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
