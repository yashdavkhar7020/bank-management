// backend/controllers/banksController.js

const Bank = require('../models/BankAccounts'); // Assuming you have a Bank model
const { validationResult } = require('express-validator');

// Get All Banks - Protected Route
exports.getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.json(banks);
    } catch (err) {
        console.error('Error fetching banks:', err.message);
        res.status(500).json({ msg: 'Internal Server Error fetching banks' });
    }
};

// Add a Bank - Protected Route
exports.addBank = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { ifsc, branch, bankName, accountNumber, accountHolderName } = req.body;

    try {
        // Create new bank account
        const newBank = {
            ifsc,
            branch,
            bankName,
            accountNumber,
            accountHolderName
        };

        // Assuming user is attached to req.user by auth middleware
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.accounts.push(newBank);
        await user.save();

        res.json({ msg: 'Bank account added successfully', account: newBank });
    } catch (err) {
        console.error('Error adding bank account:', err.message);
        res.status(500).json({ msg: 'Internal Server Error adding bank account' });
    }
};

// Delete a Bank - Protected Route
exports.deleteBank = async (req, res) => {
    const { id } = req.params;

    try {
        // Find user
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Find the bank account index
        const accountIndex = user.accounts.findIndex(account => account._id.toString() === id);
        if (accountIndex === -1) {
            return res.status(404).json({ msg: 'Bank account not found' });
        }

        // Remove the bank account
        user.accounts.splice(accountIndex, 1);
        await user.save();

        res.json({ msg: 'Bank account deleted successfully' });
    } catch (err) {
        console.error('Error deleting bank account:', err.message);
        res.status(500).json({ msg: 'Internal Server Error deleting bank account' });
    }
};
