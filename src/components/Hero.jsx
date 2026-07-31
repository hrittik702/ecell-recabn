import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-headline', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
    )
    .fromTo('.hero-subtext', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
      '+=0.1'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="home" className="relative min-h-[95vh] pt-[20rem] sm:pt-[24rem] md:pt-[28rem] pb-16 md:pb-20 flex items-end justify-center text-center overflow-hidden">
      
      {/* Background Image Asset - Framed for Unobstructed Face Visibility */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero-bg.jpg" 
          alt="E-Cell REC Ambedkar Nagar Team at E-Summit" 
          className="w-full h-full object-cover object-[75%_20%] scale-105"
        />
        {/* Ultra-Minimal 0.5px Blur Black Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-black/40" 
          style={{ backdropFilter: 'blur(0.5px)', WebkitBackdropFilter: 'blur(0.5px)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto mb-2">
        
        {/* Muted White Headline with Minimal Drop Shadow for Contrast */}
        <div 
          className="hero-headline cursor-pointer select-none mb-8 font-display font-bold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.04] tracking-tight text-[#F4F4F6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] group"
        >
          {/* Line 1: VICHAR & AAKAR */}
          <div className="flex justify-center items-center gap-x-4 md:gap-x-10 mb-2">
            
            {/* VICHAR: Dual Layer Sweep */}
            <div className="relative inline-block">
              <span className="text-transparent [-webkit-text-stroke:2.5px_#F4F4F6]">
                VICHAR
              </span>
              <span 
                aria-hidden="true"
                className="absolute inset-0 text-[#F4F4F6] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] group-hover:[clip-path:polygon(100%_0,100%_0,100%_100%,100%_100%)]"
              >
                VICHAR
              </span>
            </div>

            {/* AAKAR: Dual Layer Sweep + Scaled */}
            <div className="relative inline-block transform scale-110">
              <span className="text-transparent [-webkit-text-stroke:2.5px_#F4F4F6]">
                AAKAR
              </span>
              <span 
                aria-hidden="true"
                className="absolute inset-0 text-[#F4F4F6] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] [clip-path:polygon(0_0,0_0,0_100%,0_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
              >
                AAKAR
              </span>
            </div>

          </div>

          {/* Line 2: SAAKAAR & BAAZAAR */}
          <div className="flex justify-center items-center gap-x-4 md:gap-x-10">
            
            {/* SAAKAAR: Dual Layer Sweep */}
            <div className="relative inline-block">
              <span className="text-transparent [-webkit-text-stroke:2.5px_#F4F4F6]">
                SAAKAAR
              </span>
              <span 
                aria-hidden="true"
                className="absolute inset-0 text-[#F4F4F6] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] group-hover:[clip-path:polygon(100%_0,100%_0,100%_100%,100%_100%)]"
              >
                SAAKAAR
              </span>
            </div>

            {/* BAAZAAR: Dual Layer Sweep + Scaled */}
            <div className="relative inline-block transform scale-110">
              <span className="text-transparent [-webkit-text-stroke:2.5px_#F4F4F6]">
                BAAZAAR
              </span>
              <span 
                aria-hidden="true"
                className="absolute inset-0 text-[#F4F4F6] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] [clip-path:polygon(0_0,0_0,0_100%,0_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
              >
                BAAZAAR
              </span>
            </div>

          </div>
        </div>

        {/* Sub-headline with Minimal Drop Shadow */}
        <p className="hero-subtext text-base sm:text-lg md:text-xl text-[#E5E7EB] mb-2 font-medium max-w-xl mx-auto font-sans leading-relaxed drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.8)]">
          Igniting the spirit of entrepreneurship and innovation at REC Ambedkar Nagar.
        </p>

      </div>
    </section>
  );
};

export default Hero;
