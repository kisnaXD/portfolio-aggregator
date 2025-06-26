import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';
import '../styling/SignUpRight.css';

const SignUpRight = () => {
    const [selectedOption, setSelectedOption] = useState('signup');

    const handleSwitchToLogin = () => setSelectedOption('login');

    return (
        <div className="sign-up-right-container">
            <div className="choice-container">
                <div
                    className={`sign-up ${selectedOption === 'signup' ? 'active' : ''}`}
                    onClick={() => setSelectedOption('signup')}
                >
                    <p>Sign Up</p>
                </div>
                <div
                    className={`log-in ${selectedOption === 'login' ? 'active' : ''}`}
                    onClick={() => setSelectedOption('login')}
                >
                    <p>Log In</p>
                </div>
            </div>
            <div className="form-container">
                {selectedOption === 'signup' ? (
                    <SignUpForm onSwitchToLogin={handleSwitchToLogin} />
                ) : (
                    <LogInForm />
                )}
            </div>
        </div>
    );
};

export default SignUpRight;