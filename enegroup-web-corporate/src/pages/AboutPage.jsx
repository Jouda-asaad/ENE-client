import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';
import '../components/AboutPreview.css';
import aboutImage from '/assets/services/onsite-4.jpg';
import ScrollToTop from '../components/ScrollToTop';
import BranchMap from '../components/BranchMap';

const AboutPage = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openLightbox = (index) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % showcaseImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
    };

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

    const showcaseImages = [
        { src: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=600&auto=format&fit=crop', title: 'Industrial Plant' },
        { src: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=600&auto=format&fit=crop', title: 'Engineering Works' },
        { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop', title: 'Site Construction' },
        { src: 'https://images.unsplash.com/photo-1565514020176-db93ee22703a?q=80&w=600&auto=format&fit=crop', title: 'Pipeline Inspection' },
        { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop', title: 'Safety Team' },
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
                                Since 2001, ENE Group has been at the forefront of the oil and gas services industry.
                                We combine technical expertise with operational excellence to deliver critical infrastructure across 12 countries.
                            </p>
                            <div className="about-stats-grid">
                                <div className="a-stat">
                                    <span className="as-val">2.5M</span>
                                    <span className="as-label">Safe Man-Hours</span>
                                </div>
                                <div className="a-stat">
                                    <span className="as-val">ISO</span>
                                    <span className="as-label">9001:2015 Certified</span>
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

            <section className="gallery-section">
                <h2 className="section-title animate-on-scroll fade-up">Project Showcase</h2>
                <div className="showcase-grid animate-on-scroll fade-up">
                    {showcaseImages.map((item, index) => (
                        <div
                            key={index}
                            className="showcase-card"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="card-image-wrapper">
                                <img src={item.src} alt={item.title} loading="lazy" />
                                <div className="card-overlay">
                                    <span className="material-symbols-outlined">zoom_in</span>
                                </div>
                            </div>
                            <div className="card-content">
                                <h5>{item.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImageIndex !== null && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <button className="lightbox-nav prev" onClick={prevImage}>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={showcaseImages[selectedImageIndex].src}
                            alt={`Gallery ${selectedImageIndex + 1}`}
                        />
                        <div className="lightbox-counter">
                            {selectedImageIndex + 1} / {showcaseImages.length}
                        </div>
                    </div>

                    <button className="lightbox-nav next" onClick={nextImage}>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}

        </div>
    );
};

export default AboutPage;
