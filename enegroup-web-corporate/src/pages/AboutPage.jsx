import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';
import '../components/AboutPreview.css';
import aboutImage from '/assets/services/onsite-4.jpg';
import ScrollToTop from '../components/ScrollToTop';
import BranchMap from '../components/BranchMap';

const AboutPage = () => {
    useEffect(() => {
        // Check for IntersectionObserver support
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el) => observer.observe(el));

            return () => {
                animatedElements.forEach((el) => observer.unobserve(el));
            };
        }
    }, []);

    const capabilities = [
        { title: 'Design', icon: 'architecture', desc: 'Comprehensive engineering design solutions tailored to project needs.' },
        { title: 'Procurement', icon: 'inventory_2', desc: 'Strategic sourcing of high-quality materials and equipment.' },
        { title: 'Construction', icon: 'construction', desc: 'Expert on-site construction and installation services.' },
        { title: 'Commissioning', icon: 'settings_power', desc: 'Thorough testing and startup procedures to ensure operational readiness.' },
        { title: 'Maintenance & Repair', icon: 'build', desc: 'Ongoing support and repair services to maximize asset lifecycle.' },
    ];

    return (
        <div className="about-page">
            <ScrollToTop />

            {/* Hero Section */}
            <section className="about-hero animate-on-scroll fade-up">
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <div className="slanted-accent"></div>
                    <h1>Engineering Excellence</h1>
                    <p className="subtitle">From modest beginnings in 2014 to a regional one-stop solution hub.</p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="our-story-section">
                <div className="story-container">
                    <div className="story-image-wrapper animate-on-scroll slide-right">
                        <img src={aboutImage} alt="ENE Group Hq" className="story-image" />
                        <div className="image-accent-border"></div>
                    </div>
                    <div className="story-content animate-on-scroll slide-left">
                        <h2>A Legacy of Growth</h2>
                        <p>
                            Established in 2014, ENE Petro Group has evolved from a modest beginning into a
                            total product solution & services provider in the O&G and petrochemical industry.
                        </p>
                        <p>
                            Situated in the heart of Kuala Lumpur, ENE Petro Group brings together latest
                            technology and engineering from global manufacturers to provide innovative solutions
                            and services to our customers with a local touch and professionalism.
                        </p>
                        <p>
                            We pride ourselves with our diversified approach supplying specialty engineered
                            products with equal emphasis on repair service capabilities. Our service teams are
                            factory trained and authorized for all of our product line enabling us to offer
                            engineering, maintenance, repair, troubleshooting and onsite service capabilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Preview from Home Page */}
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

            {/* Vision Quote Card */}
            <section className="vision-section animate-on-scroll fade-up">
                <div className="vision-card glass-panel">
                    <span className="quote-icon material-symbols-outlined">format_quote</span>
                    <h3>Our Vision</h3>
                    <p className="vision-text">
                        "To be recognized as the sought after regional one stop solution hub for
                        O&G and Petrochemical industry in South East Asia."
                    </p>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="capabilities-section">
                <h2 className="section-title animate-on-scroll fade-up">Core Capabilities</h2>
                <p className="section-subtitle animate-on-scroll fade-up delay-100">End-to-end excellence across the energy value chain</p>

                <div className="capabilities-grid">
                    {capabilities.map((item, index) => (
                        <div
                            key={index}
                            className="capability-card glass-panel animate-on-scroll fade-up"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="icon-wrapper">
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>


            {/* Interactive Branch Map */}
            <BranchMap />

        </div>
    );
};

export default AboutPage;
