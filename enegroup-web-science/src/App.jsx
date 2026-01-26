import React from 'react';
import HeaderFuture from './components/HeaderFuture';
import HeroFuture from './components/HeroFuture';
import ServicesCarousel from './components/ServicesCarousel';
import ContactMap from './components/ContactMap';
import './App.css';

function App() {
  return (
    <div className="future-app">
      {/* 
        This is Proposal 3: "The Future Flow"
        Style: Light/Modern Dynamic
      */}
      <HeaderFuture />
      <HeroFuture />
      <ServicesCarousel />
      <ContactMap />
    </div>
  );
}

export default App;

// Removed duplicate export
