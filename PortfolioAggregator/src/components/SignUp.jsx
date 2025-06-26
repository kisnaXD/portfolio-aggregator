import React from 'react'
import '../styling/SignUp.css'
import SignUpLeft from './SignUpLeft'
import SignUpRight from './SignUpRight'

const SignUp = () => {
    return (
        <div className="sign-up-section">
            <SignUpLeft />
            <SignUpRight />
        </div>
    )
}

export default SignUp