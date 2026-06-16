import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HeaderCorp from './components/HeaderCorp';
import AboutPage from './pages/AboutPage';
import HeroVideo from './components/HeroVideo';
import VideoBackground from './components/VideoBackground';
import StatsBar from './components/StatsBar';
import Testimonials from './components/Testimonials';
import PartnersCarousel from './components/PartnersCarousel';
import CustomerMap from './components/CustomerMap';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminCMS from './pages/AdminCMS';
import WheelsPage from './pages/WheelsPage';
import FlotrimPage from './pages/FlotrimPage';
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
              <CustomerMap />
              <Testimonials />
            </>
          } />
          {/* Placeholder Routes for now to prevent errors on click */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/flotrim" element={<FlotrimPage />} />
          <Route path="/wheels" element={<WheelsPage />} />
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
