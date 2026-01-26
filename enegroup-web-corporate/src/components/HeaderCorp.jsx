import React from 'react';
import logo from '../assets/logo.png';
import './HeaderCorp.css';

const HeaderCorp = () => {
    return (
        <header className="header-corp">
            <div className="container header-corp-content">
                <a href="/" className="corp-brand">
                    <img src={logo} alt="ENE Group" className="corp-logo-img" />
                    <span className="corp-brand-text">ENE Group</span>
                </a>

                <nav className="corp-nav">
                    <a href="#" className="corp-nav-link">Home</a>
                    <a href="#" className="corp-nav-link">About Us</a>
                    <a href="#" className="corp-nav-link">Services</a>
                    <a href="#" className="corp-nav-link">Projects</a>
                    <a href="#" className="corp-nav-link">Contact</a>
                </nav>

                <a href="#" className="btn-nav-corp">
                    Client Portal
                </a>
            </div>
        </header>
    );
};

export default HeaderCorp;
