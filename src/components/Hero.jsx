import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);
  
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
      <div className="relative z-10 w-full max-w-4xl px-6 mx-auto">
        
        {/* Monospaced Tag */}
        <div className="hero-tag mb-8 inline-block">
          <span className="text-xs font-mono font-semibold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1">
            E-CELL REC ABN
          </span>
        </div>

        {/* Un-distorted Editorial Display Headline (Playfair Display font - Natural Aspect Ratio) */}
        <h1 className="hero-headline text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight text-gray-900 mb-8 leading-[1.08] mx-auto">
          VICHAR AAKAR <br /> SAAKAAR BAAZAAR
        </h1>

        {/* Strictly Constrained Sub-headline (max-w-xl for clean 2-line wrap) */}
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
