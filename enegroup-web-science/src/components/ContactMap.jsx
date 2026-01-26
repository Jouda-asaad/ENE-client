import React from 'react';
import './ContactMap.css';

const ContactMap = () => {
    // Google Maps Embed URL for "The Ampwalk, 218, Jln Ampang"
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.744747055747!2d101.72624447497143!3d3.161823796811463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d3dae12345%3A0xa1b2c3d4e5f6g7h8!2sThe%20Ampwalk!5e0!3m2!1sen!2smy!4v1700000000000!5m2!1sen!2smy";

    return (
        <section className="contact-map-section">
            <iframe
                src={mapSrc}
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ENE Group HQ"
            ></iframe>

            <div className="map-card-wrapper">
                <div className="contact-card-glass">
                    <h2 className="contact-glass-title">Visit HQ</h2>
                    <ul className="contact-info-list">
                        <li>
                            <span className="icon-glass">📍</span>
                            <span>
                                Suite 7-03A, North Block, The Ampwalk,<br />
                                218, Jln Ampang, 50450<br />
                                Kuala Lumpur
                            </span>
                        </li>
                        <li>
                            <span className="icon-glass">📞</span>
                            <span>+603-1234-5678</span>
                        </li>
                        <li>
                            <span className="icon-glass">✉️</span>
                            <span>ops@enegroup.com.my</span>
                        </li>
                    </ul>
                    <button className="btn-glass">Get Directions</button>
                </div>
            </div>
        </section>
    );
};

export default ContactMap;
