import React, { useState } from 'react';
import './BranchMap.css';
import { geoMercator, geoPath } from "d3-geo";
import * as topojson from "topojson-client";

const geoUrl = "/assets/world.json";

const branches = [
    {
        id: 'kl',
        entity: 'ENE PETRO SERVICES SDN BHD',
        label: 'Kuala Lumpur',
        sublabel: 'HQ & Workshop',
        region: 'MY',
        isHQ: true,
        image: '/assets/branches/KualaLumpur.png',
        coordinates: [101.6869, 3.1390],
        labelOffset: [0, -18],
    },
    {
        id: 'sarawak',
        entity: 'ENE INDUSTRIES SOLUTION SDN BHD',
        label: 'Bintulu, Sarawak',
        sublabel: '',
        region: 'MY',
        isHQ: false,
        image: '/assets/branches/sarawak.png',
        coordinates: [113.0463, 3.1741],
        labelOffset: [0, -15],
    },
    {
        id: 'sabah',
        entity: 'ENE BORNEO SDN BHD',
        label: 'Kota Kinabalu, Sabah',
        sublabel: '',
        region: 'MY',
        isHQ: false,
        image: '/assets/branches/sabah.png',
        coordinates: [116.0753, 5.9804],
        labelOffset: [0, -15],
    },
    {
        id: 'kelantan',
        entity: 'ENE TIMUR SDN BHD',
        label: 'Tok Bali, Kelantan',
        sublabel: '',
        region: 'MY',
        isHQ: false,
        image: '/assets/branches/kelantan.png',
        coordinates: [102.4862, 5.8856],
        labelOffset: [0, -15],
    },
    {
        id: 'kemaman',
        entity: 'ENE TIMUR SDN BHD',
        label: 'Kemaman, Terengganu',
        sublabel: '',
        region: 'MY',
        isHQ: false,
        image: null,
        coordinates: [103.4285, 4.2343],
        labelOffset: [20, -15], // Shift right and up to avoid overlap with KL
    },
    {
        id: 'johor',
        entity: 'ENE PETRO SERVICES SDN BHD',
        label: 'Pengerang, Johor',
        sublabel: '',
        region: 'MY',
        isHQ: false,
        image: null,
        coordinates: [104.2259, 1.3653],
        labelOffset: [35, -5], // Shifted right and slightly up
    },
    {
        id: 'singapore',
        entity: 'ENE INTERNATIONAL PVT LTD',
        label: 'Singapore',
        sublabel: '',
        region: 'SG',
        isHQ: false,
        image: null,
        coordinates: [103.8198, 1.3521],
        labelOffset: [-35, 18], // Shifted left and down
    },
];

