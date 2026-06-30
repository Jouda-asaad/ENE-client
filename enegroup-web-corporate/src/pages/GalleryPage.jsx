import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import ScrollToTop from '../components/ScrollToTop';
import { supabase } from '../supabaseClient';

const GalleryPage = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        const fetchGalleryImages = async () => {
            const { data, error } = await supabase
                .from('gallery_images')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: true });
            
            if (data) {
                setGalleryImages(data);
            } else {
                console.error('Error fetching gallery images:', error);
            }
            setLoading(false);
        };

        fetchGalleryImages();
    }, []);

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
        if ('IntersectionObserver' in window && !loading && galleryImages.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            const els = document.querySelectorAll('.animate-on-scroll');
            els.forEach((el) => observer.observe(el));
            return () => els.forEach((el) => observer.unobserve(el));
        }
    }, [loading, galleryImages]);

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
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
                ) : galleryImages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>No images found.</div>
                ) : (
                    <div className="showcase-grid animate-on-scroll fade-up">
                        {galleryImages.map((item, index) => (
                            <div
                                key={item.id || index}
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
                )}
            </section>

            {/* Lightbox */}
            {selectedImageIndex !== null && galleryImages.length > 0 && (
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
