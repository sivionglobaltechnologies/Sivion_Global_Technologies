import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, linkTo, bgImage, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-panel p-8 rounded-3xl group relative overflow-hidden flex flex-col h-full bg-[#0A192F] border border-white/10"
    >
      {/* Dynamic Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
          <img src={bgImage} alt={title} className="w-full h-full object-cover mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-[#0A192F]/40" />
        </div>
      )}

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Icon */}
      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
        <Icon className="w-8 h-8 text-sky-400 group-hover:text-sky-300 group-hover:drop-shadow-[0_0_8px_rgba(0,216,255,0.8)] transition-all" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-slate-400 mb-8 leading-relaxed font-light">{description}</p>

        {linkTo && (
          <div className="mt-auto pt-4">
            <Link
              to={linkTo}
              className="inline-flex items-center text-sm font-semibold tracking-wide text-sky-400 hover:text-sky-300 transition-colors uppercase"
            >
              Explore Solution
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {/* Subtle border highlight on bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </motion.div>
  );
};

export default ServiceCard;
