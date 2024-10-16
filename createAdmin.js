// backend/createAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path if necessary

dotenv.config();

const createAdmin = async () => {
    const mongodbUri = process.env.MONGODB_URI;

    if (!mongodbUri) {
        console.error('MONGODB_URI is not defined. Please check your .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        const existingAdmin = await User.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('adminpassword', salt); // Replace with your desired password

        const adminUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
        });

        await adminUser.save();
        console.log('Admin user created successfully.');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
