// backend/models/User.js

const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({
    ifsc: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    accounts: [BankAccountSchema] // Embed bank accounts
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
