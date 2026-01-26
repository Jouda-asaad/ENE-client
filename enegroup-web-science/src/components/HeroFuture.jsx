import React from 'react';
import './HeroFuture.css';
// Using a placeholder video URL or local asset if available. 
// For now using the webm from assets if it exists, otherwise fallback poster.
import bgVideo from '../assets/hero.webm'; // Check if we have this or need a new one

const HeroFuture = () => {
    return (
        <section className="hero-future">
            {/* Background Video Layer */}
            <video
                className="hero-video-bg"
                autoPlay
                muted
                loop
                playsInline
                poster="https://via.placeholder.com/1920x1080?text=Background"
            >
                <source src={bgVideo} type="video/webm" />
                {/* Fallback source if local file missing */}
            </video>

            <div className="hero-future-content">
                <span className="hero-eyebrow-future">Future Ready</span>
                <h1 className="hero-title-future">ENERGY ENGINEERED</h1>
                <p className="hero-subtitle-future">Next-generation EPCIC solutions for a sustainable world.</p>
                <button className="btn-future">Discover</button>
            </div>
        </section>
    );
};

export default HeroFuture;
