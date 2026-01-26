import React from 'react';
import HeaderCorp from './components/HeaderCorp';
import HeroSplit from './components/HeroSplit';
import ServicesAccordion from './components/ServicesAccordion';
import ContactIntegrated from './components/ContactIntegrated';
import './App.css';

function App() {
  return (
    <div className="corporate-app">
      <HeaderCorp />
      <HeroSplit />
      <ServicesAccordion />
      <ContactIntegrated />
    </div>
  );
}

export default App;
