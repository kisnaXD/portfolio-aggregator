import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignUp from './components/SignUp.jsx';
import Dashboard from './components/Dashboard.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                navigate('/signup');
                return;
            }

            try {
                await axios.get('http://localhost:5000/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Token verification failed:', err.response?.data);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/signup');
            }
        };

        verifyToken();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
};

const App = () => {
    return (
        <Router>
            <div className="main-content">
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;