// src/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust according to your backend
    withCredentials: true, // Include credentials if needed
});

// Add a request interceptor to include token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
