import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);
  const [isShifted, setIsShifted] = useState(false);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-tag',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.hero-headline', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '+=0.1'
    )
    .fromTo('.hero-subtext', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
      '+=0.1'
    )
    .fromTo('.hero-cta', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'transform' }, 
      '+=0.1'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="home" className="relative min-h-[85vh] pt-44 md:pt-52 pb-32 md:pb-40 flex items-center justify-center text-center bg-[#F9FAFB] overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto">
        
        {/* Monospaced Tag */}
        <div className="hero-tag mb-8 inline-block">
          <span className="text-xs font-mono font-semibold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1">
            E-CELL REC ABN
          </span>
        </div>

        {/* Powerful Laser Clip-Path Wipe & State-Shifting Headline */}
        <div 
          className="hero-headline cursor-pointer select-none mb-12 font-display font-bold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-[6.25rem] leading-[1.04] tracking-tight"
          onMouseEnter={() => setIsShifted(true)}
          onMouseLeave={() => setIsShifted(false)}
        >
          {/* Line 1: VICHAR & AAKAR */}
          <div className="flex justify-center items-center gap-x-4 md:gap-x-10 mb-3">
            
            {/* VICHAR: Dual Layer Sweep */}
            <div className="relative inline-block">
              {/* Base Outlined Layer */}
              <span className="text-transparent [-webkit-text-stroke:2.5px_#111827]">
                VICHAR
              </span>
              {/* Top Solid Layer (Sweeps out on shift) */}
              <span 
                className="absolute inset-0 text-gray-900 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
                style={{
                  clipPath: isShifted ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                VICHAR
              </span>
            </div>

            {/* AAKAR: Dual Layer Sweep + Scaled */}
            <div className="relative inline-block transform scale-110">
              {/* Base Outlined Layer */}
              <span className="text-transparent [-webkit-text-stroke:2.5px_#111827]">
                AAKAR
              </span>
              {/* Top Solid Layer (Sweeps in on shift) */}
              <span 
                className="absolute inset-0 text-gray-900 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
                style={{
                  clipPath: isShifted ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                }}
              >
                AAKAR
              </span>
            </div>

          </div>

          {/* Line 2: SAAKAAR & BAAZAAR */}
          <div className="flex justify-center items-center gap-x-4 md:gap-x-10">
            
            {/* SAAKAAR: Dual Layer Sweep */}
            <div className="relative inline-block">
              {/* Base Outlined Layer */}
              <span className="text-transparent [-webkit-text-stroke:2.5px_#111827]">
                SAAKAAR
              </span>
              {/* Top Solid Layer (Sweeps out on shift) */}
              <span 
                className="absolute inset-0 text-gray-900 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
                style={{
                  clipPath: isShifted ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                SAAKAAR
              </span>
            </div>

            {/* BAAZAAR: Dual Layer Sweep + Scaled */}
            <div className="relative inline-block transform scale-110">
              {/* Base Outlined Layer */}
              <span className="text-transparent [-webkit-text-stroke:2.5px_#111827]">
                BAAZAAR
              </span>
              {/* Top Solid Layer (Sweeps in on shift) */}
              <span 
                className="absolute inset-0 text-gray-900 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
                style={{
                  clipPath: isShifted ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
                }}
              >
                BAAZAAR
              </span>
            </div>

          </div>
        </div>

        {/* Sub-headline */}
        <p className="hero-subtext text-base sm:text-lg md:text-xl text-gray-600 mb-10 font-medium max-w-xl mx-auto font-sans leading-relaxed">
          Igniting the spirit of entrepreneurship and innovation at REC Ambedkar Nagar.
        </p>

        {/* Corporate Rectangular CTA Button */}
        <div className="hero-cta">
          <a 
            href="#contact" 
            className="inline-block px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-sans font-medium text-sm tracking-wide transition-colors duration-200 shadow-sm hover:scale-[1.02]"
          >
            Join the Movement
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
