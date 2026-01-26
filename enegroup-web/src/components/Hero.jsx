import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../assets/hero-schematic.png'; // Make sure this path is correct
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section container">
            <motion.span
                className="hero-eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Leading O&G Engineering Solutions
            </motion.span>

            <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                Engineering Sustainability for <br /> Tomorrow's Energy
            </motion.h1>

            <motion.p
                className="hero-subtext"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                Comprehensive EPCIC services delivering precision, safety, and efficiency across the energy value chain.
            </motion.p>

            <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <button className="btn btn-primary">Our Capabilities</button>
                <button className="btn btn-secondary">Contact Experts</button>
            </motion.div>

            <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
                <img src={heroImage} alt="Offshore schematic" className="hero-img-content" />

                <motion.div
                    className="floating-badge badge-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    ✅ Safety: 100%
                </motion.div>

                <motion.div
                    className="floating-badge badge-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    ⚡ Efficiency: Optimized
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
