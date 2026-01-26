import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const Services = () => {
    const services = [
        {
            title: "Plant Maint.",
            desc: "Turnaround management, tank cleaning, and comprehensive facility upkeep.",
            icon: "🏭"
        },
        {
            title: "EPCIC",
            desc: "End-to-end Engineering, Procurement, Construction, Installation, and Commissioning.",
            icon: "🏗️"
        },
        {
            title: "Tech Manpower",
            desc: "Skilled professionals and specialists for offshore and onshore operations.",
            icon: "👷"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <section className="services-section">
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: "2.5rem", color: "var(--color-ene-blue)" }}
                    >
                        Core Capabilities
                    </motion.h2>
                </div>

                <motion.div
                    className="services-grid"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {services.map((service, index) => (
                        <motion.div className="service-card" key={index} variants={item}>
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>

                            <div className="service-arrow">
                                Explore Solution <span>→</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
