// src/components/Login.js

import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Make sure this is correctly imported

    const handleLogin = async () => {
        setError('');
        setSuccess('');

        if (!email || !password) {
            setError('All fields are required.');
            return;
        }

        const result = await login(email, password); // Call the login function here

        if (result.success) {
            setSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/BankAccount'); // Adjust the route as necessary
            }, 2000); // Redirect after 2 seconds
        } else {
            setError(result.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Log In
            </Typography>
            {success && <Alert severity="success">{success}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                style={{ marginTop: '20px' }}
            >
                Log In
            </Button>
        </Container>
    );
};

export default Login;
