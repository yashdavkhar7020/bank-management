// // src/context/AuthContext.js
// import React, { createContext, useContext } from 'react';
// import axios from 'axios';

// // Create the AuthContext
// export const AuthContext = createContext();

// // Create the AuthProvider component
// export const AuthProvider = ({ children }) => {
//     const signup = async (username, email, password) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/register', {
//                 username,
//                 email,
//                 password,
//             });
//             return { success: true, message: response.data.msg };
//         } catch (error) {
//             if (error.response) {
//                 return { success: false, message: error.response.data.msg || 'Registration failed' };
//             } else {
//                 return { success: false, message: 'Registration failed. Please try again.' };
//             }
//         }
//     };

//     const login = async (email, password) => {
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/login', {
//                 email,
//                 password,
//             });
//             return { success: true, message: response.data.msg };
//         } catch (error) {
//             if (error.response) {
//                 return { success: false, message: error.response.data.msg || 'Login failed' };
//             } else {
//                 return { success: false, message: 'Login failed. Please try again.' };
//             }
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ signup, login }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Manage user state

    const signup = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password,
            });
            return { success: true, message: response.data.msg };
        } catch (error) {
            if (error.response) {
                return { success: false, message: error.response.data.msg || 'Registration failed' };
            } else {
                return { success: false, message: 'Registration failed. Please try again.' };
            }
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            setUser(response.data.user); // Assuming the API returns user data
            return { success: true, message: response.data.msg };
        } catch (error) {
            if (error.response) {
                return { success: false, message: error.response.data.msg || 'Login failed' };
            } else {
                return { success: false, message: 'Login failed. Please try again.' };
            }
        }
    };

    const logout = () => {
        setUser(null); // Clear user state on logout
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
