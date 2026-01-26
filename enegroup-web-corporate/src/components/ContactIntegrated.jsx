import React from 'react';
import './ContactIntegrated.css';

const ContactIntegrated = () => {
    return (
        <footer className="contact-integrated">
            <div className="container">
                <div className="contact-cta-band">
                    <h2>Ready for the Next Phase?</h2>
                    <p style={{ opacity: 0.8, fontSize: '1.25rem' }}>Partner with ENE Group for world-class engineering execution.</p>
                </div>

                <div className="float-cards-container">
                    <div className="float-card">
                        <h4 className="card-title">Headquarters</h4>
                        <p className="card-content">
                            Level 25, Menara ENE,<br />
                            Jalan Tun Razak, 50400<br />
                            Kuala Lumpur, Malaysia
                        </p>
                    </div>

                    <div className="float-card">
                        <h4 className="card-title">Commercial Inquiries</h4>
                        <p className="card-content">
                            For tenders and project proposals:<br />
                            <strong>sales@enegroup.com.my</strong><br />
                            +603-1234-5678
                        </p>
                    </div>

                    <div className="float-card">
                        <h4 className="card-title">Careers</h4>
                        <p className="card-content">
                            Join our team of experts.<br />
                            View open positions or email:<br />
                            <strong>hr@enegroup.com.my</strong>
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 Eng Kah Enterprise. All rights reserved.</span>
                    <nav className="footer-nav">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Sitemap</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default ContactIntegrated;
