import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const events = [
  {
    id: 1,
    date: 'DEC 10–12, 2025',
    title: 'NEC Finals | Advance Track — IIT Bombay',
    description: 'Proudly represented REC Ambedkar Nagar at the National Entrepreneurship Challenge (NEC) at IIT Bombay. Secured Rank 104 out of 4,000+ national teams, Top-5 in Fish Tank, and Finalist in Corporate Duel & Deciphering the Labyrinth.',
    tag: 'NATIONAL MILESTONE',
    image: '/assets/nec 2026.png',
    gridClass: 'bento-item-large'
  },
  {
    id: 2,
    date: 'FEB 15, 2026',
    title: 'E-Summit 2026',
    description: 'The flagship entrepreneurship summit bringing together founders, investors, and students for networking and pitching.',
    tag: 'UPCOMING SUMMIT',
    gridClass: ''
  },
  {
    id: 3,
    date: 'MAR 10, 2026',
    title: 'Startup Expo & Pitch',
    description: 'Showcasing student startups and innovations to early adopters and angel networks.',
    tag: 'EXPOSITION',
    gridClass: ''
  }
];

const Events = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.events-header',
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

    gsap.fromTo('.event-card',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.events-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="events" className="py-24 relative z-10 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pixel-Perfect Aligned Header */}
        <div className="events-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
              MILESTONES & INITIATIVES
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">National Achievements & Events</h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium">
            Representing REC Ambedkar Nagar at national entrepreneurship challenges and hosting flagship summits.
          </p>
        </div>
        
        {/* Bento Grid */}
        <div className="events-grid bento-grid">
          {events.map((event) => (
            <div key={event.id} className={`event-card bg-white border border-gray-200/80 rounded-xl p-8 md:p-10 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 group ${event.gridClass}`}>
              
              {/* Top Row: High-Contrast Date Tag & NAKED Arrow Icon */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold tracking-widest text-gray-700 uppercase border-b border-gray-300 pb-1">
                    {event.date}
                  </span>
                  {/* Naked Arrow Icon with Translate Animation on Hover */}
                  <ArrowUpRight 
                    size={24} 
                    className="text-gray-400 group-hover:text-gray-900 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" 
                  />
                </div>

                {/* Card Banner Image if present */}
                {event.image && (
                  <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-lg bg-gray-100 mb-6 border border-gray-200/60">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" 
                    />
                  </div>
                )}

                {/* Internal Card Content */}
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-600 uppercase border border-indigo-100 bg-indigo-50/50 px-2 py-0.5 rounded mb-3 inline-block">
                    {event.tag}
                  </span>
                  <h3 className={`${event.gridClass ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'} font-display font-bold text-gray-900 mb-3 leading-tight`}>
                    {event.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base font-sans font-medium">
                    {event.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
