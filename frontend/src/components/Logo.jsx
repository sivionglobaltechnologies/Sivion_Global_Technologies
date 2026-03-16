import React from 'react';

const Logo = ({ className = "h-8" }) => (
  <div className={`flex items-center gap-2.5 group ${className}`}>
    <div className="relative flex items-center justify-center">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform group-hover:scale-105 transition-transform duration-300">
        {/* Modern Corporate Hexagon */}
        <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" fill="url(#gradOuter)" fillOpacity="0.15" stroke="url(#gradOuter)" strokeWidth="2"/>
        <path d="M18 8L25 12V24L18 28L11 24V12L18 8Z" fill="url(#gradInner)"/>
        
        <defs>
          <linearGradient id="gradOuter" x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6"/>
            <stop offset="1" stopColor="#00D8FF"/>
          </linearGradient>
          <linearGradient id="gradInner" x1="11" y1="8" x2="25" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00D8FF"/>
            <stop offset="1" stopColor="#1E3A8A"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <span className="text-2xl font-extrabold font-heading text-white tracking-tight">
      Sivi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">On</span>
    </span>
  </div>
);

export default Logo;
