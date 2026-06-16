import React, { useEffect } from 'react';
import './FlotrimPage.css';
import ScrollToTop from '../components/ScrollToTop';

const FlotrimPage = () => {
    useEffect(() => {
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

    const products = [
        {
            name: 'Choke Valve',
            description: 'High-performance choke valves engineered for precise flow control in oil and gas production. Designed to handle severe service conditions including high pressure drops, erosive media, and extreme temperatures.',
            features: ['Precise flow control', 'Severe service rated', 'High pressure capability', 'Erosion-resistant trim'],
        },
        {
            name: 'Actuation Choke Valve',
            description: 'Automated choke valves with advanced actuation systems for remote operation and process optimization. Provides reliable, repeatable flow control with minimal operator intervention.',
            features: ['Remote operation', 'Automated control', 'Process optimization', 'Fail-safe capability'],
        },
    ];

    return (
        <div className="flotrim-page">
            <ScrollToTop />

            {/* Hero Section */}
            <section className="flotrim-hero animate-on-scroll fade-up">
                <div className="flotrim-hero-overlay"></div>
                <div className="flotrim-hero-content">
                    <div className="flotrim-badge">ENE GROUP COMPANY</div>
                    <h1 className="flotrim-title">Flotrim</h1>
                    <p className="flotrim-subtitle">
                        Exclusive representative for Masterflo choke valves — delivering precision flow control solutions for the oil & gas industry.
                    </p>
                    <div className="flotrim-partner-badge">
                        <img src="/assets/brands/master-flo.png" alt="Master-Flo" className="partner-logo" />
                        <span>Authorized Masterflo Partner</span>
                    </div>
                </div>
            </section>

            {/* About Flotrim */}
            <section className="flotrim-about-section">
                <div className="flotrim-about-container animate-on-scroll fade-up">
                    <div className="flotrim-about-content">
                        <div className="accent-bar-sm"></div>
                        <h2>About Flotrim</h2>
                        <p>
                            Flotrim is a newly acquired member of the ENE Group of Companies, specializing exclusively in Masterflo choke valve solutions. As an authorized Masterflo partner, Flotrim provides the complete range of choke valve products and services to the oil and gas sector across Southeast Asia.
                        </p>
                        <p>
                            With ENE Group's established regional presence and deep industry expertise, Flotrim is uniquely positioned to deliver Masterflo's world-class flow control technology backed by local support, engineering consultation, and rapid turnaround service.
                        </p>
                    </div>
                    <div className="flotrim-stats">
                        <div className="stat-item glass-panel">
                            <span className="material-symbols-outlined">precision_manufacturing</span>
                            <h4>Precision Engineering</h4>
                            <p>World-class choke valve technology</p>
                        </div>
                        <div className="stat-item glass-panel">
                            <span className="material-symbols-outlined">support_agent</span>
                            <h4>Local Support</h4>
                            <p>Backed by ENE Group's regional network</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="flotrim-products-section">
                <h2 className="section-title animate-on-scroll fade-up">Masterflo Products</h2>
                <p className="section-subtitle animate-on-scroll fade-up delay-100">
                    Premium choke valve solutions for critical flow control applications
                </p>

                <div className="flotrim-products-grid">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="flotrim-product-card glass-panel animate-on-scroll fade-up"
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="product-card-header">
                                <span className="material-symbols-outlined product-icon">valve</span>
                                <h3>{product.name}</h3>
                            </div>
                            <p className="product-desc">{product.description}</p>
                            <ul className="product-features">
                                {product.features.map((feature, i) => (
                                    <li key={i}>
                                        <span className="material-symbols-outlined feature-check">check_circle</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="flotrim-cta-section animate-on-scroll fade-up">
                <div className="flotrim-cta-card glass-panel">
                    <h3>Interested in Masterflo Choke Valves?</h3>
                    <p>Contact our team for product specifications, pricing, and technical consultation.</p>
                    <a href="/contact" className="btn-contact-orange">
                        Get in Touch <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                </div>
            </section>

            <footer className="flotrim-footer">
                <p>© 2026 Flotrim. <a href="/">Part of ENE Group</a>.</p>
            </footer>
        </div>
    );
};

export default FlotrimPage;
