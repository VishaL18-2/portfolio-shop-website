import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ShoppingBag } from 'lucide-react';

export default function Shop() {
  return (
    <section
      id="shop"
      className="py-24 md:py-32 px-6 md:px-12 bg-cream border-t border-gold/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
            K &amp; K Enterprises
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-dark-grey font-normal tracking-wide">
            Ethnic Imitation Jewellery
          </h2>
          <p className="text-xs md:text-sm text-dark-grey/60 max-w-md mx-auto mt-4 font-light leading-relaxed">
            A curated collection of exquisite oxidized silver and traditional gold-plated imitation jewellery. Explore artistic dancer-motif jhumkas, Kundan-style chokers, and elegant pendant sets.
          </p>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group flex flex-col justify-between h-full bg-white border border-gold/10 hover:border-gold/30 transition-all duration-500 shadow-xs hover:shadow-md p-6"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full overflow-hidden bg-white mb-6 p-2 flex items-center justify-center border border-gold/5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-w-full max-h-full transition-transform duration-700 ease-out group-hover:scale-102"
                    loading="lazy"
                  />
                  {/* Subtle Accent Gold Tag */}
                  <div className="absolute top-4 left-4 bg-charcoal text-cream text-[10px] uppercase tracking-widest px-3 py-1 font-light border border-gold/25">
                    {product.price}
                  </div>
                </div>

                {/* Product Title */}
                <h3 className="font-serif text-lg md:text-xl text-dark-grey font-normal tracking-wide mb-2">
                  {product.title}
                </h3>

                {/* Product Description */}
                <p className="text-xs md:text-sm text-dark-grey/75 leading-relaxed mb-6 font-light">
                  {product.description}
                </p>
              </div>

              {/* Call to Action Button */}
              <a
                href={product.meeshoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-dark-grey text-cream text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 font-semibold border border-dark-grey hover:border-gold"
              >
                <ShoppingBag size={14} />
                <span>Buy on Meesho</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
