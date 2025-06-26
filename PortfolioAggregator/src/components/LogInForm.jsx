import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styling/SignUpRight.css';

const LoginForm = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                identifier,
                password,
            });
            localStorage.setItem('token', response.data.token);
            setIdentifier('');
            setPassword('');
            setError('');
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Log In</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Email or Phone Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Log In</button>
            <p className="switch-link">
                <span className="link">Forgot Password?</span>
            </p>
        </form>
    );
};

export default LoginForm;