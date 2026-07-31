import React from 'react';
import { Instagram, Linkedin, Globe } from 'lucide-react';

const TeamCard = ({ member }) => (
  <div className="bg-white border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-gray-300 transition-all duration-300 group">
    {/* Default Full-Color Headshot */}
    <div className="relative w-full h-64 overflow-hidden rounded-lg bg-gray-100 mb-4">
      <img 
        src={member.image} 
        alt={member.name} 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
        onError={(e) => { e.target.src = '/assets/hrittik-editor.jpg'; }}
      />
    </div>
    
    <div className="text-center pb-2">
      <h4 className="text-base font-bold text-gray-900 mb-1 font-sans">{member.name}</h4>
      <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3 font-sans">{member.role}</p>
      
      <div className="flex justify-center space-x-3">
        {member.portfolio && (
          <a href={member.portfolio} target="_blank" rel="noreferrer" aria-label="Portfolio" className="text-gray-400 hover:text-gray-900 transition-colors" title="Personal Portfolio">
            <Globe size={16} />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-900 transition-colors" title="LinkedIn Profile">
            <Linkedin size={16} />
          </a>
        )}
        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-gray-900 transition-colors" title="Instagram Profile">
            <Instagram size={16} />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default TeamCard;
