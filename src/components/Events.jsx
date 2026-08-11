import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { eventsData as events } from '../data/constants';

const Events = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.events-header',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo('.event-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.events-grid', start: 'top 85%' } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="events" className="py-24 relative z-10 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="events-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-3 inline-block bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">National Achievements</h2>
          </div>
          <p className="text-gray-600 mt-6 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium text-balance">
            Representing REC Ambedkar Nagar at national entrepreneurship challenges and hosting flagship summits.
          </p>
        </div>
        
        {/* Bento Grid */}
        <div className="events-grid grid grid-cols-1 md:grid-cols-12 gap-6">
          {events.map((event, index) => {
            const isLarge = index === 0;
            const CardWrapper = event.link ? 'a' : 'article';
            const linkProps = event.link ? { href: event.link, target: '_blank', rel: 'noreferrer' } : {};

            return (
              <CardWrapper 
                key={event.id} 
                {...linkProps} 
                className={`event-card relative block rounded-3xl overflow-hidden group shadow-premium hover:shadow-premium-hover transition-all duration-500 ease-smooth hover:-translate-y-1 bg-white border border-gray-200/50 ${
                  isLarge ? 'md:col-span-12 min-h-[400px] md:min-h-[500px]' : 'md:col-span-6 min-h-[300px]'
                }`}
              >
                {/* Background Image (If Present) */}
                {event.image ? (
                  <div className="absolute inset-0 z-0 bg-[#0a0f1e]">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-smooth group-hover:scale-105" 
                    />
                    {/* Left-to-Right Gradient Overlay */}
                    <div 
                      className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none" 
                      style={{ background: 'linear-gradient(90deg, rgba(10,15,30,0.95) 0%, rgba(10,15,30,0.65) 45%, transparent 100%)' }}
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50 to-white opacity-50" />
                )}

                {/* Content Overlay */}
                <div className={`relative z-20 h-full flex flex-col justify-between p-8 md:p-10 ${event.image ? 'text-white md:w-3/4 lg:w-2/3' : 'text-gray-900'}`}>
                  
                  {/* Top: Date & Arrow */}
                  <div className="flex justify-between items-start w-full">
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border ${
                      event.image ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-100 border-gray-200 text-gray-600'
                    }`}>
                      {event.date}
                    </span>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 ${
                      event.image ? 'bg-white/10 border-white/20 text-white backdrop-blur-md' : 'bg-gray-100 border-gray-200 text-gray-900'
                    }`}>
                      <ArrowUpRight size={20} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom: Text Content */}
                  <div className="mt-auto pt-8">
                    <span className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-3 inline-block ${
                      event.image ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      {event.tag}
                    </span>
                    <h3 className={`${isLarge ? 'text-3xl md:text-[44px]' : 'text-2xl md:text-3xl'} font-display font-extrabold mb-4 leading-tight ${event.image ? 'text-white drop-shadow-md' : 'text-gray-900'}`}>
                      {event.title}
                    </h3>
                    <div className={event.image ? 'backdrop-blur-[2px] rounded-lg -mx-2 px-2' : ''}>
                      <p className={`text-base md:text-lg font-sans font-medium leading-relaxed max-w-2xl text-balance line-clamp-3 ${
                        event.image ? 'text-gray-200' : 'text-gray-600'
                      }`}>
                        {event.description}
                      </p>
                    </div>
                    
                    {event.link && (
                      <div className={`mt-6 inline-flex items-center text-sm font-bold tracking-wide transition-colors group/cta ${
                        event.image ? 'text-white hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                      }`}>
                        Explore Achievement <span className="ml-1 transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                        <div className={`absolute bottom-0 left-0 h-px transition-all duration-300 w-0 group-hover/cta:w-full ${
                          event.image ? 'bg-indigo-300' : 'bg-indigo-800'
                        }`} />
                      </div>
                    )}
                  </div>

                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;
