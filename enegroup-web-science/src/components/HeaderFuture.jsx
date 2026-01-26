import React from 'react';
import logo from '../assets/logo.png';
import './HeaderFuture.css';

const HeaderFuture = () => {
    return (
        <header className="header-future">
            <div className="container header-future-content">
                <a href="/" className="future-brand">
                    <img src={logo} alt="ENE Group" className="future-logo-img" />
                    <span className="future-brand-text">ENE Group</span>
                </a>

                <nav className="future-nav">
                    <a href="#" className="future-nav-link">Innovation</a>
                    <a href="#" className="future-nav-link">Solutions</a>
                    <a href="#" className="future-nav-link">Sustainability</a>
                    <a href="#" className="future-nav-link">Careers</a>
                </nav>

                <button className="btn-header-future">Contact Us</button>
            </div>
        </header>
    );
};

export default HeaderFuture;
