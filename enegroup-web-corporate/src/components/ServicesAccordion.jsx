import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServicesAccordion.css';

const services = [
    {
        id: "01",
        title: "Offshore Engineering",
        description: "Comprehensive engineering solutions for offshore platforms, including structural analysis, modification, and integrity management.",
        image: "/assets/backgrounds/1.jpg"
    },
    {
        id: "02",
        title: "Hook-up & Commissioning",
        description: "End-to-end HUC services ensuring seamless integration and activation of offshore and onshore facilities.",
        image: "/assets/misc/huc.png"
    },
    {
        id: "03",
        title: "Marine Operations",
        description: "Expert marine logistics, vessel handling, and subsea operations support for complex offshore projects.",
        image: "/assets/misc/marine.png"
    },
    {
        id: "04",
        title: "Maintenance & T/A",
        description: "Reliable maintenance strategies and turnaround execution to maximize asset uptime and operational safety.",
        image: "/assets/misc/maintenance.png"
    }
];

const ServicesAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="services-section">
            <div className="section-header-container">
                <div className="accent-bar"></div>
                <h2 className="section-title">Core Competencies</h2>
                <p className="section-subtitle">Delivering excellence across the energy value chain.</p>
            </div>

            <div className="accordion-container">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(10, 22, 40, 0.3), rgba(10, 22, 40, 0.95)), url(${service.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="accordion-content">
                            <div className="service-header-row">
                                <span className="service-id">{service.id}</span>
                                <h3 className="service-title">{service.title}</h3>
                            </div>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="service-details"
                                    >
                                        <p className="service-desc">{service.description}</p>
                                        <button className="service-link">
                                            Learn More <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Background for active state - using a gradient overlay on top of abstract bg */}
                        {activeIndex === index && (
                            <motion.div
                                layoutId="activeServiceBg"
                                className="accordion-bg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesAccordion;
