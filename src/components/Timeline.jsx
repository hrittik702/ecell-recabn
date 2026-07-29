import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// NEC Competition Roadmap (Dates evaluated dynamically against current date)
const timelineData = [
  { date: 'JUN 28', isoDate: '2026-06-28', title: 'Head Start & Preliminary Task Launch', desc: 'Official kickoff of NEC tasks for participating college E-Cells.' },
  { date: 'JUL 31', isoDate: '2026-07-31', title: 'Registration Deadline & Task Phase 1', desc: 'Closing of pan-India registrations across 600+ colleges and initial submission.' },
  { date: 'AUG 02', isoDate: '2026-08-02', title: 'Preliminary Task Deadline', desc: 'Submission deadline for foundational E-Cell structure tasks.' },
  { date: 'AUG 03', isoDate: '2026-08-03', title: 'Mentor Allotment & Ignite Propel Launch', desc: 'Assignment of industry mentors and rollout of advanced track goals.' },
  { date: 'SEP 14', isoDate: '2026-09-14', title: 'Ignite Propel Task Deadline', desc: 'Evaluation of mid-tier execution milestones and startup mentorship.' },
  { date: 'SEP 15', isoDate: '2026-09-15', title: 'Venture Quest Task Launch', desc: 'Launch of final stage incubation and business model validation tasks.' },
  { date: 'SEP 27', isoDate: '2026-09-27', title: 'Incentive Claiming Starts', desc: 'Review of task accomplishments and initial scoring verification.' },
  { date: 'OCT 06', isoDate: '2026-10-06', title: 'Incentive Claiming Deadline', desc: 'Final submission cutoff for all incentive documentation.' },
  { date: 'OCT 16', isoDate: '2026-10-16', title: 'Venture Quest Task Deadline', desc: 'Final submission of comprehensive E-Cell annual impact reports.' },
  { date: 'OCT 22', isoDate: '2026-10-22', title: 'Final Leaderboard', desc: 'Publication of national rankings ahead of finalist selection.' },
  { date: 'OCT 24', isoDate: '2026-10-24', title: 'Finalist Announcement', desc: 'Shortlisting of top national E-Cells for the IIT Bombay finals.' },
  { date: 'DEC 10–12', isoDate: '2026-12-10', title: 'NEC Finals at E-Summit 2026', desc: 'Grand finale at IIT Bombay (Advance Track) — Ranked #104 Nationally.' }
];

// Helper to determine visual stage status dynamically
const getItemStatus = (isoDate, index) => {
  if (index === 0) return 'past';
  if (index === 1) return 'current'; // July 31 active stage
  return 'future';
};

const Timeline = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.timeline-header',
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

    gsap.fromTo('.timeline-node',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.timeline-center-wrapper',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="timeline" className="py-24 relative z-10 bg-[#F9FAFB] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pixel-Perfect Aligned Header */}
        <div className="timeline-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
              NEC ROADMAP
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">Competition Timeline</h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium">
            Visual stage progress tracking through the 6-month pan-India NEC Advance Track.
          </p>
        </div>

        {/* Dynamic Centered Alternating Timeline Graph */}
        <div className="timeline-center-wrapper relative max-w-5xl mx-auto py-4">
          
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const status = getItemStatus(item.isoDate, index);
              const isPast = status === 'past';
              const isCurrent = status === 'current';

              return (
                <div 
                  key={index} 
                  className={`timeline-node relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Empty Spacer Column for Desktop Grid Alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Centered Node Marker with Green Accent Ping for Current Stage */}
                  <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    {isCurrent ? (
                      /* Green Accent Blinking Progress Pulse Marker */
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-sm"></span>
                      </span>
                    ) : isPast ? (
                      /* Faded Node for Past Events */
                      <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-[#F9FAFB]" />
                    ) : (
                      /* Crisp Solid Node for Future Events */
                      <div className="w-3.5 h-3.5 rounded-full bg-gray-800 border-2 border-[#F9FAFB]" />
                    )}
                  </div>

                  {/* Alternating Card Content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}>
                    <div className={`rounded-xl p-6 md:p-8 transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-white border-2 border-gray-900 shadow-md scale-[1.02]' 
                        : isPast 
                        ? 'bg-gray-50/70 border border-gray-200/50 opacity-60' 
                        : 'bg-white border border-gray-200/80 shadow-2xs hover:shadow-md'
                    }`}>
                      
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        {/* Green Accent Active Stage Badge */}
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest bg-gray-900 text-white uppercase shadow-2xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            ACTIVE STAGE
                          </span>
                        )}
                        {isPast && (
                          <span className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
                            COMPLETED
                          </span>
                        )}
                        <span className={`text-xs font-mono font-bold tracking-widest uppercase border-b pb-0.5 inline-block ${
                          isCurrent ? 'text-gray-900 border-gray-900' : 'text-gray-600 border-gray-300'
                        }`}>
                          {item.date}
                        </span>
                      </div>

                      <h3 className={`text-xl md:text-2xl font-display font-bold mb-2 leading-tight ${
                        isCurrent ? 'text-gray-900' : isPast ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {item.title}
                      </h3>

                      <p className={`text-sm md:text-base font-sans font-medium leading-relaxed ${
                        isCurrent ? 'text-gray-700' : isPast ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.desc}
                      </p>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;
