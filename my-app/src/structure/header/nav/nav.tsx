import React from 'react';
import { Link } from 'react-router-dom';
import './headerStyle.scss';

const Nav: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/page1">Page 1</Link>
                </li>
                <li>
                    <Link to="/page2">Page 2</Link>
                </li>
                <li>
                    <Link to="/page3">Page 3</Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default Nav;

