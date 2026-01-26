import React from 'react';
import './Partners.css';

// Import logos dynamically
import kenexis from '../assets/partners/kenexis.png';
import sapura from '../assets/partners/sapura.png';
import shell from '../assets/partners/shell.png';
import yokogawa from '../assets/partners/yokogawa.png';

const partners = [
    { id: 1, name: 'Kenexis', logo: kenexis },
    { id: 2, name: 'Sapura', logo: sapura },
    { id: 3, name: 'Shell', logo: shell },
    { id: 4, name: 'Yokogawa', logo: yokogawa },
    // Duplicate for fuller carousel if list is short
    { id: 5, name: 'Kenexis', logo: kenexis },
    { id: 6, name: 'Sapura', logo: sapura },
    { id: 7, name: 'Shell', logo: shell },
    { id: 8, name: 'Yokogawa', logo: yokogawa },
];

const Partners = () => {
    return (
        <section className="partners-section">
            <div className="container">
                <h4 className="partners-title">Trusted By Industry Leaders</h4>
                <div className="partners-carousel">
                    {/* Double the track for infinite scroll illusion */}
                    <div className="partners-track">
                        {partners.map((p, index) => (
                            <div key={`a-${index}`} className="partner-item">
                                <img src={p.logo} alt={p.name} className="partner-logo" />
                            </div>
                        ))}
                    </div>
                    <div className="partners-track">
                        {partners.map((p, index) => (
                            <div key={`b-${index}`} className="partner-item">
                                <img src={p.logo} alt={p.name} className="partner-logo" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
