import React, { useState, useEffect } from 'react';
import './HeaderCorp.css';

const HeaderCorp = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <a href="/" className="logo">
                    <div className="bg-primary rounded p-1">
                        <img src="/assets/logos/ENE.png" alt="ENE Group" className="logo-icon" style={{ height: '48px', width: 'auto' }} />
                    </div>
                </a>

                <nav className="nav-desktop">
                    <a href="#" className="nav-link">Home</a>
                    <a href="#" className="nav-link">Services</a>
                    <a href="#" className="nav-link">About Us</a>
                    <a href="#" className="nav-link">Projects</a>
                    <a href="#" className="nav-link">Investors</a>
                </nav>

                <div className="header-actions flex items-center gap-4">
                    <button className="cta-button">
                        Get in Touch
                    </button>
                    <button className="mobile-menu-btn">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default HeaderCorp;
