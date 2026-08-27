import React, { useState, memo } from 'react';
import { Instagram, Linkedin, Globe, User } from 'lucide-react';
import { normalizeLinkedInUrl, normalizeInstagramUrl, normalizeWebsiteUrl } from '../../utils/socialLinks';

const formatYearBadge = (member, isAlumni) => {
  if (isAlumni) return 'Alumni';
  const y = parseInt(member.year);
  if (!y) return 'Member';
  if (y === 1) return '1st Year';
  if (y === 2) return '2nd Year';
  if (y === 3) return '3rd Year';
  if (y === 4) return '4th Year';
  return `${y}th Year`;
};

const TeamCard = memo(({ member, isAlumni = false }) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(member.image) && !imageError;
  const yearBadge = formatYearBadge(member, isAlumni);

  const linkedinUrl = normalizeLinkedInUrl(member.linkedin);
  const instagramUrl = normalizeInstagramUrl(member.instagram);
  const portfolioUrl = normalizeWebsiteUrl(member.portfolio || member.website);

  return (
    <article className="group relative bg-white/70 dark:bg-[#0e1118]/90 backdrop-blur-2xl border border-gray-200/80 dark:border-white/[0.07] rounded-3xl p-4 md:p-5 flex flex-col justify-between shadow-premium dark:shadow-premium-dark hover:shadow-premium-hover dark:hover:shadow-premium-dark-hover hover:border-gray-300 dark:hover:border-white/[0.18] transition-all duration-400 ease-out hover:-translate-y-1.5 will-change-transform">
      {/* Top Metadata Header - Clean Minimal Cosmic Badge */}
      <div className="flex items-center justify-end mb-3 px-1">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
          isAlumni 
            ? 'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/30 dark:text-amber-300/90 dark:border-amber-500/20'
            : 'bg-gray-100 text-gray-700 border-gray-200/80 dark:bg-white/[0.06] dark:text-zinc-300 dark:border-white/10'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isAlumni ? 'bg-amber-400' : 'bg-zinc-400 dark:bg-zinc-300'}`} />
          {yearBadge}
        </span>
      </div>

      {/* Editorial Portrait Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#0c0e14] mb-4 flex items-center justify-center border border-gray-100 dark:border-white/[0.04]">
        {/* Natural, untinted portrait photo */}
        {hasImage ? (
          <img
            src={member.image}
            alt={`Portrait of ${member.name}`}
            width="400"
            height="500"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-[#14161f] text-gray-400 dark:text-zinc-500 p-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] flex items-center justify-center text-gray-800 dark:text-zinc-200 font-bold text-2xl shadow-sm mb-2 group-hover:scale-105 transition-transform duration-300">
              {member.name ? member.name.charAt(0).toUpperCase() : <User size={24} />}
            </div>
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              {isAlumni ? 'Alumni' : 'E-Cell'}
            </span>
          </div>
        )}

        {/* Quick Social Action Overlay */}
        {(portfolioUrl || linkedinUrl || instagramUrl) && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
            {portfolioUrl && (
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Personal portfolio of ${member.name}`}
                className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors shadow-sm"
                title="Personal Portfolio"
              >
                <Globe size={14} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`LinkedIn profile of ${member.name}`}
                className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin size={14} />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Instagram profile of ${member.name}`}
                className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white hover:bg-white/20 border border-white/15 flex items-center justify-center transition-colors shadow-sm"
                title="Instagram Profile"
              >
                <Instagram size={14} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Member Details */}
      <div className="px-1 pt-1">
        <h4 className="text-lg md:text-xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-snug mb-1">
          {member.name}
        </h4>
        <p className={`font-mono font-bold text-xs uppercase tracking-wider mb-1 ${
          isAlumni ? 'text-amber-700 dark:text-amber-400/90' : 'text-zinc-600 dark:text-zinc-300'
        }`}>
          {member.role}
        </p>
        <p className="text-xs font-sans text-gray-500 dark:text-zinc-400 font-medium">
          {isAlumni ? (member.department || "Past Leadership") : (member.department || "Core Team")}
        </p>
      </div>
    </article>
  );
});

TeamCard.displayName = 'TeamCard';

export default TeamCard;
