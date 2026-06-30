import React from 'react';
import { motion } from 'framer-motion';
import './StatsBar.css';

const stats = [
    { value: "12", label: "Years of Experience" },
    { value: "1K++", label: "Projects Delivered" },
    { value: "RM10M", label: "Equipment Value" },
    { value: "100+", label: "Industry Experts" }
];

const StatsBar = () => {
    return (
        <section className="stats-bar">
            <div className="stats-container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="stat-item"
                        >
                            <p className="stat-value">{stat.value}</p>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
