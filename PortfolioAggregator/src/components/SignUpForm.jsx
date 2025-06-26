import React, { useState } from 'react';
import axios from 'axios';
import '../styling/SignUpRight.css';

const SignUpForm = ({ onSwitchToLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', {
                firstName,
                lastName,
                email,
                password,
                mobileNo: `${countryCode}${mobileNo}`,
            });
            alert('Registration successful');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setMobileNo('');
            setCountryCode('+91');
        } catch (err) {
            setError(err.response?.data?.errors?.map(e => e.msg).join(', ') || err.response?.data?.error || 'Registration failed');
        }
    };

    const countryCodes = [
        { code: '+91', country: 'IN' },
        { code: '+1', country: 'US' },
        { code: '+44', country: 'GB' },
        { code: '+61', country: 'AU' },
    ];

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="name-row">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="name-input"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="name-input"
                />
            </div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <div className="mobile-row">
                <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="country-code"
                >
                    {countryCodes.map(({ code, country }) => (
                        <option key={code} value={code}>
                            {country} {code}
                        </option>
                    ))}
                </select>
                <span className="country-code-display">{countryCode}</span>
                <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    required
                    className="mobile-input"
                />
            </div>
            <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
            <p className="switch-link">
                Already have an account?{' '}
                <span onClick={onSwitchToLogin} className="link">
                    Log in
                </span>
            </p>
        </form>
    );
};

export default SignUpForm;