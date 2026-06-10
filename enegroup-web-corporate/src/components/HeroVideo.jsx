import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HeroVideo.css';

const HeroVideo = () => {
    // Video playlist - starting with 2.webm as requested
    const videos = [
        "/assets/videos/2.webm",
        "/assets/videos/3.webm",
        "/assets/videos/4.webm",
        "/assets/videos/1.webm",
        "/assets/videos/5.webm",
        "/assets/videos/6.webm"
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);

    // Initial load handling to ensure autoplay works reliably
    React.useEffect(() => {
        const videoElement = document.getElementById('hero-bg-video');
        if (videoElement) {
            videoElement.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }, [currentVideoIndex]);

    // Cycle through videos
    const handleVideoEnded = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    return (
        <section className="hero-video">
            {/* Video is now handled globally by VideoBackground.jsx */}


            <div className="hero-overlay-gradient"></div>
            <div className="hero-overlay-dark"></div>

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-text-container"
                >
                    <div className="accent-bar-hero"></div>
                    <h1 className="hero-title">
                        Powering Malaysia's<br />
                        <span className="text-gradient">Energy Future</span>
                    </h1>
                    <p className="hero-subtitle">
                        Leading the charge in offshore innovation and industrial power solutions. We deliver sustainable infrastructure for the next generation of energy.
                    </p>

                    <div className="hero-ctas">
                        <Link to="/products" className="btn-hero-primary">
                            <span className="material-symbols-outlined">inventory_2</span>
                            PRODUCTS
                        </Link>
                        <Link to="/services" className="btn-hero-outline">
                            <span className="material-symbols-outlined">engineering</span>
                            SERVICES
                        </Link>
                    </div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="scroll-indicator"
            >
                <span className="scroll-text">SCROLL</span>
                <span className="material-symbols-outlined">keyboard_arrow_down</span>
            </motion.div>
        </section>
    );
};

export default HeroVideo;
