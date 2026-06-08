import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ServicesAccordion.css';

const services = [
    {
        id: "01",
        title: "Engineering Consultation Services",
        description: "Oil & gas specialists with extensive experience in Engineering Design Preparation and Support. We provide capabilities for brownfield and greenfield projects, from conceptual study through FEED and detailed design stage.",
        image: "/assets/services/engineering-consultation.jpg",
        subServices: [
            "Mechanical & Piping",
            "Civil & Structural",
            "Electrical",
            "Instrument",
            "Process & Safety"
        ]
    },
    {
        id: "02",
        title: "3D Fire & Gas Mapping",
        description: "Algorithm-based fire and gas coverage calculation utilizing Effigy software by Kenexis USA. Geographic and scenario-based coverage analysis for facility safety optimization.",
        image: "/assets/services/3d-mapping.png",
        partner: {
            name: "Kenexis",
            logo: "/assets/services/kenexis-logo.png"
        },
        gallery: [
            "/assets/services/kenexis-sim-1.png",
            "/assets/services/kenexis-sim-2.png",
            "/assets/services/kenexis-sim-3.png"
        ]
    },
    {
        id: "03",
        title: "Valve Servicing & Testing",
        description: "State-of-the-art valve maintenance, repair, and testing facilities. Comprehensive testing and calibration services for all industrial valve types.",
        image: "/assets/services/valve-testing-1.png",
        gallery: [
            "/assets/services/valve-testing-1.png",
            "/assets/services/valve-testing-2.png"
        ]
    },
    {
        id: "04",
        title: "On-Site Servicing & Testing",
        description: "Rapid-response mobile field units equipped for on-site calibration, testing, and maintenance. Specialized manpower to minimize operational downtime.",
        image: "/assets/services/onsite-1.jpg",
        gallery: [
            "/assets/services/onsite-1.jpg",
            "/assets/services/onsite-2.jpg",
            "/assets/services/onsite-3.jpg",
            "/assets/services/onsite-4.jpg",
            "/assets/services/onsite-5.jpg"
        ]
    }
];

const ServicesAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openGallery = (images, e) => {
        e.stopPropagation();
        setGalleryImages(images);
        setCurrentImageIndex(0);
        setShowGallery(true);
    };

    const closeGallery = () => {
        setShowGallery(false);
        setGalleryImages([]);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <section className="services-section">
            <div className="section-header-container">
                <div className="accent-bar"></div>
                <h2 className="section-title">Our Core Services</h2>
                <p className="section-subtitle">Delivering excellence across the energy value chain with precision engineering and advanced safety solutions.</p>
            </div>

            <div className="accordion-container">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(10, 22, 40, 0.85), rgba(26, 45, 74, 0.9)), url(${service.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Large faded number */}
                        <span className="service-number-bg">{service.id}</span>

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

                                        {/* Sub-services list */}
                                        {service.subServices && (
                                            <ul className="sub-services-list">
                                                {service.subServices.map((sub, i) => (
                                                    <li key={i}>
                                                        <span className="material-symbols-outlined">check_circle</span>
                                                        {sub}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Partner badge */}
                                        {service.partner && (
                                            <div className="partner-badge">
                                                <span className="partner-text">Powered by</span>
                                                <img
                                                    src={service.partner.logo}
                                                    alt={service.partner.name}
                                                    className="partner-logo"
                                                />
                                            </div>
                                        )}

                                        {/* Gallery thumbnails */}
                                        {service.gallery && (
                                            <div className="gallery-preview">
                                                <div className="gallery-thumbnails">
                                                    {service.gallery.slice(0, 3).map((img, i) => (
                                                        <div
                                                            key={i}
                                                            className="gallery-thumb"
                                                            onClick={(e) => openGallery(service.gallery, e)}
                                                        >
                                                            <img src={img} alt={`Gallery ${i + 1}`} />
                                                        </div>
                                                    ))}
                                                    {service.gallery.length > 3 && (
                                                        <div
                                                            className="gallery-thumb gallery-more"
                                                            onClick={(e) => openGallery(service.gallery, e)}
                                                        >
                                                            +{service.gallery.length - 3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <button className="service-link">
                                            Send Inquiry <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Active state border glow */}
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

            {/* Gallery Modal */}
            <AnimatePresence>
                {showGallery && (
                    <motion.div
                        className="gallery-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeGallery}
                    >
                        <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="gallery-close" onClick={closeGallery}>
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <button className="gallery-nav gallery-prev" onClick={prevImage}>
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>

                            <div className="gallery-image-container">
                                <motion.img
                                    key={currentImageIndex}
                                    src={galleryImages[currentImageIndex]}
                                    alt={`Gallery image ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>

                            <button className="gallery-nav gallery-next" onClick={nextImage}>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>

                            <div className="gallery-dots">
                                {galleryImages.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`gallery-dot ${i === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ServicesAccordion;
