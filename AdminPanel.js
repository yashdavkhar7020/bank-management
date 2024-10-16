import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from '@mui/material';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/users'); // Ensure this URL matches the backend route
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data.users); // Access users property from the response
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Container
            maxWidth="lg"
            sx={{
                marginTop: '20px',
                backgroundColor: '#f5f5f5', // Light grey color
                padding: '20px', // Optional: add some padding
                borderRadius: '8px', // Optional: add rounded corners
                boxShadow: 2, // Optional: add a subtle shadow for depth
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Admin Panel
            </Typography>
            {error && (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            )}
            {users.length === 0 ? (
                <Typography variant="body1" align="center">
                    No users found.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {users.map(user => (
                        <Grid item xs={12} sm={6} md={4} key={user._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{user.username}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {user.email}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                    <Button size="small" color="secondary">
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default AdminPanel;
