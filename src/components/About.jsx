import React, { useRef } from 'react';
import { Award, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { mentors } from '../data/constants';

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.about-header', 
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.about-card', 
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bento-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="py-24 relative z-10 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pixel-Perfect Aligned Section Header */}
        <div className="about-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
              ABOUT US
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">Who We Are</h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium">
            Fostering entrepreneurship and bridging the gap between student innovation and market execution.
          </p>
        </div>
        
        {/* Bento Box Layout */}
        <div className="bento-grid mb-20">
          
          {/* Main Mission Card - Large */}
          <div className="about-card bento-item-large bg-white border border-gray-200/80 rounded-xl p-8 md:p-12 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div>
              <div className="mb-6 inline-block">
                <span className="text-xs font-mono font-bold tracking-widest text-gray-600 uppercase border-b border-gray-300 pb-1">OUR MISSION</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">Bridging the gap between ideation and execution.</h3>
            </div>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-xl font-sans font-medium">
              To foster the entrepreneurial spirit among students and provide a robust platform for innovative
              ideas to flourish into successful, market-ready ventures. Supported & funded by <strong className="text-gray-900">Navsanchar Incubation and Center for Entrepreneurship Foundation (NICE)</strong>.
            </p>
          </div>

          {/* Vision Card - Tall */}
          <div className="about-card bento-item-tall rounded-xl p-8 md:p-12 bg-gray-900 text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="mb-6 inline-block">
                <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase border-b border-gray-700 pb-1">VISION 2026</span>
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 leading-tight text-white">Creating an ecosystem for the future.</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-base font-sans font-normal">
              We envision REC Ambedkar Nagar as a premier hub of cutting-edge startups and visionary leaders, where every student is empowered to build.
            </p>
          </div>

          {/* Stat 1 - National Rank */}
          <a href="https://www.ecell.in/nec/" target="_blank" rel="noreferrer" className="about-card block bg-white border border-gray-200/80 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md transition-all duration-300">
            <Trophy size={28} className="text-gray-800 mb-3" />
            <h4 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1 tracking-tight">#104</h4>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest font-sans">Rank Out of 4,000+ (IIT Bombay NEC)</p>
          </a>

          {/* Stat 2 - Fish Tank Top 5 */}
          <a href="https://www.ecell.in/nec/" target="_blank" rel="noreferrer" className="about-card block bg-white border border-gray-200/80 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md transition-all duration-300">
            <Award size={28} className="text-gray-800 mb-3" />
            <h4 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-1 tracking-tight">Top 5</h4>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest font-sans">Fish Tank National Finalist</p>
          </a>

        </div>

        {/* Precise Factual NEC Background Info */}
        <div className="border-t border-gray-200/80 pt-16 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
                NATIONAL FRAMEWORK
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                National Entrepreneurship Challenge (NEC)
              </h3>
              <p className="text-gray-600 font-sans leading-relaxed text-sm md:text-base">
                Organized by E-Cell IIT Bombay, NEC is a 6-month-long pan-India competition providing structured tasks that guide campus bodies in establishing and operating an active Entrepreneurship Cell. Over 600+ E-Cells have been established through this platform.
              </p>
            </div>
            <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-2xs font-sans">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                <span className="text-xs font-mono font-semibold text-gray-500 uppercase">Organized By</span>
                <span className="text-sm font-bold text-gray-900">E-Cell IIT Bombay</span>
              </div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                <span className="text-xs font-mono font-semibold text-gray-500 uppercase">Track Participation</span>
                <span className="text-sm font-bold text-gray-900">Advance Track</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-gray-500 uppercase">Pan-India Network</span>
                <span className="text-sm font-bold text-gray-900">600+ Established E-Cells</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Leadership & Incubation Guidance Section */}
        <div className="border-t border-gray-200/80 pt-16">
          <div className="mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-2 inline-block">
              INSTITUTIONAL PATRONS
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-bold text-gray-900">Leadership & Incubation Guidance</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mentors.map((mentor, index) => (
              <div key={index} className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-2xs">
                <span className="text-[11px] font-mono font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3 inline-block">
                  {mentor.tag}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-1 font-sans">{mentor.name}</h4>
                <p className="text-gray-600 text-sm font-medium font-sans">{mentor.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
