import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Calendar } from 'lucide-react';

const timelineData = [
  { date: 'JUN 28', isoDate: '2026-06-28', title: 'Head Start & Preliminary Launch', desc: 'Official kickoff of NEC tasks for participating college E-Cells across India.' },
  { date: 'JUL 31', isoDate: '2026-07-31', title: 'Registration & Task Phase 1', desc: 'Closing of pan-India registrations across 600+ colleges and initial submission.' },
  { date: 'AUG 02', isoDate: '2026-08-02', title: 'Preliminary Task Deadline', desc: 'Submission deadline for foundational E-Cell structure tasks.' },
  { date: 'AUG 03', isoDate: '2026-08-03', title: 'Mentor Allotment & Ignite Propel', desc: 'Assignment of industry mentors and rollout of advanced track goals.' },
  { date: 'SEP 14', isoDate: '2026-09-14', title: 'Ignite Propel Task Deadline', desc: 'Evaluation of mid-tier execution milestones and startup mentorship.' },
  { date: 'SEP 15', isoDate: '2026-09-15', title: 'Venture Quest Task Launch', desc: 'Launch of final stage incubation and business model validation tasks.' },
  { date: 'SEP 27', isoDate: '2026-09-27', title: 'Incentive Claiming Starts', desc: 'Review of task accomplishments and initial scoring verification.' },
  { date: 'OCT 06', isoDate: '2026-10-06', title: 'Incentive Claiming Deadline', desc: 'Final submission cutoff for all incentive documentation.' },
  { date: 'OCT 16', isoDate: '2026-10-16', title: 'Venture Quest Task Deadline', desc: 'Final submission of comprehensive E-Cell annual impact reports.' },
  { date: 'OCT 22', isoDate: '2026-10-22', title: 'Final Leaderboard Publication', desc: 'Publication of national rankings ahead of finalist selection.' },
  { date: 'OCT 24', isoDate: '2026-10-24', title: 'Finalist Announcement', desc: 'Shortlisting of top national E-Cells for the IIT Bombay finals.' },
  { date: 'DEC 10–12', isoDate: '2026-12-10', title: 'NEC Finals at E-Summit 2026', desc: 'Grand finale at IIT Bombay (Advance Track) — Ranked #104 Nationally.' }
];

const getItemStatus = (index) => {
  if (index === 0) return 'past';
  if (index === 1) return 'current'; // July 31 active stage
  return 'future';
};

const Timeline = () => {
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

    gsap.fromTo('.staircase-wrapper',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.staircase-wrapper',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const activeEvent = timelineData[activeIndex];
  const activeStatus = getItemStatus(activeIndex);

  return (
    <section ref={containerRef} id="timeline" className="py-24 relative z-10 bg-[#F9FAFB] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="timeline-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
              ROADMAP
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">NEC 2026 Timeline</h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium">
            Charting our key milestones through the National Entrepreneurship Challenge.
          </p>
        </div>

        {/* 2-Column Balanced Layout (Reversed Staircase Order Top-to-Bottom) */}
        <div className="staircase-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3D Perspective Curved Staircase (6 Cols) */}
          <div className="lg:col-span-6 relative min-h-[540px] flex items-center justify-center py-4">
            
            {/* Reversed Order Container: Step #1 at Top down to Step #12 at Bottom */}
            <div className="w-full max-w-md relative flex flex-col space-y-3.5 [perspective:1200px] [transform-style:preserve-3d]">
              {timelineData.map((item, index) => {
                const status = getItemStatus(index);
                const isPast = status === 'past';
                const isCurrent = status === 'current';
                const isHovered = hoveredIndex === index;
                const isPinned = selectedIndex === index && hoveredIndex === null;

                // Contained S-Curve trajectory (Max 60px curve for clean column separation)
                const sProgress = index / (timelineData.length - 1);
                const sCurveX = -Math.sin(sProgress * Math.PI * 2) * 60;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative cursor-pointer transition-all duration-300 group rounded-lg p-3 md:p-3.5 flex items-center justify-between border-t border-l border-r [transform-style:preserve-3d] ${
                      isHovered
                        ? 'bg-gray-900 text-white border-gray-900 shadow-2xl z-40 -translate-y-2 scale-[1.04]'
                        : isPinned
                        ? 'bg-white border-2 border-gray-900 text-gray-900 shadow-md z-30'
                        : isCurrent
                        ? 'bg-white border-2 border-emerald-500 text-gray-900 z-20 shadow-sm'
                        : isPast
                        ? 'bg-gray-100/80 border-gray-200/60 text-gray-400 opacity-60 hover:opacity-100'
                        : 'bg-white border-gray-200/80 text-gray-800 shadow-2xs hover:border-gray-400'
                    }`}
                    style={{
                      transform: `translateX(${sCurveX}px) rotateX(20deg) rotateY(${sCurveX * 0.08}deg) ${
                        isHovered ? 'translateZ(20px)' : ''
                      }`,
                    }}
                  >
                    {/* 3D Slab Riser Edge */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 h-3 rounded-b-lg transition-colors ${
                        isHovered 
                          ? 'bg-gray-950 border-t border-gray-800' 
                          : isCurrent 
                          ? 'bg-emerald-600' 
                          : 'bg-gray-200 border-t border-gray-300'
                      }`}
                      style={{ transform: 'translateY(100%) rotateX(-90deg)', transformOrigin: 'top' }}
                    />

                    {/* Step Content */}
                    <div className="flex items-center space-x-3 z-10">
                      {isCurrent ? (
                        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                      ) : (
                        <span className={`w-2 h-2 rounded-full ${
                          isHovered ? 'bg-emerald-400' : isPast ? 'bg-gray-300' : 'bg-gray-800'
                        }`} />
                      )}

                      <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isHovered ? 'text-emerald-400' : isCurrent ? 'text-emerald-600 font-bold' : 'text-gray-500'
                      }`}>
                        {item.date}
                      </span>

                      <span className="text-sm font-sans font-bold truncate max-w-[150px] sm:max-w-[200px]">
                        {item.title}
                      </span>
                    </div>

                    {/* Milestone Number Tag */}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold z-10 ${
                      isHovered ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      #{index + 1}
                    </span>

                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Active Milestone Panel (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-gray-200/80 rounded-xl p-8 md:p-10 shadow-md min-h-[420px] flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
              
              {activeStatus === 'current' && (
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <span className={`text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                    activeStatus === 'current'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1.5'
                      : activeStatus === 'past'
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-gray-900 text-white'
                  }`}>
                    {activeStatus === 'current' && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1.5" />}
                    {activeStatus === 'current' ? 'ACTIVE STAGE' : activeStatus === 'past' ? 'COMPLETED' : 'UPCOMING'}
                  </span>

                  <span className="text-xs font-mono font-bold text-gray-500">
                    MILESTONE #{activeIndex + 1} OF 12
                  </span>
                </div>

                {/* Date Highlight */}
                <div className="flex items-center space-x-2 text-gray-500 mb-3">
                  <Calendar size={16} />
                  <span className="text-sm font-mono font-bold tracking-wider uppercase text-gray-700">
                    {activeEvent.date}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-4 leading-tight">
                  {activeEvent.title}
                </h3>

                {/* Event Description */}
                <p className="text-gray-600 font-sans text-base leading-relaxed mb-6 font-medium">
                  {activeEvent.desc}
                </p>
              </div>

              {/* Footer Guidance */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono font-medium text-gray-400">
                <span>Select any milestone to view details</span>
                <ArrowRight size={16} className="text-gray-400" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;
