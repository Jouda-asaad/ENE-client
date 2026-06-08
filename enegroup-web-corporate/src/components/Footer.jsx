import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-col brand-col">
                        <Link to="/" className="footer-logo">
                            <div className="bg-primary rounded p-1">
                                <img src="/assets/logos/ENE.png" alt="ENE Group" className="footer-logo-icon" />
                            </div>
                            <span className="footer-logo-text">ENE Group</span>
                        </Link>
                        <p className="footer-desc">
                            Your trusted partner in offshore engineering and industrial power solutions. Delivering excellence since 2001.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link"><span className="material-symbols-outlined">public</span></a>
                            <a href="#" className="social-link"><span className="material-symbols-outlined">alternate_email</span></a>
                            <a href="#" className="social-link"><span className="material-symbols-outlined">share</span></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Quick Links</h4>
                        <div className="footer-links">
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/services" className="footer-link">Services</Link>
                            <Link to="/" className="footer-link">About Us</Link>
                            <Link to="/" className="footer-link">Projects Gallery</Link>
                            <Link to="/" className="footer-link">Investor Relations</Link>
                            <Link to="/" className="footer-link">Careers</Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Our Services</h4>
                        <div className="footer-links">
                            <Link to="/services#service-01" className="footer-link">Engineering Consultation</Link>
                            <Link to="/services#service-02" className="footer-link">3D Fire & Gas Mapping</Link>
                            <Link to="/services#service-03" className="footer-link">Valve Servicing & Testing</Link>
                            <Link to="/services#service-04" className="footer-link">On-Site Servicing & Testing</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="material-symbols-outlined icon">location_on</span>
                                <p>Level 23, Menara ENE, Jalan Sultan Ismail, 50250 Kuala Lumpur, Malaysia</p>
                            </div>
                            <div className="contact-item">
                                <span className="material-symbols-outlined icon">call</span>
                                <p>+60 3 2166 8888</p>
                            </div>
                            <div className="contact-item">
                                <span className="material-symbols-outlined icon">mail</span>
                                <p>info@enegroup.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 ENE Group. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
