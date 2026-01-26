import React from 'react';
import './HeroSplit.css';
// Re-using the schematic image or a new one can be generated. 
// For "Industrial", maybe a real photo or a solid graphic is better. 
// Using schematic as placeholder for now.
import heroImg from '../assets/hero-schematic.png';

const HeroSplit = () => {
    return (
        <section className="hero-split">
            <div className="hero-content">
                <span className="corp-badge">Est. 2006 • Professional Engineering</span>
                <h1 className="corp-headline">
                    Reliability in <br />
                    <span>Every Pipeline.</span>
                </h1>
                <p className="corp-sub">
                    Delivering critical EPCIC solutions with unmatched safety records and operational stability across the Asia-Pacific region.
                </p>
                <div>
                    <button className="btn-corp">
                        Get a Quote <span>→</span>
                    </button>
                </div>
            </div>

            <div className="hero-visual-side">
                <img src={heroImg} alt="Industrial Facility" className="hero-bg-img" />
                {/* Overlay graphic elements could go here */}
            </div>
        </section>
    );
};

export default HeroSplit;
