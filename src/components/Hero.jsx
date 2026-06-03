import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cream px-6 py-20 md:px-12"
    >
      {/* Decorative Elegant Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
        <svg
          width="800"
          height="800"
          viewBox="0 0 100 100"
          className="text-gold stroke-current stroke-[0.1] fill-none animate-spin-slow"
          style={{ animationDuration: '60s' }}
        >
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="30" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="15" y1="15" x2="85" y2="85" />
          <line x1="15" y1="85" x2="85" y2="15" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Fine Subheading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <span className="w-8 h-[1px] bg-gold" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">
            Creative Portfolio
          </span>
          <span className="w-8 h-[1px] bg-gold" />
        </motion.div>

        {/* Large Elegant Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl text-dark-grey leading-tight mb-8"
        >
          Full-Stack Developer <br />
          <span className="italic font-light text-gold">&amp; Imitation Jewellery</span>
        </motion.h1>

        {/* Descriptive Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base text-dark-grey/70 max-w-xl mx-auto leading-relaxed mb-12 font-light tracking-wide"
        >
          Crafting performant and secure web architectures with the MERN stack by day, and curating exquisite traditional imitation jewellery for K &amp; K Enterprises by night. Where technical precision meets cultural heritage.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-dark-grey text-cream text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium border border-dark-grey hover:border-gold shadow-sm"
          >
            Hire Me
          </a>
          <a
            href="#shop"
            className="w-full sm:w-auto px-8 py-3.5 border border-gold text-dark-grey text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium"
          >
            View Shop
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center cursor-pointer"
        onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-gold mb-2">Scroll Down</span>
        <div className="w-[1px] h-10 bg-gold/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gold animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
