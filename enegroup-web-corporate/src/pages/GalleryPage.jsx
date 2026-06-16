import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import ScrollToTop from '../components/ScrollToTop';

// All ENE-related imagery, grouped for a clean professional gallery.
const galleryImages = [
    { src: '/assets/services/onsite-1.jpg', title: 'On-Site Operations' },
    { src: '/assets/services/onsite-2.jpg', title: 'On-Site Operations' },
    { src: '/assets/services/onsite-3.jpg', title: 'On-Site Operations' },
    { src: '/assets/services/onsite-4.jpg', title: 'On-Site Operations' },
    { src: '/assets/services/onsite-5.jpg', title: 'On-Site Operations' },
    { src: '/assets/services/valve-testing-1.png', title: 'Valve Testing' },
    { src: '/assets/services/valve-testing-2.png', title: 'Valve Testing' },
    { src: '/assets/services/engineering-consultation.jpg', title: 'Engineering Consultation' },
    { src: '/assets/services/engineering-consultation-2.jpeg', title: 'Engineering Consultation' },
    { src: '/assets/services/3d-mapping.png', title: '3D Mapping' },
    { src: '/assets/misc/huc.png', title: 'Hook-Up & Commissioning' },
    { src: '/assets/misc/maintenance.png', title: 'Maintenance' },
    { src: '/assets/misc/marine.png', title: 'Marine Services' },
    { src: '/assets/team/WhatsApp-Image-2025-04-25-at-09.39.21.jpeg', title: 'Our Team' },
    { src: '/assets/team/WhatsApp-Image-2025-04-28-at-06.33.29.jpeg', title: 'Our Team' },
    { src: '/assets/team/WhatsApp-Image-2025-04-28-at-06.33.30.jpeg', title: 'Our Team' },
    { src: '/assets/team/WhatsApp-Image-2025-04-28-at-06.33.31.jpeg', title: 'Our Team' },
    { src: '/assets/wheels/ene-wheels-branding.jpg', title: 'ENE Wheels' },
    { src: '/assets/wheels/ene-wheels-lot-front.jpeg', title: 'ENE Wheels' },
    { src: '/assets/wheels/ene-wheels-lot-side.jpeg', title: 'ENE Wheels' },
    { src: '/assets/wheels/ene-wheels-lot-wide.jpeg', title: 'ENE Wheels' },
    { src: '/assets/wheels/ene-wheels-lot-signage.jpeg', title: 'ENE Wheels' },
];

const GalleryPage = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openLightbox = (index) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            const els = document.querySelectorAll('.animate-on-scroll');
            els.forEach((el) => observer.observe(el));
            return () => els.forEach((el) => observer.unobserve(el));
        }
    }, []);

    return (
        <div className="about-page">
            <ScrollToTop />

            {/* Hero */}
            <section className="about-hero animate-on-scroll fade-up">
                <div className="about-hero-overlay"></div>
                <div className="about-hero-content">
                    <div className="slanted-accent"></div>
                    <h1>Gallery</h1>
                    <p className="subtitle">A look at ENE Petro Group — our people, projects and operations.</p>
                </div>
            </section>

            {/* Gallery grid */}
            <section className="gallery-section">
                <h2 className="section-title animate-on-scroll fade-up">Moments at ENE</h2>
                <div className="showcase-grid animate-on-scroll fade-up">
                    {galleryImages.map((item, index) => (
                        <div
                            key={index}
                            className="showcase-card"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="card-image-wrapper">
                                <img src={item.src} alt={item.title} loading="lazy" />
                                <div className="card-overlay">
                                    <span className="material-symbols-outlined">zoom_in</span>
                                </div>
                            </div>
                            <div className="card-content">
                                <h5>{item.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImageIndex !== null && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <button className="lightbox-nav prev" onClick={prevImage}>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={galleryImages[selectedImageIndex].src}
                            alt={galleryImages[selectedImageIndex].title}
                        />
                        <div className="lightbox-counter">
                            {selectedImageIndex + 1} / {galleryImages.length}
                        </div>
                    </div>
                    <button className="lightbox-nav next" onClick={nextImage}>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
