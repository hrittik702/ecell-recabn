import React, { useState } from 'react';
import { Instagram, Linkedin, Globe, User } from 'lucide-react';

const TeamCard = ({ member }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-white border border-gray-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-premium transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-premium-hover group overflow-hidden">
      
      {/* Subtle Border Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative w-full h-64 overflow-hidden rounded-2xl bg-gray-50 mb-5 border border-gray-100 flex items-center justify-center">
        {(!member.image || imageError) ? (
          /* Professional Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            
            <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-400 mb-3 relative z-10 group-hover:scale-105 group-hover:text-indigo-400 group-hover:border-indigo-200 group-hover:shadow-md transition-all duration-300">
              <User size={28} />
            </div>
            
            <div className="relative z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/80 border border-gray-200/60 shadow-sm backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Photo Coming Soon</span>
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
        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 font-sans">{member.name}</h4>
        <p className="text-indigo-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest font-mono mb-2">{member.role}</p>
        
        {/* Short Description - Expands on hover */}
        <p className="text-xs text-gray-500 font-medium leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 group-hover:mt-2 transition-all duration-500 ease-smooth">
          Leading the {member.role.toLowerCase()} initiatives to drive structural growth and foster innovation across the campus.
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
