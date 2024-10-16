// src/components/HomeScreen.js

import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/signup'); // Redirect to Signup page
    };

    const handleAdminClick = () => {
        navigate('/AdminPanel'); // Redirect to Admin Panel
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Bank App
            </Typography>
            <Box mt={5}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleUserClick}
                    size="large"
                    style={{ marginRight: '20px' }}
                >
                    User
                </Button>
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleAdminClick}
                    size="large"
                >
                    Admin
                </Button>
            </Box>
        </Container>
    );
};

export default HomeScreen;
