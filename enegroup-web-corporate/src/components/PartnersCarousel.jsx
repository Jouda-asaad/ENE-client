import React from 'react';
import './PartnersCarousel.css';

const brands = [
    { name: "Farris", logo: "/assets/brands/farris.png" },
    { name: "Alco", logo: "/assets/brands/Alco.png" },
    { name: "Sabre", logo: "/assets/brands/SABRE.png" },
    { name: "Honeywell", logo: "/assets/brands/honeywell.png" },
    { name: "PetrolValves Group", logo: "/assets/brands/petrolvaleves-group.png" },
    { name: "Cosasco", logo: "/assets/brands/cosasco.png" },
    { name: "Groth", logo: "/assets/brands/groth_corp.png" },
    { name: "Flare Internusa", logo: "/assets/brands/flare-internusa.png" },
    { name: "Wilmax", logo: "/assets/brands/wilmax.png" },
    { name: "Pietro Fiorentini", logo: "/assets/brands/pietro-fiorentini.png" },
    { name: "Dyna-Flo", logo: "/assets/brands/Dyna-flo.png" },
    { name: "Master-Flo", logo: "/assets/brands/master-flo.png" },
    { name: "Pressure Tech", logo: "/assets/brands/pressure-tech.png" },
    { name: "Fitok", logo: "/assets/brands/FITOK.png" },
    { name: "Badotherm", logo: "/assets/brands/badotherm.png" },
];

const PartnersCarousel = () => {
    return (
        <section className="partners-section">
            <div className="partners-container">
                <p className="partners-label">Trusted Brands</p>

                <div className="carousel-track-container">
                    <div className="carousel-track">
                        {/* Triple the brands for smoother infinite scroll */}
                        {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                            <div key={index} className="partner-logo-item">
                                <img src={brand.logo} alt={brand.name} className="partner-logo-img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersCarousel;
