import React, { useState } from 'react';
import './ServicesAccordion.css';

const ServicesAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const services = [
        {
            title: "Mechanical & Piping Engineering",
            desc: "Specialized in subsea pipelines, top-side piping systems, and pressure vessel fabrication. We adhere to ASME and API standards to ensure structural integrity and operational safety.",
        },
        {
            title: "Electrical & Instrumentation",
            desc: "Comprehensive E&I services including control system design, offshore power generation, and hazard area installations (ATEX compliant).",
        },
        {
            title: "Procurement & Supply Chain",
            desc: "Global sourcing network ensuring timely delivery of critical components, backed by rigorous QA/QC inspection protocols.",
        }
    ];

    const toggle = (i) => {
        setActiveIndex(activeIndex === i ? null : i);
    };

    return (
        <section className="services-acc-section">
            <div className="container">
                <h2 className="acc-title">Our Capabilities</h2>

                <div className="accordion-list">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className={`acc-item ${activeIndex === index ? 'active' : ''}`}
                        >
                            <div className="acc-header" onClick={() => toggle(index)}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="acc-number">0{index + 1}</span>
                                    <h3>{item.title}</h3>
                                </div>
                                <span className="acc-icon">▼</span>
                            </div>

                            <div className="acc-body">
                                <div className="acc-content">
                                    <p className="acc-desc">{item.desc}</p>
                                    <div className="acc-img-placeholder">
                                        {/* Real image would go here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesAccordion;
