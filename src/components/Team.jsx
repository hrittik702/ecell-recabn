import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TeamCard from './TeamCard';
import { currentTeam, passoutSeniors } from '../data/constants';

const Team = () => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');

  useGSAP(() => {
    gsap.fromTo('.team-header',
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

    gsap.fromTo('.team-grid',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.team-header',
          start: 'top 75%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="team" className="py-24 relative z-10 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Pixel-Perfect Aligned Header */}
        <div className="team-header flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase border-b border-gray-300 pb-1 mb-3 inline-block">
              PEOPLE
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 tracking-tight">Our Team</h2>
          </div>
          <p className="text-gray-600 mt-4 md:mt-0 text-base md:text-lg max-w-md font-sans font-medium">
            The dedicated individuals behind E-Cell REC Ambedkar Nagar—our current student leaders and alumni.
          </p>
        </div>

        {/* Minimal Underline Tabs Aligned to Container */}
        <div className="flex justify-start items-center gap-8 border-b border-gray-200/80 mb-12">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-xs font-mono font-bold tracking-wider uppercase font-sans transition-all duration-200 ${activeTab === 'all' ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]' : 'text-gray-400 hover:text-gray-700'}`}
          >
            All Members
          </button>
          <button 
            onClick={() => setActiveTab('current')}
            className={`pb-3 text-xs font-mono font-bold tracking-wider uppercase font-sans transition-all duration-200 ${activeTab === 'current' ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]' : 'text-gray-400 hover:text-gray-700'}`}
          >
            Current Team
          </button>
          <button 
            onClick={() => setActiveTab('passout')}
            className={`pb-3 text-xs font-mono font-bold tracking-wider uppercase font-sans transition-all duration-200 ${activeTab === 'passout' ? 'border-b-2 border-gray-900 text-gray-900 -mb-[1px]' : 'text-gray-400 hover:text-gray-700'}`}
          >
            Passout Seniors
          </button>
        </div>
        
        {/* Current Year Team Section */}
        {(activeTab === 'all' || activeTab === 'current') && (
          <div className="mb-16">
            <div className="mb-6 pb-3 border-b border-gray-200/60">
              <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">Current Executive Team</h3>
            </div>

            <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentTeam.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Our Passout Seniors Section */}
        {(activeTab === 'all' || activeTab === 'passout') && (
          <div>
            <div className="mb-6 pb-3 border-b border-gray-200/60">
              <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">Our Passout Seniors</h3>
            </div>

            <div className="team-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {passoutSeniors.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Team;
