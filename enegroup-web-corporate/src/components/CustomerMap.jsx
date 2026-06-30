import React, { useState } from 'react';
import './CustomerMap.css';

// Isometric map (grey background removed)
import mapImage from '../assets/misc/customer-map.png';

const B = '/assets/clients'; // logos served from public/

// Categories follow the labelling of the original capability map (fullmap.png),
// positioned over the isometric terrain.
const customerCategories = [
    {
        id: 'offshore',
        name: 'Offshore Platform',
        position: { top: '46%', left: '14%' },
        customers: [
            { name: 'Petronas', logo: `${B}/offshore-platform/petronas.svg` },
            { name: 'Shell', logo: `${B}/offshore-platform/shell.svg` },
            { name: 'CPOC', logo: `${B}/offshore-platform/cpoc.png` },
            { name: 'EnQuest', logo: `${B}/offshore-platform/enquest.png` },
            { name: 'Repsol', logo: `${B}/offshore-platform/repsol.svg` },
            { name: 'Hess', logo: `${B}/offshore-platform/hess.svg` },
            { name: 'ExxonMobil', logo: `${B}/offshore-platform/exxon-mobil.svg` },
            { name: 'Garigali Hess', logo: `${B}/offshore-platform/garigali-hess.png` },
            { name: 'Hibiscus Petroleum', logo: `${B}/offshore-platform/hibiscus.svg` },
            { name: 'Vestigo', logo: `${B}/offshore-platform/vestigo.png` },
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
            { name: 'Carimin', logo: `${B}/epcc/carimin.png` },
            { name: 'HHA Associates', logo: `${B}/epcc/hha-associates.png` },
            { name: 'Petra Energy', logo: `${B}/epcc/petra.png` },
            { name: 'Siemens', logo: `${B}/epcc/siemens.png` },
        ],
    },
    {
        id: 'petchem',
        name: 'PetChem',
        position: { top: '12%', left: '82%' },
        customers: [
            { name: 'Eastman', logo: `${B}/petchem/eastman.png` },
            { name: 'CPC Taiwan', logo: `${B}/petchem/cpc-taiwan.png` },
            { name: 'FPG', logo: `${B}/petchem/fpg.png` },
            { name: 'RCR', logo: `${B}/petchem/rcr.png` },
            { name: 'Siemens', logo: `${B}/petchem/siemens.png` },
        ],
    },
    {
        id: 'servicing',
        name: 'Servicing Contractor',
        position: { top: '42%', left: '82%' },
        customers: [
            { name: 'NOV', logo: `${B}/servicing-contractor/nov.png` },
            { name: 'HHA Associates', logo: `${B}/servicing-contractor/hha-associates.png` },
            { name: 'EPOMS', logo: `${B}/servicing-contractor/epoms.png` },
            { name: 'VME', logo: `${B}/servicing-contractor/vme.png` },
            { name: 'Malaysian Refining Company', logo: `${B}/servicing-contractor/malaysian-refining-company.png` },
        ],
    },
    {
        id: 'refinery',
        name: 'Refinery',
        position: { top: '68%', left: '80%' },
        customers: [
            { name: 'Petronas Penapisan Melaka', logo: `${B}/refinery/penapisan-melaka.png` },
            { name: 'Petronas Penapisan Terengganu', logo: `${B}/refinery/penapisan-terengganu.png` },
            { name: 'Petron', logo: `${B}/refinery/petron.png` },
        ],
    },
    {
        id: 'fabrication',
        name: 'Fabrication Yard',
        position: {
            top: '70%', left: '62%'
        },
        customers: [
            { name: 'MMHE', logo: `${B}/fabrication-yard/mmhe.png` },
            { name: 'Dermaga', logo: `${B}/fabrication-yard/dermaga.png` },
            { name: 'Sapura Energy', logo: `${B}/fabrication-yard/sapura-energy.png` },
            { name: 'OceanMight', logo: `${B}/fabrication-yard/oceanmight.png` },
            { name: 'Brooke Dockyard', logo: `${B}/fabrication-yard/brooke-dockyard.png` },
            { name: 'Muhibbah Engineering', logo: `${B}/fabrication-yard/muhibbah.png` },
        ],
    },
    {
        id: 'engineering',
        name: 'Engineering Consultant',
        position: { top: '19%', left: '60%' },
        customers: [
            { name: 'MMC', logo: `${B}/engineering-consultant/mmc.png` },
            { name: 'Technip Energies', logo: `${B}/engineering-consultant/technip-energies.png` },
            { name: 'DA Energies', logo: `${B}/engineering-consultant/da-energies.png` },
            { name: 'Petrofac', logo: `${B}/engineering-consultant/petrofac.png` },
            { name: 'Ranhill Worley', logo: `${B}/engineering-consultant/ranhill-worley.png` },
        ],
    },
    {
        id: 'system',
        name: 'System Integrator',
        position: { top: '80%', left: '92%' },
        customers: [
            { name: 'TriSystems', logo: `${B}/system-integrator/trisystems.png` },
            { name: 'Tyco', logo: `${B}/system-integrator/tyco.svg` },
            { name: 'Foxboro', logo: `${B}/system-integrator/foxboro.png` },
            { name: 'Yokogawa', logo: `${B}/system-integrator/yokogawa.png` },
        ],
    },
];

const CustomerMap = () => {
    const [activeCategory, setActiveCategory] = useState(null);

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
                                const needsLongerBranches = ['offshore', 'engineering', 'fabrication', 'epcc'].includes(category.id);
                                const getAngle = (i, total) => {
                                    return (360 / total) * i;
                                };

                                return (
                                    <div
                                        key={category.id}
                                        className={`hotspot ${activeCategory === category.id ? 'active' : ''}`}
                                        style={{ 
                                            top: category.position.top, 
                                            left: category.position.left,
                                            ...(needsLongerBranches ? { '--custom-branch-length': '90px', '--custom-branch-length-hover': '135px' } : {})
                                        }}
                                        onMouseEnter={() => setActiveCategory(category.id)}
                                        onMouseLeave={() => setActiveCategory(null)}
                                    >
                                        {/* Radial tree for logos */}
                                        <div className="radial-lines-layer">
                                            {category.customers.map((c, i) => {
                                                const angle = getAngle(i, category.customers.length);
                                                return (
                                                    <div 
                                                        key={`line-${c.name}`} 
                                                        className="radial-line" 
                                                        style={{ '--angle': `${angle}deg` }} 
                                                    />
                                                );
                                            })}
                                        </div>

                                        <div className="hotspot-marker"></div>
                                        <div className="hotspot-label">{category.name}</div>

                                        <div className="radial-nodes-layer">
                                            {category.customers.map((c, i) => {
                                                const angle = getAngle(i, category.customers.length);
                                                const rad = (angle * Math.PI) / 180;
                                                const cos = Math.cos(rad);
                                                const sin = Math.sin(rad);
                                                return (
                                                    <div 
                                                        key={`node-${c.name}`} 
                                                        className="radial-node" 
                                                        style={{ 
                                                            '--cos': cos, 
                                                            '--sin': sin,
                                                        }} 
                                                        title={c.name}
                                                    >
                                                        <img src={c.logo} alt={c.name} loading="lazy" />
                                                    </div>
                                                );
                                            })}
                                        </div>
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
