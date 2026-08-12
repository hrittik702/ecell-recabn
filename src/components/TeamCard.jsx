import React, { useState } from 'react';
import { Instagram, Linkedin, Globe, User } from 'lucide-react';

const getRoleDescription = (role) => {
  const r = role.toLowerCase();
  if (r.includes('corporate') || r.includes('relational')) return "Building strategic partnerships and managing institutional relations.";
  if (r.includes('event')) return "Orchestrating impactful events and leading public relations.";
  if (r.includes('media')) return "Driving media presence and crafting compelling digital narratives.";
  if (r.includes('design')) return "Crafting visually stunning designs and maintaining brand identity.";
  if (r.includes('tech')) return "Architecting digital solutions and leading technical initiatives.";
  if (r.includes('operation')) return "Ensuring smooth execution of daily operations and logistics.";
  if (r.includes('marketing')) return "Strategizing campaigns to boost outreach and engagement.";
  if (r.includes('outreach')) return "Expanding our network and coordinating external communications.";
  if (r.includes('former')) return "A guiding force who helped shape the foundation of E-Cell.";
  return `Leading the ${r.replace(' head', '').replace(' lead', '')} initiatives to drive structural growth.`;
};

const TeamCard = ({ member }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-3xl p-5 flex flex-col justify-between shadow-premium dark:shadow-premium-dark transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover group overflow-hidden">
      
      {/* Subtle Border Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-50/80 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative w-full h-64 overflow-hidden rounded-2xl bg-gray-50 dark:bg-dark-surface mb-5 border border-gray-100 dark:border-white/5 flex items-center justify-center">
        {(!member.image || imageError) ? (
          /* Professional Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 dark:from-dark-surface to-gray-100/50 dark:to-dark-card">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 dark:invert" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            
            <div className="w-16 h-16 rounded-full bg-white/60 dark:bg-dark-card/40 backdrop-blur-3xl shadow-sm border border-white/50 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 mb-3 relative z-10 group-hover:scale-105 group-hover:text-indigo-400 group-hover:border-indigo-200 group-hover:shadow-md transition-all duration-300">
              <User size={28} />
            </div>
            
            <div className="relative z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-dark-card/80 border border-white/50/60 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest font-mono">Photo Coming Soon</span>
            </div>
          </div>
        ) : (
          /* Real Image */
          <img 
            src={member.image} 
            alt={member.name} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Social Overlay (Visible only on hover) */}
        <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-sm z-20">
          {member.portfolio && (
            <a href={member.portfolio} target="_blank" rel="noreferrer" aria-label="Portfolio" className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-gray-900 transition-all duration-500 ease-spring translate-y-4 group-hover:translate-y-0" title="Personal Portfolio">
              <Globe size={18} />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all duration-500 ease-spring translate-y-4 group-hover:translate-y-0 delay-75" title="LinkedIn Profile">
              <Linkedin size={18} />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white hover:text-pink-600 transition-all duration-500 ease-spring translate-y-4 group-hover:translate-y-0 delay-150" title="Instagram Profile">
              <Instagram size={18} />
            </a>
          )}
        </div>
      </div>
      
      <div className="text-center relative z-10 flex-1 flex flex-col justify-end">
        <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 font-sans">{member.name}</h4>
        <p className="text-indigo-600 dark:text-indigo-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest font-mono mb-2">{member.role}</p>
        
        {/* Short Description - Expands on hover */}
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 group-hover:mt-2 transition-all duration-500 ease-smooth">
          {getRoleDescription(member.role)}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
