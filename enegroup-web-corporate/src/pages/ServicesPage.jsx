import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import './ServicesPage.css';

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

const ServicesPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showGallery, setShowGallery] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const location = useLocation();

    // Handle hash scrolling and auto-expanding
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#service-', '');
            const index = services.findIndex(s => s.id === id);

            if (index !== -1) {
                setActiveIndex(index);

                // Slight delay to ensure DOM is ready
                setTimeout(() => {
                    const element = document.getElementById(location.hash.substring(1));
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            }
        }
    }, [location]);

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

    const navigate = useNavigate();

    const handleInquiry = (service) => {
        const subject = encodeURIComponent(`Inquiry: ${service.title}`);
        const message = encodeURIComponent(`I am interested in learning more about your ${service.title} services. Please contact me with more information.`);
        navigate(`/contact?subject=${subject}&message=${message}`);
    };

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-content">
                    <div className="accent-bar"></div>
                    <h1 className="services-hero-title">Our Services</h1>
                    <p className="services-hero-subtitle">
                        Delivering excellence across the energy value chain with precision engineering and advanced safety solutions.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="accordion-container">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            id={`service-${service.id}`}
                            className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => setActiveIndex(index)}
                            style={{
                                backgroundImage: `linear-gradient(135deg, rgba(20, 35, 55, 0.75), rgba(40, 60, 90, 0.8)), url(${service.image})`,
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

                                <div className="service-details">
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

                                    <button
                                        className="service-link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleInquiry(service);
                                        }}
                                    >
                                        Send Inquiry <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </div>

                            {/* Active state border glow - simplified */}
                            <div className={`accordion-bg ${activeIndex === index ? 'visible' : ''}`}></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gallery Modal */}
            <AnimatePresence>
                {showGallery && (
                    <motion.div
                        className="gallery-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
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
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
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
        </div>
    );
};

export default ServicesPage;
