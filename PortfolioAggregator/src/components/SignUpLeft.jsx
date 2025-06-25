import React from 'react'
import '../styling/SignUpLeft.css'
import brokerLogo from '../assets/broker_logo_dummy.png'
import { IoIosHome } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbSquareNumber1 } from "react-icons/tb";

const SignUpLeft = () => {
    return (
        <div className="sign-up-left-container">
            <h1 className="sign-up-left-heading">Portfolio <br></br>Aggregator</h1>
            <p className="sign-up-left-byline">Brokers we Support</p>
            <div className="sign-up-left-phone">
                <div className="sign-up-left-header">
                    <IoIosHome className="phone-icon"/>
                    <div className="search-bar">
                        <CiLock className="phone-icon" id="lock-icon"/> 
                    </div>
                    <TbSquareNumber1 className="phone-icon"/>
                    <BsThreeDotsVertical className="phone-icon"/>
                </div>
                <div className="sign-up-left-section">
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 1</p>
                    </div>
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 2</p>
                    </div>
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 3</p>
                    </div>
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 4</p>
                    </div>
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 5</p>
                    </div>
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 6</p>
                    </div>
                    <div className="broker-section">
                        <img src={brokerLogo} className="broker-logo" />
                        <p className="broker-name">Broker 7</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpLeft