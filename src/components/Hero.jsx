import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const StatCounter = ({ endValue, suffix, label, delay }) => {
  const [value, setValue] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration: 2,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 90%',
      },
      onUpdate: () => setValue(Math.round(obj.val))
    });
  }, [endValue, delay]);

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <div className="text-2xl md:text-4xl font-display font-bold text-white mb-1">
        {value}{suffix}
      </div>
      <div className="text-xs md:text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Parallax background
    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Staggered text reveal
    tl.fromTo('.hero-badge', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.hero-title-line', 
      { y: 40, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo('.hero-subtext', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.4'
    )
    .fromTo('.hero-actions', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
      '-=0.4'
    )
    .fromTo('.hero-stats', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.2'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex flex-col items-center justify-end pt-32 pb-24 md:pb-32 overflow-hidden md:[perspective:1000px]">
      
      {/* Parallax Background Asset */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-charcoal dark:bg-transparent">
        {/* Premium Layered Gradient Overlay (Light Mode Only) */}
        <div 
          className="absolute inset-0 dark:hidden"
          style={{ background: 'linear-gradient(180deg, rgba(8,12,24,0.18) 0%, rgba(8,12,24,0.22) 35%, rgba(8,12,24,0.45) 100%)' }}
        />
        {/* Subtle bottom gradient to blend into next section in dark mode */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/90" />
        
        {/* Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-indigo-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none md:mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 mx-auto flex flex-col items-center text-center mt-12 md:mt-auto">
        
        {/* Premium Typography Headline */}
        <h1 
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1.1] tracking-tight text-white mb-8 max-w-4xl md:[transform-style:preserve-3d]"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
        >
          <div className="hero-title-line">Vichar Aakar</div>
          <div className="hero-title-line text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm">
            Sakar Bazar
          </div>
        </h1>

        {/* Refined Subtext */}
        <p 
          className="hero-subtext text-lg md:text-xl text-gray-200 mb-12 font-medium max-w-[650px] mx-auto font-sans leading-relaxed text-balance"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.25)' }}
        >
          Fostering entrepreneurship and innovation at REC Ambedkar Nagar. Join the network of visionary students building the future.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions flex flex-col sm:flex-row items-center gap-4 mb-12 md:mb-20 w-full sm:w-auto">
          <a 
            href="#about" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-900 font-sans font-bold text-base hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group"
          >
            Discover More
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#timeline" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 md:backdrop-blur-md border border-white text-white font-sans font-bold text-base hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
          >
            Explore Timeline
          </a>
        </div>

        {/* Animated Statistics */}
        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-12 border-t border-white/10 w-full max-w-4xl">
          <StatCounter endValue={600} suffix="+" label="Colleges" delay={0.6} />
          <StatCounter endValue={104} suffix="" label="National Rank" delay={0.7} />
          <StatCounter endValue={5000} suffix="+" label="Students" delay={0.8} />
          <StatCounter endValue={20} suffix="+" label="Events" delay={0.9} />
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
