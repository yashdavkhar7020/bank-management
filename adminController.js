// backend/controllers/adminController.js

const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json({ users });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
