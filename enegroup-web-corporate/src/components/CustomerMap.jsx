import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomerMap.css';

// Isometric map (grey background removed)
import mapImage from '../assets/misc/customer-map.png';

const B = '/assets/clients'; // logos served from public/

// Categories follow the labelling of the original capability map (fullmap.png),
// positioned over the isometric terrain. Only cleanly-available brand logos are listed.
const customerCategories = [
    {
        id: 'offshore',
        name: 'Offshore Platform',
        position: { top: '46%', left: '14%' },
        customers: [
            { name: 'Petronas', logo: `${B}/offshore-platform/petronas.png` },
            { name: 'Shell', logo: `${B}/offshore-platform/shell.png` },
            { name: 'CPOC', logo: `${B}/offshore-platform/cpoc.png` },
            { name: 'EnQuest', logo: `${B}/offshore-platform/enquest.png` },
            { name: 'Repsol', logo: `${B}/offshore-platform/repsol.png` },
            { name: 'Hess', logo: `${B}/offshore-platform/hess.png` },
        ],
    },
    {
        id: 'epcc',
        name: 'EPCC',
        position: { top: '20%', left: '34%' },
        customers: [
            { name: 'Deleum', logo: `${B}/epcc/deleum.png` },
            { name: 'Dialog', logo: `${B}/epcc/dialog.png` },
            { name: 'Dayang', logo: `${B}/epcc/dayang.png` },
        ],
    },
    {
        id: 'petchem',
        name: 'PetChem',
        position: { top: '30%', left: '60%' },
        customers: [
            { name: 'Eastman', logo: `${B}/petchem/eastman.png` },
        ],
    },
    {
        id: 'servicing',
        name: 'Servicing Contractor',
        position: { top: '22%', left: '82%' },
        customers: [
            { name: 'NOV', logo: `${B}/servicing-contractor/nov.png` },
            { name: 'HHA Associates', logo: `${B}/servicing-contractor/hha-associates.png` },
        ],
    },
    {
        id: 'refinery',
        name: 'Refinery',
        position: { top: '52%', left: '70%' },
        customers: [
            { name: 'Petronas Penapisan Melaka', logo: `${B}/refinery/penapisan-melaka.png` },
        ],
    },
    {
        id: 'fabrication',
        name: 'Fabrication Yard',
        position: { top: '64%', left: '26%' },
        customers: [
            { name: 'Sabah Shipyard', logo: `${B}/fabrication-yard/sabah-shipyard.png` },
            { name: 'MMHE', logo: `${B}/fabrication-yard/mmhe.png` },
            { name: 'Dermaga', logo: `${B}/fabrication-yard/dermaga.png` },
            { name: 'Sapura Energy', logo: `${B}/fabrication-yard/sapura-energy.png` },
            { name: 'OceanMight', logo: `${B}/fabrication-yard/oceanmight.png` },
        ],
    },
    {
        id: 'engineering',
        name: 'Engineering Consultant',
        position: { top: '60%', left: '54%' },
        customers: [
            { name: 'MMC', logo: `${B}/engineering-consultant/mmc.png` },
            { name: 'Technip Energies', logo: `${B}/engineering-consultant/technip-energies.png` },
        ],
    },
    {
        id: 'system',
        name: 'System Integrator',
        position: { top: '60%', left: '88%' },
        customers: [
            { name: 'TriSystems', logo: `${B}/system-integrator/trisystems.png` },
            { name: 'Tyco', logo: `${B}/system-integrator/tyco.png` },
        ],
    },
];

const CustomerMap = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    // Popover opens to the left when the hotspot is on the right half of the map,
    // so it never spills off-screen.
    const sideFor = (leftPct) => (parseFloat(leftPct) > 55 ? 'left' : 'right');

    return (
        <section className="customer-map-section">
            <div className="customer-map-container">
                <div className="customer-map-header">
                    <h2>Our Customers</h2>
                    <div className="accent-bar"></div>
                    <p>Partnering with industry leaders across the oil &amp; gas value chain. Hover a category to see the brands.</p>
                </div>

                <div className="map-wrapper">
                    <div className="map-scroll-area">
                        <img
                            src={mapImage}
                            alt="Oil and Gas Infrastructure Map"
                            className="isometric-map-image"
                        />

                        {/* Interactive category hotspots */}
                        <div className="hotspots-container">
                            {customerCategories.map((category) => {
                                const side = sideFor(category.position.left);
                                return (
                                    <div
                                        key={category.id}
                                        className={`hotspot ${activeCategory === category.id ? 'active' : ''}`}
                                        style={{ top: category.position.top, left: category.position.left }}
                                        onMouseEnter={() => setActiveCategory(category.id)}
                                        onMouseLeave={() => setActiveCategory(null)}
                                    >
                                        <div className="hotspot-marker"></div>
                                        <div className="hotspot-label">{category.name}</div>

                                        {/* Hover popover with brand thumbnails */}
                                        <AnimatePresence>
                                            {activeCategory === category.id && (
                                                <motion.div
                                                    className={`brand-popover popover-${side}`}
                                                    initial={{ opacity: 0, scale: 0.92 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.92 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    <div className="brand-popover-title">{category.name}</div>
                                                    <ul className="brand-list">
                                                        {category.customers.map((c) => (
                                                            <li key={c.name} className="brand-list-item">{c.name}</li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerMap;
