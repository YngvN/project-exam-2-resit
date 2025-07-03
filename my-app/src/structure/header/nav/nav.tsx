import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, getUserData, deleteUserData } from '../../../utility/api/user';

import './nav.scss';

/**
 * Navigation bar component for the Holidaze application.
 *
 * Features:
 * - Responsive hamburger menu for mobile devices.
 * - Dynamic display of links based on user login state.
 * - Dropdown menu for logged-in users with access to profile and logout.
 * - Automatically updates when localStorage/sessionStorage changes.
 *
 */
const HamburgerIcon: React.FC<{ isOpen: boolean; toggleMenu: () => void }> = ({ isOpen, toggleMenu }) => (
    <div
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        role="button"
        tabIndex={0}
        aria-label="Toggle menu"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleMenu(); }}
    >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
    </div>
);

const Nav: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isManager, setIsManager] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const updateUserInfo = () => {
        if (isUserLoggedIn()) {
            const userData = getUserData();
            setUsername(userData?.name || 'User');
            setIsManager(userData?.venueManager === true);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setUsername('');
            setIsManager(false);
        }
    };

    useEffect(() => {
        updateUserInfo();

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

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className='header-nav'>
            <HamburgerIcon isOpen={menuOpen} toggleMenu={toggleMenu} />
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <Link to="/home" onClick={closeMenu}>Home</Link>
                </li>
                {isLoggedIn && (
                    <li>
                        <Link to="/bookings" onClick={closeMenu}>Bookings</Link>
                    </li>
                )}
                {isLoggedIn && isManager && (
                    <li>
                        <Link to="/venues" onClick={closeMenu}>Venues</Link>
                    </li>
                )}
                <li>
                    {isLoggedIn ? (
                        <div className="nav-user-container">
                            <span className="nav-username" onClick={toggleDropdown}>
                                Hi, {username}
                            </span>
                            {dropdownVisible && (
                                <div className="user-dropdown">
                                    <Link to="/profile" className="dropdown-item" onClick={closeMenu}>
                                        My Profile
                                    </Link>
                                    <button
                                        className="dropdown-item logout-button"
                                        onClick={() => {
                                            handleLogout();
                                            closeMenu();
                                        }}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/" onClick={closeMenu}>Log In</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
