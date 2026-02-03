import React from 'react';
import './PartnersCarousel.css';

const partners = [
    { name: "Shell", logo: "/assets/partners/shell.svg" },
    { name: "Sapura", logo: "/assets/partners/sapura.png" },
    { name: "Yokogawa", logo: "/assets/partners/yokogawa.png" },
    { name: "Petronas", logo: "/assets/partners/Petronas_logo.svg" },
    { name: "Exxon Mobil", logo: "/assets/partners/Exxon_Mobil_Logo.svg" },
    { name: "Petron", logo: "/assets/partners/Petron.png" },
    { name: "Siemens", logo: "/assets/partners/Siemens-logo.svg" },
    { name: "Tyco", logo: "/assets/partners/Tyco-Logo.svg" },
];

const PartnersCarousel = () => {
    return (
        <section className="partners-section">
            <div className="partners-container">
                <p className="partners-label">Trusted by Industry Leaders</p>

                <div className="carousel-track-container">
                    <div className="carousel-track">
                        {/* Triple the partners for smoother infinite scroll */}
                        {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                            <div key={index} className="partner-logo-item">
                                <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersCarousel;