const BranchMap = () => {
    const [activeBranch, setActiveBranch] = useState(null);
    const [geographies, setGeographies] = useState([]);

    React.useEffect(() => {
        fetch(geoUrl)
            .then(response => response.json())
            .then(data => {
                const features = topojson.feature(data, data.objects.countries).features;
                // Filter only Malaysia (458), Singapore (702), Brunei (096)
                const targetCountries = features.filter(f => ["458", "702", "096"].includes(f.id));
                setGeographies(targetCountries);
            })
            .catch(err => console.error("Error loading map data:", err));
    }, []);

    const handlePinEnter = (e, branch) => {
        // We will position the card relative to the viewport
        let posX = e.clientX + 20; 
        let posY = e.clientY + 20;  
        
        // Prevent overflow on the right side
        if (posX + 420 > window.innerWidth) {
            posX = e.clientX - 440; 
        }
        
        // Prevent overflow on the bottom
        if (posY + 250 > window.innerHeight) {
            posY = e.clientY - 270;
        }

        setActiveBranch({
            ...branch,
            posX,
            posY
        });
    };

    const handlePinLeave = () => {
        setActiveBranch(null);
    };

    // Setup map projection
    const mapWidth = 800;
    const mapHeight = 400;
    const projection = geoMercator()
        .scale(2500)
        .center([109.5, 4.5]) // Centered on Malaysia/Singapore
        .translate([mapWidth / 2, mapHeight / 2]);
        
    const pathGenerator = geoPath().projection(projection);

    return (
        <section className="branch-map-section">
            <div className="branch-map-inner">
                <h2 className="section-title animate-on-scroll fade-up">Our Locations</h2>
                <p className="section-subtitle animate-on-scroll fade-up delay-100">
                    Strategically positioned across Malaysia & Singapore
                </p>

                <div className="branch-map-wrapper animate-on-scroll fade-up">
                    <div className="branch-map-container">
                        <div className="map-image-wrapper">
                            <div className="map-image-inner" style={{ height: "100%", width: "100%", position: "relative" }}>
                                <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} style={{ width: "100%", height: "auto" }}>
                                    {/* Map Outlines */}
                                    <g className="map-geographies">
                                        {geographies.map((geo, i) => (
                                            <path
                                                key={`geo-${i}`}
                                                d={pathGenerator(geo)}
                                                fill="rgba(255, 90, 9, 0.25)"
                                                stroke="rgba(255, 90, 9, 0.6)"
                                                strokeWidth={1}
                                                style={{ transition: "fill 0.3s ease" }}
                                                onMouseEnter={(e) => e.target.style.fill = "rgba(255, 90, 9, 0.4)"}
                                                onMouseLeave={(e) => e.target.style.fill = "rgba(255, 90, 9, 0.25)"}
                                            />
                                        ))}
                                    </g>
                                    
                                    {/* Branch Pins */}
                                    {branches.map((branch) => {
                                        const [x, y] = projection(branch.coordinates);
                                        return (
                                            <g 
                                                key={branch.id}
                                                className={`svg-pin-group ${activeBranch?.id === branch.id ? 'active' : ''}`}
                                                onMouseEnter={(e) => handlePinEnter(e, branch)} 
                                                onMouseLeave={handlePinLeave}
                                                onClick={(e) => {
                                                    if (activeBranch?.id === branch.id) {
                                                        handlePinLeave();
                                                    } else {
                                                        handlePinEnter(e, branch);
                                                    }
                                                }}
                                                transform={`translate(${x}, ${y})`}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {/* Invisible Hit Area for easier hovering */}
                                                <circle cx={0} cy={0} r={25} fill="transparent" />
                                                
                                                {/* Pinging pulse */}
                                                <circle cx={0} cy={0} r={10} fill="rgba(255, 90, 9, 0.4)" stroke="rgba(255, 90, 9, 0.6)" className="svg-pin-pulse" />
                                                
                                                {/* Main dot */}
                                                <circle cx={0} cy={0} r={branch.isHQ ? 7 : 5} fill="#FF5A09" stroke="#fff" strokeWidth={1.5} className="svg-pin-dot" />
                                                
                                                {/* Text Label */}
                                                <text
                                                    textAnchor="middle"
                                                    x={branch.labelOffset?.[0] || 0}
                                                    y={branch.labelOffset?.[1] || -18}
                                                    style={{
                                                        fontFamily: "Inter, sans-serif",
                                                        fill: "#FFF",
                                                        fontSize: "14px",
                                                        fontWeight: 700,
                                                        opacity: activeBranch?.id === branch.id ? 1 : 0.85,
                                                        filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.9)) drop-shadow(0px 0px 3px rgba(0,0,0,1))",
                                                        pointerEvents: "none" // Prevent tooltip flicker when hovering text
                                                    }}
                                                >
                                                    {branch.label}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Card for Active Branch */}
                {activeBranch && (
                    <div 
                        className="branch-info-card"
                        style={{
                            position: 'fixed',
                            left: `${activeBranch.posX}px`,
                            top: `${activeBranch.posY}px`,
                            bottom: 'auto',
                            right: 'auto',
                            zIndex: 9999,
                            pointerEvents: 'none',
                            margin: 0
                        }}
                    >
                        {activeBranch.image && (
                            <div className="card-image">
                                <img src={activeBranch.image} alt={activeBranch.label} />
                            </div>
                        )}
                        <div className="card-body">
                            <div className="card-header-inner">
                                {activeBranch.isHQ && <span className="hq-badge">Headquarters</span>}
                                <h4>{activeBranch.entity}</h4>
                                <p className="card-location">
                                    <span className="material-symbols-outlined">location_on</span>
                                    {activeBranch.label}
                                </p>
                                {activeBranch.sublabel && <p className="card-sublabel">{activeBranch.sublabel}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BranchMap;
