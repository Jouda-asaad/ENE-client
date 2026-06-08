
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const subjectParam = searchParams.get('subject');
        const detailsParam = searchParams.get('details');

        if (subjectParam || detailsParam || searchParams.get('message')) {
            setFormData(prev => ({
                ...prev,
                subject: subjectParam || '',
                message: searchParams.get('message') || (detailsParam ? `I am interested in: \n${detailsParam} \n\nMy Request: ` : '')
            }));
        }
    }, [searchParams]);

    const [copyStatus, setCopyStatus] = useState({
        address: false,
        phone: false,
        email: false
    });

    const contactDetails = {
        address: "Level 21, Menara Binjai, No. 2, Jalan Binjai, 50450 Kuala Lumpur",
        phone: "+603 2181 3145",
        email: "sales@enegroup.com.my"
    };

    const handleCopy = (key, text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus({ ...copyStatus, [key]: true });
            setTimeout(() => {
                setCopyStatus({ ...copyStatus, [key]: false });
            }, 2000);
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const myForm = e.target;
        const formDataObj = new FormData(myForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formDataObj).toString(),
        })
            .then(() => {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            })
            .catch((error) => alert(error));
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="contact-hero-content">
                    <div className="accent-bar-slanted"></div>
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Connect with our engineering experts for project inquiries and specialized support.
                    </p>
                </div>
            </div>

            <div className="contact-container">
                <div className="contact-grid">
                    {/* Contact Info Card */}
                    <div className="contact-card info-card">
                        <h2 className="card-title">Contact Information</h2>
                        <p className="card-desc">Reach out to us directly or visit our headquarters.</p>

                        <div className="contact-list">
                            {/* Address */}
                            <div className="contact-item">
                                <div className="icon-box">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div className="contact-details">
                                    <span className="contact-label">Headquarters</span>
                                    <p className="contact-value">{contactDetails.address}</p>
                                </div>
                                <button
                                    className="copy-btn"
                                    onClick={() => handleCopy('address', contactDetails.address)}
                                    title="Copy Address"
                                >
                                    <span className="material-symbols-outlined">
                                        {copyStatus.address ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>

                            {/* Phone */}
                            <div className="contact-item">
                                <div className="icon-box">
                                    <span className="material-symbols-outlined">call</span>
                                </div>
                                <div className="contact-details">
                                    <span className="contact-label">Phone</span>
                                    <p className="contact-value">{contactDetails.phone}</p>
                                </div>
                                <button
                                    className="copy-btn"
                                    onClick={() => handleCopy('phone', contactDetails.phone)}
                                    title="Copy Phone"
                                >
                                    <span className="material-symbols-outlined">
                                        {copyStatus.phone ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>

                            {/* Email */}
                            <div className="contact-item">
                                <div className="icon-box">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div className="contact-details">
                                    <span className="contact-label">Email</span>
                                    <p className="contact-value">{contactDetails.email}</p>
                                </div>
                                <button
                                    className="copy-btn"
                                    onClick={() => handleCopy('email', contactDetails.email)}
                                    title="Copy Email"
                                >
                                    <span className="material-symbols-outlined">
                                        {copyStatus.email ? 'check' : 'content_copy'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Send Message Form Card */}
                    <div className="contact-card form-card">
                        <h2 className="card-title">Send a Message</h2>
                        <form
                            className="contact-form"
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            onSubmit={handleSubmit}
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@company.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+60..."
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Inquiry about..."
                                    className={formData.subject.startsWith('Quote Request:') ? 'highlight-input' : ''}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Message
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
