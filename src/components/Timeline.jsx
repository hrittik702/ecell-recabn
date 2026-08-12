import React, { useState, useRef, memo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Calendar, Target, CheckCircle2, Lightbulb, Clock, Check, AlertCircle, Timer, Gauge, FileText, ExternalLink } from 'lucide-react';
import { timelineData } from '../data/constants';

const calculateActiveIndex = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const index = timelineData.findIndex(item => new Date(item.isoDate) >= today);
  return index !== -1 ? index : timelineData.length - 1;
};

const ACTIVE_STEP_INDEX = calculateActiveIndex();

const getItemStatus = (index) => {
  if (index < ACTIVE_STEP_INDEX) return 'past';
  if (index === ACTIVE_STEP_INDEX) return 'current';
  return 'future';
};

const getStatusDetails = (status, date) => {
  if (status === 'past') return { color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400', label: 'Completed' };
  if (status === 'current') return { color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500', label: 'Active Stage' };
  return { color: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500', label: 'Upcoming' };
};

const TimelineNode = memo(({ item, index, status, isSelected, onClick }) => {
  const isPast = status === 'past';
  const isCurrent = status === 'current';

  // Contained S-Curve trajectory
  const sProgress = index / (timelineData.length - 1);
  const sCurveX = -Math.sin(sProgress * Math.PI * 2) * 60;

  return (
    <div
      onClick={() => onClick(index)}
      className={`relative cursor-pointer transition-all duration-300 group rounded-xl p-4 md:p-5 flex items-center justify-between border-t border-l border-r md:[transform-style:preserve-3d] shadow-sm hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 dark:shadow-premium-dark dark:hover:shadow-premium-dark-hover ${
        isSelected
          ? 'bg-white/60 backdrop-blur-3xl border-2 border-indigo-600 text-gray-900 shadow-md z-30 dark:bg-dark-card dark:text-white'
          : isCurrent
          ? 'bg-white/60 backdrop-blur-3xl border-2 border-emerald-500 text-gray-900 z-20 hover:border-indigo-400 dark:bg-dark-card dark:text-white dark:hover:border-indigo-500/30'
          : isPast
          ? 'bg-gray-50 border-white/50/60 text-gray-500 opacity-75 hover:opacity-100 hover:bg-white hover:border-indigo-300 dark:bg-dark-card/50 dark:border-white/5 dark:hover:bg-dark-surface dark:hover:border-indigo-500/30 dark:text-gray-400'
          : 'bg-white/60 backdrop-blur-3xl border-white/50 text-gray-800 hover:border-indigo-300 dark:bg-dark-card dark:border-white/10 dark:text-gray-300 dark:hover:bg-dark-surface dark:hover:border-indigo-500/30'
      }`}
      style={{
        '--curve-x': `${sCurveX}px`,
        '--curve-rot-x': '20deg',
        '--curve-rot-y': `${sCurveX * 0.08}deg`,
        transform: `translateX(var(--curve-x, 0)) rotateX(var(--curve-rot-x, 0)) rotateY(var(--curve-rot-y, 0))`
      }}
    >
      {/* 3D Slab Riser Edge */}
      <div 
        className={`hidden md:block absolute bottom-0 left-0 right-0 h-3 rounded-b-xl transition-colors ${
          isSelected 
            ? 'bg-indigo-900 border-t border-indigo-800' 
            : isCurrent 
            ? 'bg-emerald-600' 
            : 'bg-gray-200 border-t border-gray-300 group-hover:bg-indigo-100 dark:bg-white/10 dark:border-white/5'
        }`}
        style={{ transform: 'translateY(100%) rotateX(-90deg)', transformOrigin: 'top' }}
      />

      <div className="flex items-center space-x-4 z-10 w-full">
        {isCurrent ? (
          <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        ) : (
          <span className={`w-3 h-3 shrink-0 rounded-full transition-colors ${
            isSelected ? 'bg-indigo-600' : isPast ? 'bg-gray-300 group-hover:bg-indigo-400 dark:bg-gray-600' : 'bg-gray-800 group-hover:bg-indigo-500 dark:bg-gray-300'
          }`} />
        )}

        <div className="flex flex-col">
          <span className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 transition-colors ${
            isSelected ? 'text-indigo-600 dark:text-indigo-400' : isCurrent ? 'text-emerald-600 font-bold' : 'text-gray-500 group-hover:text-indigo-500 dark:text-gray-400 dark:group-hover:text-indigo-400'
          }`}>
            {item.date}
          </span>

          <span className={`text-sm md:text-base font-sans font-bold leading-tight transition-colors ${
            isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white'
          }`}>
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
});
TimelineNode.displayName = 'TimelineNode';

const Timeline = () => {
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(ACTIVE_STEP_INDEX);

  useGSAP(() => {
    gsap.fromTo('.timeline-header',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo('.staircase-wrapper',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.staircase-wrapper', start: 'top 80%' } }
    );
  }, { scope: containerRef });

  const activeEvent = timelineData[selectedIndex];
  const activeStatus = getItemStatus(selectedIndex);
  const statusConfig = getStatusDetails(activeStatus, activeEvent.date);

  const timelineStyle = `
    @media (max-width: 767px) {
      .timeline-node-container > div {
        --curve-x: 0px !important;
        --curve-rot-x: 0deg !important;
        --curve-rot-y: 0deg !important;
      }
    }
  `;

  return (
    <section ref={containerRef} id="timeline" className="py-24 relative z-10 bg-off-white dark:bg-transparent overflow-hidden">
      <style>{timelineStyle}</style>
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="timeline-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight">NEC 2026 Timeline</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium text-balance">
            Charting our key milestones through the National Entrepreneurship Challenge.
          </p>
        </div>

        <div className="staircase-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 relative md:min-h-[600px] flex items-center justify-center py-4">
            <div className="timeline-node-container w-full max-w-sm relative flex flex-col space-y-4 md:[perspective:1200px] md:[transform-style:preserve-3d]">
              {timelineData.map((item, index) => (
                <TimelineNode
                  key={index}
                  item={item}
                  index={index}
                  status={getItemStatus(index)}
                  isSelected={selectedIndex === index}
                  onClick={setSelectedIndex}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 sticky top-24">
            <div key={selectedIndex} className="animate-fade-slide bg-white/60 dark:bg-dark-surface/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-2xl p-8 md:p-10 shadow-premium dark:shadow-premium-dark flex flex-col transition-all duration-300 relative overflow-hidden">
              
              {activeStatus === 'current' && (
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              )}
              
              {/* --- HEADER --- */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`text-xs font-sans font-bold uppercase px-3 py-1.5 rounded-full flex items-center shadow-sm ${statusConfig.color}`}>
                  {activeStatus === 'current' ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-2 inline-block" />
                  ) : (
                    <span className={`w-2 h-2 rounded-full ${statusConfig.dot} mr-2 inline-block`} />
                  )}
                  {statusConfig.label}
                </span>

                <span className="flex items-center text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-3 py-1.5 rounded-full border border-white/50 dark:border-white/10">
                  <Calendar size={14} className="mr-1.5" />
                  {activeEvent.date}
                </span>
                
                {activeStatus === 'current' && (
                  <span className="flex items-center text-xs font-sans font-bold text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full ml-auto shadow-sm">
                    <Clock size={14} className="mr-1.5 animate-pulse" />
                    Urgent
                  </span>
                )}
              </div>

              <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {activeEvent.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 font-sans text-base leading-relaxed mb-8 font-medium pb-8 border-b border-gray-100 dark:border-white/10 text-balance">
                {activeEvent.desc}
              </p>

              {/* --- METADATA GRID --- */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-white/10 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"><Gauge size={12} className="mr-1" /> Difficulty</div>
                  <div className="text-sm font-sans font-bold text-gray-900 dark:text-white">{activeEvent.difficulty}</div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-white/10 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"><Timer size={12} className="mr-1" /> Est. Time</div>
                  <div className="text-sm font-sans font-bold text-gray-900 dark:text-white">{activeEvent.time}</div>
                </div>
                <div className="col-span-2 bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl p-4 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start text-[10px] font-bold text-indigo-500 uppercase tracking-wider mb-2"><Target size={12} className="mr-1" /> Expected Outcome</div>
                  <div className="text-sm font-sans font-bold text-indigo-900 dark:text-white">{activeEvent.outcome}</div>
                </div>
              </div>

              {/* --- WHY IT MATTERS --- */}
              <div className="mb-8">
                <h4 className="flex items-center text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
                  <Target size={18} className="text-indigo-600 mr-2" />
                  Why this matters
                </h4>
                <p className="text-gray-600 dark:text-gray-300 font-sans text-sm leading-relaxed">
                  {activeEvent.whyItMatters}
                </p>
              </div>

              {/* --- WHAT YOU NEED TO DO --- */}
              <div className="mb-8">
                <h4 className="flex items-center text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  <CheckCircle2 size={18} className="text-indigo-600 mr-2" />
                  Checklist
                </h4>
                <ul className="space-y-3">
                  {activeEvent.checklist.map((task, i) => (
                    <li key={i} className="flex items-start">
                      <div className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mr-3 shadow-sm">
                        <Check size={12} className="text-emerald-600 font-bold" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-sans text-sm font-medium">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sections removed for conciseness */}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Timeline;
