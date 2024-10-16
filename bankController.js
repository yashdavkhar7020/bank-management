// banksController.js

const BankAccount = require('../models/BankAccount'); // Assuming you have a Mongoose model for BankAccount

// Controller to add a new bank account
const addBankAccount = async (req, res) => {
    try {
        const newAccount = new BankAccount(req.body); // Assuming req.body has the account details
        await newAccount.save();
        res.status(201).json({ message: 'Bank account created successfully', account: newAccount });
    } catch (error) {
        res.status(500).json({ message: 'Error creating bank account', error: error.message });
    }
};

// Controller to get all bank accounts
const getBankAccounts = async (req, res) => {
    try {
        const accounts = await BankAccount.find(); // Fetching all bank accounts
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bank accounts', error: error.message });
    }
};

// Controller to delete a bank account
const deleteBankAccount = async (req, res) => {
    try {
        const { id } = req.params; // Getting the account ID from request parameters
        const deletedAccount = await BankAccount.findByIdAndDelete(id); // Deleting the account
        if (!deletedAccount) {
            return res.status(404).json({ message: 'Bank account not found' });
        }
        res.status(200).json({ message: 'Bank account deleted successfully', account: deletedAccount });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bank account', error: error.message });
    }
};

// Exporting the controller functions
module.exports = {
    addBankAccount,
    getBankAccounts,
    deleteBankAccount,
};
