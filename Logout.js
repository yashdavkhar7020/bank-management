// src/components/Logout.js
import React from 'react';
import { Button, Typography, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout'); // Use relative path with proxy
      setMessage('Logged out successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage('Logout failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Logout
      </Typography>
      {message && <Alert severity="info">{message}</Alert>}
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Logout;
