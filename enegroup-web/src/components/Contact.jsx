import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section container">
            <div className="contact-layout">
                <div className="contact-info">
                    <h2 className="contact-headline">
                        Ready to Optimize <br />
                        <span style={{ color: "var(--color-ene-orange)" }}>Your Assets?</span>
                    </h2>

                    <div className="contact-list">
                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <div className="contact-details">
                                <h4>Headquarters</h4>
                                <p>Kuala Lumpur, Malaysia</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📧</div>
                            <div className="contact-details">
                                <h4>Sales Inquiry</h4>
                                <p>sales@enegroup.com.my</p>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <div className="contact-details">
                                <h4>Hotline</h4>
                                <p>+603-1234-5678</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-input" placeholder="Corporate Email" />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" placeholder="Subject / Interest" />
                        </div>

                        <button type="submit" className="btn-submit">
                            Send Message <span>→</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
