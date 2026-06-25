import React from 'react';
import { motion } from 'framer-motion';
import './AboutPreview.css';

const AboutPreview = () => {
    return (
        <section className="about-preview">
            <div className="about-container">
                <div className="about-content">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="about-text"
                    >
                        <div className="accent-bar"></div>
                        <h2 className="section-title">Industrial Power.<br />Global Reach.</h2>
                        <p className="about-desc">
                            Since 2014, ENE Group has been at the forefront of the oil and gas services industry.
                            We combine technical expertise with operational excellence to deliver critical infrastructure across 12 countries.
                        </p>
                        <div className="about-stats-grid">
                            <div className="a-stat cert-stat">
                                <img
                                    src="/assets/logos/certs_logo.png"
                                    alt="Certification Logos"
                                    className="cert-logo-inline"
                                />
                                <div className="cert-list-labels">
                                    <span className="as-label">ISO 9001 : 2015</span>
                                    <span className="as-label">ISO 45001 : 2015</span>
                                    <span className="as-label">ISO 14001 : 2018</span>
                                    <span className="as-label">PETRONAS License</span>
                                    <span className="as-label">ASME UV · NB UV · NB VR</span>
                                </div>
                            </div>
                            <div className="a-stat">
                                <span className="as-val">2.5M</span>
                                <span className="as-label">Safe Man-Hours</span>
                            </div>
                        </div>
                        <button className="btn-about">
                            More About Us
                        </button>
                    </motion.div>
                </div>

                <div className="about-image-wrapper">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="about-image-container"
                    >
                        {/* Using Team photo */}
                        <img src="/assets/team/WhatsApp-Image-2025-04-25-at-09.39.21.jpeg" alt="ENE Team at Exhibition" className="about-img" />
                        <div className="img-overlay"></div>
                    </motion.div>

                    {/* Floating card decoration */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="floating-card"
                    >
                        <span className="material-symbols-outlined fc-icon">engineering</span>
                        <div>
                            <p className="fc-title">Turnkey Solutions</p>
                            <p className="fc-desc">From concept to commissioning</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPreview;
