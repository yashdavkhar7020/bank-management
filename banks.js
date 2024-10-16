const express = require('express');
const router = express.Router();
const BankAccount = require('../models/BankAccount'); // Ensure this path is correct

// Middleware to validate input (optional)
const validateAccountInput = (req, res, next) => {
    const { ifsc, branch, bankName, accountNumber, accountHolderName } = req.body;
    if (!ifsc || !branch || !bankName || !accountNumber || !accountHolderName) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    next();
};

// Create a new bank account
router.post('/', validateAccountInput, async (req, res) => {
    try {
        const { ifsc, branch, bankName, accountNumber, accountHolderName } = req.body;

        // Assuming you have a way to get the userId, e.g., from a JWT or session
        const userId = req.user._id; // Adjust this according to your authentication logic

        const newAccount = new BankAccount({
            userId,
            ifsc,
            branch,
            bankName,
            accountNumber,
            accountHolderName,
        });

        await newAccount.save();
        res.status(201).json({ success: true, account: newAccount });
    } catch (error) {
        console.error('Error creating bank account:', error);
        let message = 'Error creating bank account';

        // Specific error handling
        if (error.name === 'ValidationError') {
            message = error.message;
            return res.status(400).json({ success: false, message });
        } else if (error.code === 11000) { // MongoDB duplicate key error
            message = 'Account number must be unique.';
            return res.status(400).json({ success: false, message });
        }
        
        res.status(500).json({ success: false, message });
    }
});

// Fetch all bank accounts
router.get('/', async (req, res) => {
    // Check if req.user is defined
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    try {
        const accounts = await BankAccount.find({ userId: req.user._id }); // Access user ID from req.user
        res.status(200).json({ success: true, accounts });
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ success: false, message: 'Error fetching accounts' });
    }
});


// Delete a bank account
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await BankAccount.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Bank account deleted successfully!' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ success: false, message: 'Error deleting account' });
    }
});

module.exports = router;
