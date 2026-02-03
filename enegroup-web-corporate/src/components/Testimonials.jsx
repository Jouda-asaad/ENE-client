import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        title: "Provide Quality Service And Assurance",
        quote: "Dealing with many vendors, we're always on the lookout for companies that can provide quality service and assurance. We are very happy with the service provided by ENE and look forward to more ventures in the time to come.",
        company: "Yokogawa",
        companyType: "Information Technology Company",
        logo: "/assets/partners/yokogawa.png"
    },
    {
        id: 2,
        title: "Quick To Assist",
        quote: "I'm surprised that ENE Petro Services gave us corporate guarantee on valves purchased. When our company purchased the Farris lineup for an active project, ENE Engineers were quick to assist and provide consultation services. Kudos!",
        company: "Sapura",
        companyType: "Company",
        logo: "/assets/partners/sapura.png"
    },
    {
        id: 3,
        title: "Excellent Service",
        quote: "We utilized Honeywell Analytic tools and Kenexxis Gas Mapping services and quickly discovered potential risk loopholes in our planning. Congrats and thank you to ENE for the excellent service provided.",
        company: "Shell",
        companyType: "Oil Industry Company",
        logo: "/assets/partners/shell.svg"
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-label">TESTIMONIALS</span>
                    <h2 className="testimonials-title">Happy Clients</h2>
                    <p className="testimonials-subtitle">
                        At ENE Petro Services, we strive to deliver the best results that our customers testify by.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">★</span>
                                ))}
                            </div>
                            <h3 className="testimonial-quote-title">" {testimonial.title} "</h3>
                            <p className="testimonial-text">{testimonial.quote}</p>
                            <div className="testimonial-author">
                                <div className="author-logo">
                                    <img src={testimonial.logo} alt={testimonial.company} />
                                </div>
                                <div className="author-info">
                                    <span className="author-company">{testimonial.company}</span>
                                    <span className="author-type">{testimonial.companyType}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
