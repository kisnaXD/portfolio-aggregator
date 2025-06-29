
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import '../styling/DashboardStyling.css';
import Home from './Dashboard Components/Home.jsx';
import Accounts from './Dashboard Components/Accounts.jsx';
import Assets from './Dashboard Components/Assets.jsx';
import News from './Dashboard Components/News.jsx';
import MutualFunds from './Dashboard Components/MutualFunds.jsx';
import Reports from './Dashboard Components/Reports.jsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (err) {
                console.error('User fetch error:', err);
                setUser(null);
            }
        };
        fetchUser();
        console.log(user)
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signup');
    };

    const handleSidebarClick = (item) => {
        setActiveItem(item);
    };

  const sidebarItems = ['Home', 'Accounts', 'Assets', 'Reports', 'News', 'Mutual Funds', 'Charts'];

    return (
        <>
            <div className="navbar-div">
                <p className="navbar-logo">
                Portfolio <br /> Aggregator
                </p>
                <div className="dropdown" ref={dropdownRef}>
                    <CgProfile className="profile-icon" onClick={toggleDropdown} />
                    {isOpen && (
                        <ul className="dropdown-menu">
                            <li className="dropdown-item">
                                Profile
                            </li>
                            <li className="dropdown-item" id="logOutItem" onClick={handleLogout}>
                                Log Out
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className="dashboard-content">
                <div className="sidebar-div">
                    {sidebarItems.map((item) => (
                        <a
                        key={item}
                        className={`sidebar-item ${item === activeItem ? 'active' : ''}`}
                        onClick={() => handleSidebarClick(item)}
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <div className="main-content">  
                    {activeItem === 'Home' && <Home user={user} />}
                    {activeItem === 'Accounts' && <Accounts user={user} />}
                    {activeItem === 'Assets' && <Assets user={user} />}
                    {activeItem === 'Reports' && <Reports user={user} />}
                    {activeItem === 'News' && <News user={user} />}
                    {activeItem === 'Mutual Funds' && <MutualFunds user={user} />}
                    {activeItem === 'Charts' && <Charts user={user} />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;