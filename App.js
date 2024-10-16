// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import Signup from './components/Signup';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import BankAccount from './components/BankAccount';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings'; // Ensure you have a Settings component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/adminpanel" element={<AdminPanel />} />
                <Route path="/bankaccount" element={<BankAccount />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
