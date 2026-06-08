import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import HeaderCorp from './components/HeaderCorp';
import AboutPage from './pages/AboutPage';
import HeroVideo from './components/HeroVideo';
import VideoBackground from './components/VideoBackground';
import StatsBar from './components/StatsBar';
import AboutPreview from './components/AboutPreview';
import Testimonials from './components/Testimonials';
import PartnersCarousel from './components/PartnersCarousel';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminCMS from './pages/AdminCMS';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <div className="corporate-app">
        <ScrollToTop />
        {!isAdminRoute && <HeaderCorp />}
        <VideoBackground />
        <Routes>
          <Route path="/" element={
            <>
              <HeroVideo />
              <StatsBar />
              <PartnersCarousel />

              {/* Services & Products Preview Unified Section */}
              <section className="unified-preview-section">
                <div className="services-preview-content">
                  <div className="accent-bar"></div>
                  <h2 className="services-preview-title">Our Core Services</h2>
                  <p className="services-preview-subtitle">
                    Delivering excellence across the energy value chain with precision engineering and advanced safety solutions.
                  </p>
                  <Link to="/services" className="services-preview-cta">
                    View All Services <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>

                <div className="products-preview-content">
                  <div className="accent-bar"></div>
                  <h2 className="products-preview-title">Our Premium Products</h2>
                  <p className="products-preview-subtitle">
                    World-class valves, safety systems, and instrumentation designed for the most demanding environments.
                  </p>
                  <Link to="/products" className="products-preview-cta">
                    Explore Products <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </section>

              <AboutPreview />
              <Testimonials />
            </>
          } />
          {/* Placeholder Routes for now to prevent errors on click */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<div style={{ paddingTop: '80px', color: 'white', textAlign: 'center' }}>Projects Page (Placeholder)</div>} />
          <Route path="/investors" element={<div style={{ paddingTop: '80px', color: 'white', textAlign: 'center' }}>Investors Page (Placeholder)</div>} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminCMS />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
