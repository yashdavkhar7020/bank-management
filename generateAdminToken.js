// backend/generateAdminToken.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path if necessary

dotenv.config();

const generateAdminToken = async () => {
    const mongodbUri = process.env.MONGODB_URI;
    const jwtSecret = process.env.JWT_SECRET;

    if (!mongodbUri || !jwtSecret) {
        console.error('MONGODB_URI or JWT_SECRET is not defined. Please check your .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        const adminUser = await User.findOne({ email: 'admin@example.com' });
        if (!adminUser) {
            console.error('Admin user not found. Please create an admin user first.');
            process.exit(1);
        }

        const token = jwt.sign(
            { id: adminUser._id, role: adminUser.role },
            jwtSecret,
            { expiresIn: '1h' }
        );

        console.log('Admin JWT Token:', token);

        process.exit(0);
    } catch (error) {
        console.error('Error generating admin token:', error);
        process.exit(1);
    }
};

generateAdminToken();
