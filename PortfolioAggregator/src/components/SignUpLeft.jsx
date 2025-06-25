import React from 'react';
import '../styling/SignUpLeft.css';
import brokerLogo from '../assets/broker_logo_dummy.png';
import { IoIosHome } from 'react-icons/io';
import { CiLock } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { TbSquareNumber1 } from 'react-icons/tb';

const SignUpLeft = () => {
    const brokers = [
        { id: 1, name: 'Zerodha' },
        { id: 2, name: 'Upstox' },
        { id: 3, name: 'Angel One' },
        { id: 4, name: 'Groww' },
        { id: 5, name: 'ICICI Direct' },
        { id: 6, name: 'HDFC Securities' },
        { id: 7, name: 'Kotak Securities' },
        { id: 8, name: 'Sharekhan' },
        { id: 9, name: 'Motilal Oswal' },
        { id: 10, name: '5paisa' },
    ];

    return (
        <div className="sign-up-left-container">
            <h1 className="sign-up-left-heading">
                Portfolio <br /> Aggregator
            </h1>
            <p className="sign-up-left-byline">Brokers we Support</p>
            <div className="sign-up-left-phone">
                <div className="sign-up-left-header">
                    <IoIosHome className="phone-icon" />
                    <div className="search-bar">
                        <CiLock className="phone-icon" id="lock-icon" />
                    </div>
                    <TbSquareNumber1 className="phone-icon" />
                    <BsThreeDotsVertical className="phone-icon" />
                </div>
                <div className="sign-up-left-section">
                    {brokers.map(broker => (
                        <div key={broker.id} className="broker-section">
                            <img src={brokerLogo} alt={broker.name} className="broker-logo" />
                            <p className="broker-name">{broker.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SignUpLeft;