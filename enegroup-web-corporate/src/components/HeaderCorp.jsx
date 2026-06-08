import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './HeaderCorp.css';

const HeaderCorp = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Helper to check if a link is active
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    // Helper for Product Dropdown visual state
    const isProductsActive = () => {
        return location.pathname === '/products' || location.pathname.startsWith('/products') ? 'active' : '';
    };

    const productCategories = [
        { name: 'Pressure Safety Valve', brand: 'Farris', image: '/assets/suppliers/farris.png' },
        { name: 'Control Valve', brand: 'Dyna-Flo', image: '/assets/suppliers/dyna-flo.png' },
        { name: 'DBB / Instrument Valve', brand: 'Alco, Sabre', image: '/assets/suppliers/alco-sabre.png' },
        { name: 'Rupture Disk', brand: 'Continental Disc', image: '/assets/suppliers/continental-disc.png' },
        { name: 'Fire & Gas Detector', brand: 'Honeywell', image: '/assets/suppliers/honeywell.png' },
        { name: 'Pressure Regulator', brand: 'Pressure Tech', image: '/assets/suppliers/pressure-tech.png' },
        { name: 'Corrosion Monitoring', brand: 'Cosasco, Groth', image: '/assets/suppliers/cosasco.png' },
        { name: 'Gauges', brand: 'Badotherm', image: '/assets/suppliers/badotherm.png' },
        { name: 'MPFM', brand: 'Pietro Fiorentini', image: '/assets/suppliers/pietro-fiorentini.png' },
        { name: 'WHCP / CI Skid', brand: 'Wilmax', image: '/assets/suppliers/wilmax.png' },
        { name: 'Flare System', brand: 'Flare Internusa', image: '/assets/suppliers/flare-internusa.png' },
        { name: 'Valves', brand: 'Fitok', image: '/assets/suppliers/fitok.png' },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsMobileProductsOpen(false); // Reset sub-menu on toggle
    };

    const toggleMobileProducts = (e) => {
        e.preventDefault();
        setIsMobileProductsOpen(!isMobileProductsOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`header-corp ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo-container" onClick={closeMobileMenu}>
                    <img src="/assets/logos/ENE.png" alt="ENE Group" className="header-logo-img" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="main-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${isActive('/')}`}>
                                HOME
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
                                ABOUT US
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className={`nav-link ${isActive('/services')}`}>
                                SERVICES
                            </Link>
                        </li>

                        {/* Products Dropdown */}
                        <li
                            className="nav-item dropdown-container"
                            onMouseEnter={() => setIsProductsDropdownOpen(true)}
                            onMouseLeave={() => setIsProductsDropdownOpen(false)}
                        >
                            <Link to="/products" className={`nav-link ${isProductsActive()}`}>
                                PRODUCTS
                                <span className="material-symbols-outlined icon-sm">expand_more</span>
                            </Link>

                            {/* Dropdown Menu */}
                            <div className={`dropdown-menu ${isProductsDropdownOpen ? 'open' : ''}`}>
                                <div className="dropdown-grid">
                                    {productCategories.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={`/products?brand=${encodeURIComponent(item.brand)}`}
                                            className="dropdown-item text-only"
                                        >
                                            <div className="dropdown-text">
                                                <span className="product-cat">{item.name}</span>
                                                <span className="product-brand">{item.brand}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </li>


                    </ul>
                </nav>

                {/* Contact Button & Theme Toggle (Desktop) */}
                <div className="header-actions">
                    <Link to="/contact" className="btn-contact-orange">
                        Get in Touch
                    </Link>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Navigation"
                >
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </button>

                {/* Mobile Navigation Overlay */}
                <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="mobile-nav-list">
                        <li><Link to="/" className={`mobile-nav-link ${isActive('/')}`} onClick={closeMobileMenu}>HOME</Link></li>
                        <li><Link to="/about" className={`mobile-nav-link ${isActive('/about')}`} onClick={closeMobileMenu}>ABOUT US</Link></li>
                        <li><Link to="/services" className={`mobile-nav-link ${isActive('/services')}`} onClick={closeMobileMenu}>SERVICES</Link></li>


                        {/* Mobile Products Accordion */}
                        <li className="mobile-dropdown-container">
                            <div className="mobile-dropdown-header" onClick={toggleMobileProducts}>
                                <span className={`mobile-nav-link ${isProductsActive()}`}>PRODUCTS</span>
                                <span className={`material-symbols-outlined mobile-chevron ${isMobileProductsOpen ? 'rotate' : ''}`}>expand_more</span>
                            </div>
                            <div className={`mobile-dropdown-content ${isMobileProductsOpen ? 'open' : ''}`}>
                                <div className="mobile-products-grid">
                                    {productCategories.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={`/products?brand=${encodeURIComponent(item.brand)}`}
                                            className="mobile-product-item"
                                            onClick={closeMobileMenu}
                                        >
                                            <span className="mp-name">{item.name}</span>
                                            <span className="mp-brand">{item.brand}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="mobile-actions">
                        <Link to="/contact" className="btn-contact-orange" onClick={closeMobileMenu}>
                            Get in Touch
                        </Link>
                    </div>


                </div>
            </div>
        </header>
    );
};

export default HeaderCorp;
