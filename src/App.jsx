import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream text-dark-grey selection:bg-gold selection:text-charcoal flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Portfolio />
        <Shop />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
