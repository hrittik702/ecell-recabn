import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TeamCard from './TeamCard';
import { currentTeam, passoutSeniors } from '../data/constants';

const Team = () => {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter logic based on roles
  const filteredTeam = useMemo(() => {
    if (activeFilter === 'all') return { current: currentTeam, passout: passoutSeniors };
    if (activeFilter === 'former') return { current: [], passout: passoutSeniors };
    
    const filteredCurrent = currentTeam.filter(member => {
      const role = member.role.toLowerCase();
      if (activeFilter === 'executive') return role.includes('head') || role.includes('coord');
      if (activeFilter === 'media') return role.includes('pr') || role.includes('media') || role.includes('marketing');
      if (activeFilter === 'technical') return role.includes('technical') || role.includes('design');
      return true;
    });

    return { current: filteredCurrent, passout: [] };
  }, [activeFilter]);

  useGSAP(() => {
    gsap.fromTo('.team-header',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="team" className="py-24 relative z-10 bg-off-white dark:bg-transparent overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-purple-50 dark:bg-purple-500/5 rounded-full blur-3xl opacity-60 -z-10 -translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="team-header flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase mb-3 inline-block bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/20">
              People
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white tracking-tight">Meet the Team</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium text-balance">
            The dedicated individuals behind E-Cell REC Ambedkar Nagar—our student leaders, creators, and alumni.
          </p>
        </div>

        {/* Premium Pill-based Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Members' },
            { id: 'executive', label: 'Executive' },
            { id: 'media', label: 'Media & PR' },
            { id: 'technical', label: 'Technical & Design' },
            { id: 'former', label: 'Former Members' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-sans font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                activeFilter === filter.id 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white/60 backdrop-blur-3xl border border-white/50 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 dark:bg-dark-card dark:border-white/10 dark:text-gray-400 dark:hover:bg-dark-surface dark:hover:text-white dark:hover:border-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Team Grid */}
        <div className="min-h-[600px]">
          {filteredTeam.current.length > 0 && (
            <div className="mb-16 animate-fade-in">
              <div className="mb-6 flex items-center">
                <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white mr-4">Current Team</h3>
                <div className="flex-1 h-px bg-gray-200/80 dark:bg-white/10" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredTeam.current.map((member) => (
                  <TeamCard key={`current-${member.id}`} member={member} />
                ))}
              </div>
            </div>
          )}

          {filteredTeam.passout.length > 0 && (
            <div className="animate-fade-in">
              <div className="mb-6 flex items-center">
                <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white mr-4">Passout Seniors</h3>
                <div className="flex-1 h-px bg-gray-200/80 dark:bg-white/10" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredTeam.passout.map((member) => (
                  <TeamCard key={`former-${member.id}`} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Team;
