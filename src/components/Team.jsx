import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TeamCard from './team/TeamCard';
import ConstellationDivider from './team/ConstellationDivider';
import { getAllTeamMembers } from '../firebase/db';
import {
  ecellMembers as defaultEcellMembers,
  alumniTeam as defaultAlumniTeam
} from '../data/constants';

const sortByYearAndRank = (list) => {
  return [...list].sort((a, b) => {
    const yearA = parseInt(a.year || 0);
    const yearB = parseInt(b.year || 0);
    if (yearB !== yearA) return yearB - yearA; // 4th Year -> 3rd Year -> 2nd Year -> 1st Year
    return (a.name || '').localeCompare(b.name || '');
  });
};

const Team = () => {
  const containerRef = useRef(null);
  const [teamData, setTeamData] = useState({
    members: sortByYearAndRank(defaultEcellMembers),
    alumni: sortByYearAndRank(defaultAlumniTeam)
  });

  useEffect(() => {
    let isMounted = true;
    const fetchRemoteTeam = async () => {
      try {
        const remoteMembers = await getAllTeamMembers();
        if (!isMounted || !remoteMembers || remoteMembers.length === 0) return;

        const members = [];
        const alumni = [];

        remoteMembers
          .filter(m => {
            const role = (m.role || '').toLowerCase();
            const sysRole = (m.systemRole || '').toLowerCase();
            return role !== 'admin' && sysRole !== 'admin';
          })
          .forEach(m => {
            const name = (m.name || '').toLowerCase();
            const formatted = {
              ...m,
              image: m.profileImage || m.image || (name.includes('arpita') ? '/assets/arpita.png' : '')
            };
            const role = (m.role || '').toLowerCase();
            const status = (m.status || '').toLowerCase();
            const yearStr = String(m.year || '').toLowerCase();
            const y = parseInt(m.year);

            // Strict Alumni check: only genuine passouts / alumni
            // (Year >= 5, or status === 'alumni' / 'passout', or founding leaders Khushi / Gunjan)
            const isGenuineAlumni = 
              y >= 5 ||
              y === 6 ||
              status === 'alumni' ||
              status === 'passout' ||
              yearStr.includes('alumni') ||
              yearStr.includes('passout') ||
              name.includes('khushi') ||
              name.includes('gunjan');

            if (isGenuineAlumni) {
              alumni.push(formatted);
            } else {
              // All active 1st, 2nd, 3rd, 4th year members belong to E-Cell Members
              members.push(formatted);
            }
          });

        if (members.length > 0 || alumni.length > 0) {
          setTeamData({
            members: members.length > 0 ? sortByYearAndRank(members) : sortByYearAndRank(defaultEcellMembers),
            alumni: alumni.length > 0 ? sortByYearAndRank(alumni) : sortByYearAndRank(defaultAlumniTeam)
          });
        }
      } catch (err) {
        console.warn("Using curated team records:", err);
      }
    };

    fetchRemoteTeam();
    return () => { isMounted = false; };
  }, []);

  useGSAP(() => {
    gsap.fromTo('.team-main-header',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
    );

    gsap.fromTo('.team-section-block',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.team-section-block', start: 'top 85%' } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="team" className="py-24 md:py-32 relative z-10 bg-off-white dark:bg-transparent overflow-hidden">
      {/* Subtle Atmospheric Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] dark:bg-white/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Master Header */}
        <div className="team-main-header flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6 border-b border-gray-200/80 dark:border-white/10 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-700 dark:text-zinc-300 uppercase mb-3 inline-block bg-gray-100 dark:bg-white/[0.06] px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
              Community & Leadership
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
              The Team
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-md font-sans font-medium text-balance">
            The builders, organizers, and innovators driving the entrepreneurial ecosystem at REC Ambedkar Nagar.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 01. E-CELL MEMBERS (ALL ACTIVE MEMBERS RANKED BY YEAR)     */}
        {/* ========================================================= */}
        <div className="team-section-block mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
                  01 / TEAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-300" />
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                E-Cell Members
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-sans max-w-md font-medium">
              The student leaders, developers, and coordinators powering initiatives across our ecosystem.
            </p>
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {teamData.members.map((member) => (
              <TeamCard key={`member-${member.id || member.name}`} member={member} isAlumni={false} />
            ))}
          </div>
        </div>

        {/* Constellation Divider */}
        <ConstellationDivider />

        {/* ========================================================= */}
        {/* 02. ALUMNI (THE FOUNDATION & PASSOUT SENIORS)             */}
        {/* ========================================================= */}
        <div className="team-section-block">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-amber-700 dark:text-amber-400/90 uppercase mb-2 inline-block">
                02 / ALUMNI
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
                The Foundation
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-sans max-w-md font-medium">
              Honoring the past leaders and mentors who shaped the foundation of E-Cell REC ABN.
            </p>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {teamData.alumni.map((member) => (
              <TeamCard key={`alumni-${member.id || member.name}`} member={member} isAlumni={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
