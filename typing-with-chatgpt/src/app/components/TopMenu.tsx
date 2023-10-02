import React from 'react';
import '../top-menu.css';

const TopMenu: React.FC = () => {
    return (
        <div className="top-menu">
            <ul className="menu-items">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>
        </div>
    );
};

export default TopMenu;