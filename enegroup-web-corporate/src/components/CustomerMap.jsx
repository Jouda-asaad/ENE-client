import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomerMap.css';

import partnerSapura from '../assets/partners/sapura.png';
import partnerShell from '../assets/partners/shell.png';
import partnerYokogawa from '../assets/partners/yokogawa.png';
import partnerKenexis from '../assets/partners/kenexis.png';
import supplier1 from '../assets/suppliers/1.png';
import supplier2 from '../assets/suppliers/2.png';
import supplier3 from '../assets/suppliers/3.png';

// Import map image
import mapImage from '../assets/misc/customer-map.png';

const customerCategories = [
    {
        id: 'offshore',
        name: 'Offshore Platforms',
        position: { top: '30%', left: '15%' },
        spreadAngles: { start: -90, end: 30 }, // Spread from Top to Bottom-Right
        customers: [
            { name: 'Petronas', logo: '/assets/partners/Petronas_logo.svg' },
            { name: 'Shell', logo: partnerShell },
            { name: 'Exxon Mobil', logo: '/assets/partners/Exxon_Mobil_Logo.svg' }
        ]
    },
    {
        id: 'refinery',
        name: 'Refineries',
        position: { top: '60%', left: '20%' },
        spreadAngles: { start: -150, end: -30 }, // Wider spread Top-Left to Top-Right
        customers: [
            { name: 'Petron', logo: '/assets/partners/Petron.png' },
            { name: 'Cosasco', logo: '/assets/logos/cosasco.png' },
            { name: 'Farris', logo: '/assets/logos/farris.png' }
        ]
    },
    {
        id: 'epcc',
        name: 'EPCC & Fabricators',
        position: { top: '40%', right: '15%' },
        spreadAngles: { start: -210, end: -90 }, // Wider spread Left to Top
        customers: [
            { name: 'Sapura', logo: partnerSapura },
            { name: 'Supplier A', logo: supplier1 },
            { name: 'Supplier B', logo: supplier2 }
        ]
    },
    {
        id: 'system',
        name: 'System Integrators',
        position: { top: '70%', right: '25%' },
        spreadAngles: { start: -210, end: -30 }, // 180-degree wide spread to fit 5 large logos
        customers: [
            { name: 'Yokogawa', logo: partnerYokogawa },
            { name: 'Siemens', logo: '/assets/partners/Siemens-logo.svg' },
            { name: 'Tyco', logo: '/assets/partners/Tyco-Logo.svg' },
            { name: 'Kenexis', logo: partnerKenexis },
            { name: 'Supplier C', logo: supplier3 }
        ]
    }
];

const CustomerMap = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleCategory = (id) => {
        if (activeCategory === id) {
            setActiveCategory(null);
        } else {
            setActiveCategory(id);
        }
    };

    return (
        <section className="customer-map-section">
            <div className="customer-map-container">
                <div className="customer-map-header">
                    <h2>Our Customers</h2>
                    <div className="accent-bar"></div>
                    <p>Partnering with industry leaders across the oil & gas value chain.</p>
                </div>

                <div className="map-wrapper">
                    <div className="map-scroll-area">
                        {/* The isometric map image */}
                        <img 
                            src={mapImage} 
                            alt="Oil and Gas Infrastructure Map" 
                            className="isometric-map-image" 
                        />

                        {/* Interactive Hotspots & Tree Nodes */}
                        <div className="hotspots-container">
                            {customerCategories.map((category) => (
                                <div 
                                    key={category.id}
                                    className={`hotspot ${activeCategory === category.id ? 'active' : ''}`}
                                    style={{ top: category.position.top, left: category.position.left, right: category.position.right }}
                                >
                                    <div className="hotspot-marker" onClick={() => toggleCategory(category.id)}></div>
                                    <div className="hotspot-label" onClick={() => toggleCategory(category.id)}>{category.name}</div>
                                    
                                    {/* Tree branch logos */}
                                    <AnimatePresence>
                                        {activeCategory === category.id && category.customers.map((customer, idx) => {
                                            const total = category.customers.length;
                                            const radius = 220; // increased radius for larger logos
                                            const startAngle = category.spreadAngles.start * (Math.PI / 180);
                                            const endAngle = category.spreadAngles.end * (Math.PI / 180);
                                            const angle = total === 1 
                                                ? startAngle 
                                                : startAngle + (idx * (endAngle - startAngle) / (total - 1));
                                            
                                            const targetX = Math.cos(angle) * radius;
                                            const targetY = Math.sin(angle) * radius;

                                            return (
                                                <motion.div 
                                                    key={`node-${category.id}-${idx}`}
                                                    className="tree-node"
                                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, x: targetX, y: targetY, scale: 1 }}
                                                    exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                                                    transition={{ 
                                                        type: "spring", 
                                                        stiffness: 260, 
                                                        damping: 20, 
                                                        delay: idx * 0.05 
                                                    }}
                                                >
                                                    {/* Connecting line */}
                                                    <svg className="tree-line" width={Math.abs(targetX) + 20} height={Math.abs(targetY) + 20} 
                                                         style={{
                                                             left: targetX < 0 ? targetX + 45 : 45,
                                                             top: targetY < 0 ? targetY + 45 : 45,
                                                         }}>
                                                        <line 
                                                            x1={targetX < 0 ? Math.abs(targetX) : 0} 
                                                            y1={targetY < 0 ? Math.abs(targetY) : 0} 
                                                            x2={targetX < 0 ? 0 : targetX} 
                                                            y2={targetY < 0 ? 0 : targetY} 
                                                            stroke="var(--color-primary)" 
                                                            strokeWidth="3" 
                                                            strokeDasharray="6 6"
                                                        />
                                                    </svg>
                                                    <div className="tree-node-content">
                                                        <img src={customer.logo} alt={`${customer.name} logo`} />
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default CustomerMap;
