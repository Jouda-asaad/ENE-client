import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import './FlotrimPage.css';

const FlotrimPage = () => {
    const [zoomedImg, setZoomedImg] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="flotrim-page">
            <ScrollToTop />
            
            {/* ---- Hero Section ---- */}
            <section className="flotrim-hero">
                <div className="flotrim-hero-overlay"></div>
                <motion.div 
                    className="flotrim-hero-content"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div variants={fadeUp} className="flotrim-badge">
                        ENE Group Company
                    </motion.div>
                    <motion.div variants={fadeUp}>
                        <img 
                            src="/assets/flotrim/flotrim-logo-clearbg.png" 
                            alt="Flotrim Logo" 
                            className="flotrim-hero-logo zoomable-image"
                            onClick={() => setZoomedImg('/assets/flotrim/flotrim-logo-clearbg.png')}
                        />
                    </motion.div>
                    <motion.p variants={fadeUp} className="flotrim-subtitle">
                        Exclusive representative for Master Flo choke valves — delivering precision flow control solutions for the oil & gas industry.
                    </motion.p>
                    
                    <motion.div variants={fadeUp} className="flotrim-partner-badge">
                        <span>IN PARTNERSHIP WITH</span>
                        <img 
                            src="/assets/brands/master-flo.png" 
                            alt="Master Flo" 
                            className="partner-logo zoomable-image" 
                            onClick={() => setZoomedImg('/assets/brands/master-flo.png')}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ---- About Section ---- */}
            <section className="flotrim-about-section">
                <motion.div 
                    className="flotrim-about-container"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={fadeUp} className="flotrim-about-content">
                        <div className="accent-bar-sm"></div>
                        <h2>About Flotrim</h2>
                        <p>
                            Flotrim Sdn Bhd was established in 2007 as a result of the increasing demand in Oil and Gas Services in Malaysia. Backed by experienced individuals with more than 15 years serving the industry, we have built a solid foundation of technical expertise and reliable service execution.
                        </p>
                        <p>
                            We specialize in the aftermarket focus, providing a full range of trading, maintenance, and technical support. Our commitment to quality flow control solutions makes us a trusted partner for critical operations.
                        </p>
                        
                        <div className="flotrim-stats">
                            <div className="stat-item">
                                <span className="material-symbols-outlined">settings_suggest</span>
                                <h4>Established 2007</h4>
                                <p>Over 15 years of O&G industry experience</p>
                            </div>
                            <div className="stat-item">
                                <span className="material-symbols-outlined">factory</span>
                                <h4>Aftermarket Focus</h4>
                                <p>Full range of trading, maintenance & technical support</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flotrim-offices-grid">
                        <div className="office-card">
                            <div className="office-img-wrapper">
                                <img src="/assets/flotrim/office-pj.png" alt="Petaling Jaya Office" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/office-pj.png')} />
                            </div>
                            <div className="office-content">
                                <h4>HQ — Petaling Jaya</h4>
                                <p>17 Jln Teknologi 3/3A, Surian Industrial Park, 47810 Petaling Jaya, Selangor</p>
                            </div>
                        </div>
                        <div className="office-card">
                            <div className="office-img-wrapper">
                                <img src="/assets/flotrim/office-tokbali.png" alt="Tok Bali Office" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/office-tokbali.png')} />
                            </div>
                            <div className="office-content">
                                <h4>Tok Bali, Kelantan</h4>
                                <p>Tok Bali Supply Base, Jalan Tok Bali, 16700 Pasir Puteh, Kelantan</p>
                            </div>
                        </div>
                        <div className="office-card">
                            <div className="office-img-wrapper">
                                <img src="/assets/flotrim/office-sarawak.png" alt="Bintulu Office" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/office-sarawak.png')} />
                            </div>
                            <div className="office-content">
                                <h4>Bintulu, Sarawak</h4>
                                <p>Lot 28 (2689), Lot 2544 Kidurong Gateway, Tanjung Kidurong, 97000 Bintulu, Sarawak</p>
                            </div>
                        </div>
                        <div className="office-card">
                            <div className="office-img-wrapper">
                                <img src="/assets/flotrim/office-sabah.png" alt="Kota Kinabalu Office" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/office-sabah.png')} />
                            </div>
                            <div className="office-content">
                                <h4>Kota Kinabalu, Sabah</h4>
                                <p>Aeropod, Kota Kinabalu, Sabah</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ---- Products Section ---- */}
            <section className="flotrim-products-section">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                >
                    <h2 className="section-title">Product Solutions</h2>
                    <p className="section-subtitle">Precision flow control valves and actuation systems.</p>
                </motion.div>

                <div className="flotrim-products-container">
                    {/* Product 1 */}
                    <motion.div 
                        className="product-showcase-card"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                    >
                        <div className="product-image-container">
                            <img src="/assets/flotrim/production-chokes.png" alt="Production Chokes" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/production-chokes.png')} />
                        </div>
                        <div className="product-showcase-content">
                            <h3>Production Choke Valves</h3>
                            <p className="product-desc">
                                Master Flo Valve is a technological leader and world class manufacturer of chokes, delivering rugged reliability and precise control for the most demanding surface applications.
                            </p>
                            <div className="product-tags">
                                <span className="product-tag">Oil Production</span>
                                <span className="product-tag">Gas Production</span>
                                <span className="product-tag">Water Injection</span>
                                <span className="product-tag">Gas Lift</span>
                                <span className="product-tag">Gas Injection Blow Down</span>
                                <span className="product-tag">Vent Valves</span>
                                <span className="product-tag">Steam Service</span>
                                <span className="product-tag">HP/HT</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product 2 */}
                    <motion.div 
                        className="product-showcase-card reverse"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                    >
                        <div className="product-showcase-content">
                            <h3>Subsea Choke Valves</h3>
                            <p className="product-desc">
                                Engineered for deepwater and ultra-deepwater environments, providing maximum flow assurance and field life extension.
                            </p>
                            <div className="product-tags">
                                <div className="product-tag-group">
                                    <span className="product-tag with-subtags">Manually Operated</span>
                                    <div className="product-subtags">
                                        <span className="product-subtag">Non-retrievable bolted bonnet</span>
                                        <span className="product-subtag">Diver insert retrievable</span>
                                    </div>
                                </div>
                                <div className="product-tag-group">
                                    <span className="product-tag with-subtags">Actuated</span>
                                    <div className="product-subtags">
                                        <span className="product-subtag">Non-retrievable</span>
                                        <span className="product-subtag">HRV insert retrievable</span>
                                    </div>
                                </div>
                                <span className="product-tag">Water Injection</span>
                            </div>
                        </div>
                        <div className="product-image-container">
                            <img src="/assets/flotrim/subsea-chokes.png" alt="Subsea Chokes" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/subsea-chokes.png')} />
                        </div>
                    </motion.div>

                    {/* Product 3 */}
                    <motion.div 
                        className="product-showcase-card"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                    >
                        <div className="product-image-container">
                            <img src="/assets/flotrim/actuators.png" alt="Actuation Systems" className="zoomable-image" onClick={() => setZoomedImg('/assets/flotrim/actuators.png')} />
                        </div>
                        <div className="product-showcase-content">
                            <h3>Actuation Systems</h3>
                            <p className="product-desc">
                                Master Flo manufactures a diverse range of actuators specifically designed to complement the choke and control-valve product lines, ensuring seamless integration and reliable operation.
                            </p>
                            <div className="product-tags">
                                <div className="product-tag-group">
                                    <span className="product-tag with-subtags">Stepping Actuators</span>
                                    <div className="product-subtags">
                                        <span className="product-subtag">Hydraulic</span>
                                        <span className="product-subtag">Pneumatic</span>
                                    </div>
                                </div>
                                <div className="product-tag-group">
                                    <span className="product-tag with-subtags">Hydraulic Piston Actuators</span>
                                    <div className="product-subtags">
                                        <span className="product-subtag">Fail in last position</span>
                                        <span className="product-subtag">Fail closed</span>
                                        <span className="product-subtag">Fail open</span>
                                    </div>
                                </div>
                                <div className="product-tag-group">
                                    <span className="product-tag with-subtags">Pneumatic Piston Actuators</span>
                                    <div className="product-subtags">
                                        <span className="product-subtag">Double Acting</span>
                                        <span className="product-subtag">Low Voltage</span>
                                    </div>
                                </div>
                                <div className="product-tag-group">
                                    <span className="product-tag with-subtags">Electric Actuators</span>
                                    <div className="product-subtags">
                                        <span className="product-subtag">110 / 220 Voltage variations</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ---- Services Section ---- */}
            <section className="flotrim-services-section">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                >
                    <h2 className="section-title" style={{ textAlign: 'center' }}>Total Solutions</h2>
                    <p className="section-subtitle" style={{ textAlign: 'center' }}>End-to-end support for your flow control assets.</p>
                </motion.div>

                <motion.div 
                    className="service-category"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <motion.h3 variants={fadeUp}><span className="material-symbols-outlined">support_agent</span> Field Services</motion.h3>
                    <motion.p variants={fadeUp} className="service-category-desc">Our field service technicians are on call to deploy to your site for critical operations.</motion.p>
                    
                    <div className="field-services-grid">
                        <motion.div variants={fadeUp} className="service-card">
                            <div className="icon-wrapper"><span className="material-symbols-outlined">engineering</span></div>
                            <h4>Installation & Commissioning</h4>
                            <p>Expert supervision and hands-on installation to ensure your valves are set up perfectly from day one.</p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="service-card">
                            <div className="icon-wrapper"><span className="material-symbols-outlined">build</span></div>
                            <h4>Field Repair</h4>
                            <p>On-site troubleshooting, repair, and replacement of parts to minimize your operational downtime.</p>
                        </motion.div>
                        <motion.div variants={fadeUp} className="service-card">
                            <div className="icon-wrapper"><span className="material-symbols-outlined">support</span></div>
                            <h4>Technical Support</h4>
                            <p>Direct access to seasoned engineers for operational guidance, optimization, and remote diagnostics.</p>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div 
                    className="service-category"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    <motion.h3 variants={fadeUp}><span className="material-symbols-outlined">settings</span> Maintenance & Retrofitting</motion.h3>
                    <motion.p variants={fadeUp} className="service-category-desc">We offer the optimal maintenance and monitoring solutions to extend the lifecycle of your existing choke valves.</motion.p>
                    
                    <div className="maintenance-grid">
                        <motion.div variants={fadeUp} className="diagnostic-box">
                            <h4>Site Survey & Diagnostics</h4>
                            <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '0.9rem', marginBottom: '1rem' }}>We identify critical valve degradation indicators:</p>
                            <ul className="diagnostic-list">
                                <li><span className="material-symbols-outlined">trending_up</span> Flow rate abnormal increase</li>
                                <li><span className="material-symbols-outlined">trending_down</span> Choke position reading decrease</li>
                                <li><span className="material-symbols-outlined">speed</span> Unexpected pressure changes</li>
                            </ul>
                        </motion.div>
                        
                        <motion.div variants={fadeUp} className="retro-box">
                            <h4>Choke Valve Refurbishment & Upgrades</h4>
                            <p>
                                Upgrade your manual choke valves to fully actuated systems. Our retrofitting process brings modern control capabilities to legacy equipment, providing a cost-effective alternative to complete replacement.
                            </p>
                            <ul className="benefit-list">
                                <li><span className="material-symbols-outlined">check_circle</span> Create spare valves from manual units</li>
                                <li><span className="material-symbols-outlined">check_circle</span> Enable easy data acquisition</li>
                                <li><span className="material-symbols-outlined">check_circle</span> Enhance remote monitoring</li>
                                <li><span className="material-symbols-outlined">check_circle</span> Simplify operation & control</li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ---- CTA Section ---- */}
            <section className="flotrim-cta-section">
                <motion.div 
                    className="flotrim-cta-card"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeUp}
                >
                    <h3>Looking for Flow Control Solutions?</h3>
                    <p>Contact our technical team to discuss how we can support your operations.</p>
                    <Link to="/contact" className="btn-contact-orange">
                        Get in Touch <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </motion.div>
            </section>

            <footer className="flotrim-footer">
                <p>© 2026 Flotrim. <Link to="/">Part of ENE Group</Link>.</p>
            </footer>

            {/* ---- Image Zoom Modal ---- */}
            <AnimatePresence>
                {zoomedImg && (
                    <motion.div 
                        className="image-zoom-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setZoomedImg(null)}
                    >
                        <motion.img 
                            src={zoomedImg} 
                            alt="Zoomed" 
                            className="zoomed-image"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                        />
                        <button className="zoom-close-btn" onClick={() => setZoomedImg(null)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FlotrimPage;
