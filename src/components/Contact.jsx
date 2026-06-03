import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      const text = `Hi! I would like to make an inquiry via your portfolio website.\n\n` +
                   `👤 *Name:* ${form.name}\n` +
                   `✉️ *Email:* ${form.email}\n` +
                   `📝 *Details:* ${form.message}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      
      window.open(url, '_blank');
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Pre-configured WhatsApp Redirect Link
  const whatsappNumber = "919173489933"; // User's WhatsApp number with country code
  const whatsappMessage = encodeURIComponent("Hi! I came across your portfolio website and would love to discuss a freelance project / ethnic jewelry from K & K Enterprises.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gold/10"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-3 animate-pulse">
            Available for Freelance Projects
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-dark-grey font-normal tracking-wide">
            Let's Collaborate
          </h2>
          <p className="text-xs md:text-sm text-dark-grey/60 max-w-sm mx-auto mt-4 font-light leading-relaxed">
            Have a project in mind or an inquiry for jewelry? Drop a message below or contact me directly via WhatsApp.
          </p>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Contact Details & WhatsApp Redirect */}
          <div className="md:col-span-5 flex flex-col justify-between h-full bg-cream border border-gold/15 p-8">
            <div>
              <h3 className="font-serif text-xl text-dark-grey mb-4 font-normal tracking-wide">
                Direct Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-dark-grey/70 leading-relaxed font-light mb-8">
                I am currently open to freelance contracts, consulting, and custom jewelry requests. Let's create something extraordinary.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">Office Location</h4>
                  <p className="text-xs sm:text-sm text-dark-grey/80 font-light">Bilimora, Gujarat</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-1">Email inquiries</h4>
                  <p className="text-xs sm:text-sm text-dark-grey/80 font-light">kkenterprisesdev@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-widest transition-all duration-300 font-semibold shadow-xs"
              >
                <MessageSquare size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7 bg-cream border border-gold/15 p-8">
            <h3 className="font-serif text-xl text-dark-grey mb-6 font-normal tracking-wide">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-dark-grey/60 mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gold/15 text-dark-grey text-sm focus:outline-none focus:border-gold transition-colors duration-300 font-light"
                  placeholder="e.g., Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-dark-grey/60 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gold/15 text-dark-grey text-sm focus:outline-none focus:border-gold transition-colors duration-300 font-light"
                  placeholder="e.g., jane@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-dark-grey/60 mb-2 font-medium">Project details</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gold/15 text-dark-grey text-sm focus:outline-none focus:border-gold transition-colors duration-300 resize-none font-light"
                  placeholder="Tell me about your freelance project or jewelry inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-dark-grey text-cream text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium"
              >
                <Send size={12} />
                <span>Submit Inquiry</span>
              </button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gold/10 border border-gold text-dark-grey text-xs text-center"
              >
                Thank you! Your inquiry has been sent. I will get back to you shortly.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
