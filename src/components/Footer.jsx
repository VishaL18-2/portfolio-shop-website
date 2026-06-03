import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-cream py-16 px-6 md:px-12 border-t border-gold/15">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Footer Brand */}
        <div className="flex flex-col text-center md:text-left">
          <span className="font-serif text-2xl tracking-widest text-cream">
            K&amp;K
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-light mt-1">
            Enterprises &amp; Web Dev
          </span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[10px] uppercase tracking-widest text-cream/60">
          <a href="#home" className="hover:text-gold transition-colors duration-300">Home</a>
          <a href="#portfolio" className="hover:text-gold transition-colors duration-300">Portfolio</a>
          <a href="#shop" className="hover:text-gold transition-colors duration-300">Shop</a>
          <a href="#contact" className="hover:text-gold transition-colors duration-300">Contact</a>
        </div>

        {/* Scroll to Top */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-3 border border-gold/30 hover:border-gold hover:bg-gold hover:text-charcoal transition-all duration-300 rounded-full"
            aria-label="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-cream/40 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} K&amp;K Enterprises &amp; Dev. All Rights Reserved.</p>
        <p className="font-light">Designed for Luxury &amp; Functionality</p>
      </div>
    </footer>
  );
}
