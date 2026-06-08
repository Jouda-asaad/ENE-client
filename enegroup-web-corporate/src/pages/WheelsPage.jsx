import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './WheelsPage.css';
import ScrollToTop from '../components/ScrollToTop';
const WheelsPage = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openLightbox = (index) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % showcaseImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
    };

    useEffect(() => {
        // Check for IntersectionObserver support
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach((el) => observer.observe(el));

            return () => {
                animatedElements.forEach((el) => observer.unobserve(el));
            };
        }
    }, []);

    const showcaseImages = [
        { src: '/assets/wheels/ene-wheels-branding.jpg', title: 'ENE Wheels Branding' },
        { src: '/assets/wheels/ene-wheels-lot-side.jpeg', title: 'Lot Side View' },
        { src: '/assets/wheels/ene-wheels-lot-front.jpeg', title: 'Lot Front View' },
        { src: '/assets/wheels/ene-wheels-lot-signage.jpeg', title: 'Signage' },
        { src: '/assets/wheels/ene-wheels-lot-wide.jpeg', title: 'Wide Lot View' },
    ];

    const infoCards = [
        { title: 'Location', icon: 'location_on', desc: 'Dataran Pandan Prima, 55100 Kuala Lumpur', link: '#map-section' },
        {
            title: 'WhatsApp Us',
            svg: <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
            desc: '010-4408118',
            link: 'https://wa.me/60104408118'
        },
    ];

    const socialLinks = [
        { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61575127706407', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg> },
        { platform: 'Instagram', url: 'https://www.instagram.com/enewheels/', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 100-2.881 1.44 1.44 0 000 2.881z"/></svg> },
        { platform: 'Mudah.my', url: 'https://www.mudah.my/ene-wheels-sdn-bhd', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg> },
        { platform: 'TikTok', url: 'https://www.tiktok.com/@ene.wheels', svg: <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.41-.02-.21-.02-.41-.02-.62.07-1.4.52-2.78 1.33-3.92 1.34-1.92 3.65-3.11 6-3.08.15 0 .29.02.44.02v4.04c-1.05-.03-2.1.28-2.95.89-.8.56-1.34 1.4-1.54 2.33-.24.97-.04 2.05.58 2.86.63.85 1.63 1.33 2.68 1.4 1.25.07 2.51-.43 3.33-1.31.81-.86 1.25-2.06 1.25-3.25V.02h-2.1z"/></svg> },
    ];

    useEffect(() => {
        if (selectedImageIndex !== null) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % showcaseImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [selectedImageIndex, showcaseImages.length]);



    return (
        <div className="wheels-page">
            <ScrollToTop />

            {/* Hero Section */}
            <section className="wheels-hero">
                <div className="wheels-hero-overlay"></div>
                <div className="wheels-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="wheels-text-container"
                    >
                        <div className="wheels-accent-bar"></div>
                        <h1 className="wheels-hero-title">
                            ENE WHEELS SDN BHD
                        </h1>
                        <p className="wheels-hero-subtitle">Imported Used Car Dealer</p>
                    </motion.div>
                </div>
            </section>

            {/* Company Info */}
            <section className="capabilities-section">
                <h2 className="section-title animate-on-scroll fade-up">About Us</h2>
                <p className="section-subtitle animate-on-scroll fade-up delay-100">Premium imported used cars at Dataran Pandan Prima.</p>

                <div className="capabilities-grid">
                    {infoCards.map((item, index) => (
                        item.link.startsWith('http') ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" key={index} className="capability-card glass-panel animate-on-scroll fade-up info-link" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="icon-wrapper">
                                    {item.svg
                                        ? <div style={{ color: '#25D366' }}>{item.svg}</div>
                                        : <span className="material-symbols-outlined">{item.icon}</span>
                                    }
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </a>
                        ) : (
                            <a href={item.link} key={index} className="capability-card glass-panel animate-on-scroll fade-up info-link" style={{ transitionDelay: `${index * 100}ms` }}>
                                <div className="icon-wrapper">
                                    {item.svg
                                        ? <div style={{ color: '#25D366' }}>{item.svg}</div>
                                        : <span className="material-symbols-outlined">{item.icon}</span>
                                    }
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </a>
                        )
                    ))}
                </div>
            </section>

            {/* Gallery Section */}
            <section className="gallery-section">
                <h2 className="section-title animate-on-scroll fade-up">Our Showroom</h2>
                <div className="wheels-slider-container animate-on-scroll fade-up" onClick={() => openLightbox(currentSlide)}>
                    {showcaseImages.map((item, index) => (
                        <div
                            key={index}
                            className={`wheels-slider-slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${item.src})` }}
                        >
                            <div className="wheels-slider-overlay">
                                <span className="material-symbols-outlined">zoom_in</span>
                            </div>
                        </div>
                    ))}
                    <div className="wheels-slider-dots">
                        {showcaseImages.map((_, index) => (
                            <button
                                key={index}
                                className={`wheels-slider-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={(e) => { e.stopPropagation(); setCurrentSlide(index); }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
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
                            src={showcaseImages[selectedImageIndex].src}
                            alt={`Gallery ${selectedImageIndex + 1}`}
                        />
                        <div className="lightbox-counter">
                            {selectedImageIndex + 1} / {showcaseImages.length}
                        </div>
                    </div>

                    <button className="lightbox-nav next" onClick={nextImage}>
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            )}

            {/* Social Media Section */}
            <section className="social-media-section capabilities-section">
                <h2 className="section-title animate-on-scroll fade-up">Connect With Us</h2>
                <p className="section-subtitle animate-on-scroll fade-up delay-100">Follow us for the latest arrivals and updates.</p>
                <div className="social-grid capabilities-grid">
                     {socialLinks.map((link, index) => (
                        <a href={link.url} target="_blank" rel="noopener noreferrer" key={index} className="social-card capability-card glass-panel animate-on-scroll fade-up" style={{ transitionDelay: `${index * 100}ms` }}>
                             <div className="svg-icon-wrapper" style={{ color: 'var(--color-accent-orange)', marginBottom: '1rem' }}>
                                {link.svg}
                            </div>
                            <h4>{link.platform}</h4>
                        </a>
                    ))}
                </div>
            </section>

            {/* Google Maps Section */}
            <section id="map-section" className="map-section capabilities-section">
                 <h2 className="section-title animate-on-scroll fade-up">Find Us Here</h2>
                 <p className="section-subtitle animate-on-scroll fade-up delay-100">Visit our lot at Dataran Pandan Prima.</p>
                 <div className="map-container glass-panel animate-on-scroll fade-up">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.844146039572!2d101.7371569!3d3.1359673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc36437bbd0309%3A0xe1043329d4d5a9d8!2sDataran%20Pandan%20Prima%2C%2055100%20Kuala%20Lumpur%2C%20Selangor!5e0!3m2!1sen!2smy!4v1717750000000!5m2!1sen!2smy"
                        width="100%"
                        height="450"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="ENE Wheels Location"
                    ></iframe>
                 </div>
            </section>

             <footer className="wheels-footer">
                <p>© 2026 ENE Wheels Sdn Bhd. <a href="/">Part of ENE Group</a>.</p>
            </footer>
        </div>
    );
};

export default WheelsPage;
