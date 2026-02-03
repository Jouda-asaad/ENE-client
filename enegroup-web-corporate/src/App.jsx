import React from 'react';
import HeaderCorp from './components/HeaderCorp';
import HeroVideo from './components/HeroVideo';
import StatsBar from './components/StatsBar';
import ServicesAccordion from './components/ServicesAccordion';
import AboutPreview from './components/AboutPreview';
import Testimonials from './components/Testimonials';
import PartnersCarousel from './components/PartnersCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="corporate-app">
      <HeaderCorp />
      <HeroVideo />
      <StatsBar />
      <ServicesAccordion />
      <AboutPreview />
      <Testimonials />
      <PartnersCarousel />
      <Footer />
    </div>
  );
}

export default App;
