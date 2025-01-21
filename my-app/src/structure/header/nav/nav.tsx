import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, getUserData, deleteUserData } from '../../../utility/api/user';

import './nav.scss';

const Nav: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const updateUserInfo = () => {
        if (isUserLoggedIn()) {
            const userData = getUserData();
            setUsername(userData?.name || 'User');
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setUsername('');
        }
    };

    useEffect(() => {
        // Initial check
        updateUserInfo();

        // Listen for changes in localStorage or sessionStorage
        const handleStorageChange = () => updateUserInfo();

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        deleteUserData();
        setIsLoggedIn(false);
        navigate('/home');
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/page1">Page 1</Link>
                </li>
                <li>
                    <Link to="/page2">Page 2</Link>
                </li>
                <li>
                    {isLoggedIn ? (
                        <div className="nav-user-container">
                            <span
                                className="nav-username"
                                onClick={toggleDropdown}
                            >
                                Hi, {username}
                            </span>
                            {dropdownVisible && (
                                <div className="user-dropdown">
                                    <Link to="/profile" className="dropdown-item">
                                        My Profile
                                    </Link>
                                    <button
                                        className="dropdown-item logout-button"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/">Log In</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
