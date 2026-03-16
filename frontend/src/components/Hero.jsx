import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0A192F]">

      {/* Custom Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero section.png"
          alt="SiviOn Global Tech"
          className="w-full h-full object-cover opacity-50 brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/40 to-[#0A192F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-20 text-center flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-300 tracking-wide">Premium IT & Digital Services</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-6 font-heading leading-[1.15]"
        >
          Empowering Businesses with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
            Smart IT & Digital Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
        >
          <strong className="text-white font-medium">SiviOn Global Technologies</strong> delivers reliable Java Full Stack Development, Website Development, and Digital Marketing Services to help businesses grow faster in the digital world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
        >
          <Link
            to="/get-quote"
            className="flex items-center justify-center px-6 py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group shadow-lg"
          >
            Get a Quote
            <Zap className="ml-2 w-5 h-5 text-sky-200 group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            to="/contact"
            className="flex items-center justify-center px-6 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/10 hover:border-sky-400/50 group"
          >
            Contact Us
            <ChevronRight className="ml-2 w-5 h-5 text-slate-400 group-hover:text-sky-400 transition-colors" />
          </Link>

          <Link
            to="/booking"
            className="flex items-center justify-center px-6 py-4 text-base md:text-lg font-semibold text-sky-400 transition-all duration-300 bg-sky-500/10 backdrop-blur-md rounded-xl border border-sky-500/30 hover:bg-sky-500/20 hover:text-white hover:border-sky-400 group shadow-[0_0_15px_rgba(0,216,255,0.1)]"
          >
            Book Consultation
          </Link>
        </motion.div>

        {/* Professional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto w-full border-t border-white/10 pt-10"
        >
          {[
            { label: 'Excellence Delivered', value: '150+' },
            { label: 'Enterprise Clients', value: '50+' },
            { label: 'Industry Awards', value: '12' },
            { label: 'Global Reach', value: '15+' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <h4 className="text-3xl md:text-5xl font-black text-white mb-2 font-heading tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-sky-300 transition-all">{stat.value}</h4>
              <p className="text-sm md:text-base text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
