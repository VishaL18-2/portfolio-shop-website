import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { ExternalLink } from 'lucide-react';

// Custom SVGs for Tech Stack Icons
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5 text-[#61dafb] fill-none stroke-current stroke-[1.2]">
    <circle cx="0" cy="0" r="2.05"/>
    <ellipse rx="11" ry="4.2" transform="rotate(0)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 256 295" className="w-5 h-5 text-[#339933] fill-current">
    <path d="M141.6 20.3L237.7 76c9.3 5.4 15.1 15.3 15.1 26v111.4c0 10.7-5.8 20.6-15.1 26l-96.1 55.7c-9.3 5.4-20.9 5.4-30.2 0l-96.1-55.7C6 233.9.2 224 .2 213.3V101.9c0-10.7 5.8-20.6 15.1-26l96.1-55.7c9.3-5.3 20.9-5.3 30.2.1zM128 41.5c-3.1 0-6.2.8-8.8 2.3L23.1 99.5c-5.2 3-8.4 8.5-8.4 14.5v111.4c0 6 3.2 11.5 8.4 14.5l96.1 55.7c2.6 1.5 5.7 2.3 8.8 2.3s6.2-.8 8.8-2.3l96.1-55.7c5.2-3 8.4-8.5 8.4-14.5V114c0-6-3.2-11.5-8.4-14.5L136.8 43.8c-2.6-1.5-5.7-2.3-8.8-2.3zm0 55.4c17.5 0 31.7 14.2 31.7 31.7 0 17.5-14.2 31.7-31.7 31.7S96.3 146.1 96.3 128.6 110.5 96.9 128 96.9z"/>
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 256 597" className="w-5 h-5 text-[#47A248] fill-current">
    <path d="M128.7 0C128.7 0 94.6 137.9 94.6 226.7C94.6 307.7 131 386.4 131 386.4C131 386.4 167 310 167 226.7C167.1 138 128.7 0 128.7 0ZM131 405.3C131 405.3 80.6 480.9 80.6 525.8C80.6 570.6 128.8 596.2 128.8 596.2V405.3H131ZM128.7 405.3V596.2C128.7 596.2 176.9 570.6 176.9 525.8C176.9 480.9 128.7 405.3 128.7 405.3Z"/>
  </svg>
);

const GeneralIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold fill-none stroke-current stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const getTechIcon = (techName) => {
  switch (techName.toLowerCase()) {
    case 'react':
      return <ReactIcon />;
    case 'node.js':
    case 'node':
      return <NodeIcon />;
    case 'mongodb':
    case 'mongo':
      return <MongoIcon />;
    default:
      return <GeneralIcon />;
  }
};

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gold/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold block mb-3">
            Creative Portfolio
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-dark-grey font-normal tracking-wide">
            MERN Stack Creations
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col justify-between h-full p-6 sm:p-8 bg-cream border border-gold/10 hover:border-gold transition-all duration-500 luxury-border-draw relative overflow-hidden"
            >
              <div>
                {/* Visual Image container with overlay */}
                <div className="relative aspect-video w-full overflow-hidden mb-6 bg-dark-grey/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark-grey/25 opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                {/* Project Header */}
                <h3 className="font-serif text-xl md:text-2xl text-dark-grey mb-3 font-normal tracking-wide group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-xs sm:text-sm text-dark-grey/70 leading-relaxed mb-6 font-light">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Icons & Labels */}
                <div className="mb-6 flex flex-wrap gap-4 items-center">
                  <div className="flex -space-x-1">
                    {project.tech.map((t) => (
                      <div
                        key={t}
                        title={t}
                        className="w-8 h-8 rounded-full bg-white border border-gold/15 flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-110 hover:z-10"
                      >
                        {getTechIcon(t)}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-dark-grey/40 font-light">
                    MERN Stack Built
                  </span>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 py-3 border border-dark-grey/15 text-dark-grey text-xs uppercase tracking-widest hover:border-gold hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium ${
                      project.githubLink ? 'w-1/2' : 'w-full'
                    }`}
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 flex items-center justify-center space-x-2 py-3 border border-gold text-dark-grey text-xs uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 font-medium"
                    >
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
