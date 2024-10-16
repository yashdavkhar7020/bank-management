// src/components/Dashboard.js

import React, { useContext, useEffect, useState } from 'react';
import { Typography, Container, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Fetch user details from the database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Adjust the URL based on your API setup
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Set user data to state
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '40px' }}>
        <CircularProgress />
        <Typography variant="body1" style={{ marginTop: '20px' }}>Loading user information...</Typography>
      </Container>
    );
  }

  // Check if user data is available
  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Typography variant="body1" color="error">Unable to load user information.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome, {userData.username}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {userData.email}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/bank-accounts')} style={{ marginRight: '10px' }}>
        Manage Bank Accounts
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      {/* Additional functionalities (e.g., settings) can be added here */}
      <Button variant="outlined" onClick={() => navigate('/settings')} style={{ marginTop: '20px' }}>
        Settings
      </Button>
    </Container>
  );
};

export default Dashboard;
