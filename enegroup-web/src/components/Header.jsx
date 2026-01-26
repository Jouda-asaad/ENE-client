import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="brand-logo">
                    <img src={logo} alt="ENE Group Logo" className="logo-img" />
                    <span className="brand-name">ENE GROUP</span>
                </Link>

                <nav className="nav-desktop">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/about" className={`nav-link ${isActive('/about')}`}>About Us</Link>
                    <Link to="/services" className={`nav-link ${isActive('/services')}`}>Services</Link>
                    <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
                    <Link to="/contact" className="nav-cta">Get Quote</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
