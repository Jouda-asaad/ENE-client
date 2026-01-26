import React from 'react';

const PagePlaceholder = ({ title }) => {
    return (
        <div className="container" style={{ padding: '6rem 1rem', minHeight: '60vh', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--color-ene-blue)', marginBottom: '1rem' }}>{title}</h1>
            <p style={{ color: 'var(--color-text-sub)', fontSize: '1.25rem' }}>This page is currently under construction.</p>
        </div>
    );
};

export const About = () => <PagePlaceholder title="About Us" />;
export const ServicesPage = () => <PagePlaceholder title="Our Services" />;
export const ContactPage = () => <PagePlaceholder title="Contact Us" />;
