import React from 'react';
import './ServicesCarousel.css';

const ServicesCarousel = () => {
    const services = [
        {
            title: "Advanced EPCIC",
            desc: "Engineering, Procurement, Construction, Installation & Commissioning with detailed digital twin modeling.",
            // Using placeholders for now
            img: "https://images.unsplash.com/photo-1581093458791-9c17df3750f6?q=80&w=600&auto=format&fit=crop",
            icon: "🏗️"
        },
        {
            title: "Plant Optimization",
            desc: "AI-driven maintenance schedules and turnaround management for maximum uptime.",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
            icon: "⚡"
        },
        {
            title: "Technical Manpower",
            desc: "Deploying highly skilled specialists to onshore and offshore sites globally.",
            img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
            icon: "👷"
        },
        {
            title: "Sustainable Tech",
            desc: "Integrating renewable energy systems into existing O&G infrastructure.",
            img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop",
            icon: "🌱"
        }
    ];

    return (
        <section className="services-carousel-section">
            <h2 className="carousel-title">Integration Modules</h2>
            <div className="carousel-container">
                {services.map((item, index) => (
                    <div key={index} className="service-card-future">
                        <img src={item.img} alt={item.title} className="card-img-future" />
                        <div className="future-icon">{item.icon}</div>
                        <div className="card-overlay-future">
                            <h3 className="card-title-future">{item.title}</h3>
                            <p className="card-desc-future">{item.desc}</p>
                        </div>
                    </div>
                ))}
                {/* Spacer for right padding */}
                <div style={{ minWidth: "1px" }}></div>
            </div>
        </section>
    );
};

export default ServicesCarousel;
