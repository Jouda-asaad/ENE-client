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
                            <span className="footer-logo-text"> Group.</span>
                        </Link>
                        <p className="footer-desc">
                            Your trusted partner in offshore engineering and industrial power solutions. Delivering excellence since 2014.
                        </p>
                        <div className="footer-certs" style={{ margin: '1.5rem 0' }}>
                            <img src="/assets/logos/certs_logo.png" alt="Certifications" className="footer-certs-logo" style={{ height: '80px', objectFit: 'contain' }} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <div className="footer-quick-links-header">
                            <h4 className="footer-heading">Quick Links</h4>
                            <div className="footer-socials">
                                <a href="https://www.linkedin.com/company/enepetro/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="footer-links">
                            <Link to="/" className="footer-link">Home</Link>
                            <Link to="/services" className="footer-link">Services</Link>
                            <Link to="/about" className="footer-link">About Us</Link>
                            <Link to="/wheels" className="footer-link">ENE Wheels</Link>
                            <Link to="/" className="footer-link">Projects Gallery</Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Our Services</h4>
                        <div className="footer-links">
                            <Link to="/services#service-01" className="footer-link">Valve Servicing & Testing</Link>
                            <Link to="/services#service-02" className="footer-link">On-Site Servicing & Testing</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-heading">Contact Us</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="material-symbols-outlined icon">location_on</span>
                                <p>
                                    Suite 7-03A, North Block, The Ampwalk,<br />
                                    218, Jalan Ampang, Kampung Datuk Keramat,<br />
                                    50450 Kuala Lumpur, Federal Territory of Kuala Lumpur
                                </p>
                            </div>
                            <div className="contact-item">
                                <span className="material-symbols-outlined icon">call</span>
                                <p>+6013 - 997 7755</p>
                            </div>
                            <div className="contact-item">
                                <span className="material-symbols-outlined icon">mail</span>
                                <p>sales@enegroup.com.my</p>
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
