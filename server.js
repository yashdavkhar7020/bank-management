// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet'); // Optional: for securing HTTP headers

const authRoutes = require('./routes/auth'); // Import auth routes
const banksRoutes = require('./routes/banks'); // Import bank account routes
const adminRoutes = require('./routes/admin'); // Import admin routes
const authMiddleware = require('./middleware/auth'); // Import auth middleware

dotenv.config();
const app = express();

// Middleware to enable CORS before defining routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    credentials: true, // Allow credentials
}));

app.use(helmet()); // Use Helmet for securing HTTP headers
app.use(express.json()); // Parse JSON bodies

// Database connection
const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
    console.error('MONGODB_URI is not defined. Please check your .env file.');
    process.exit(1); // Exit if the environment variable is not set
}

mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit on connection error
    });

// Routes
app.use('/api/auth', authRoutes); // Set up auth routes
app.use('/api/accounts', authMiddleware, banksRoutes); // Apply auth middleware to bank account routes
app.use('/api/admin', adminRoutes); // Apply admin routes with their own middleware

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
    console.log('Shutting down gracefully...');
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed.');
        server.close(() => {
            console.log('Server closed.');
            process.exit(0);
        });
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
