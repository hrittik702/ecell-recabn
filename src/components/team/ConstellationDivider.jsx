import React from 'react';

const ConstellationDivider = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center my-16 md:my-20 ${className}`} aria-hidden="true">
      {/* Background ambient glow */}
      <div className="absolute w-48 h-12 bg-white/[0.03] dark:bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />

      {/* SVG Constellation */}
      <svg
        className="w-48 md:w-64 h-8 text-zinc-400/40 dark:text-zinc-600/60 overflow-visible"
        viewBox="0 0 200 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle connecting lines */}
        <line x1="10" y1="15" x2="60" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="60" y1="15" x2="100" y2="10" stroke="currentColor" strokeWidth="1" />
        <line x1="100" y1="10" x2="140" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="140" y1="20" x2="190" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

        {/* Nodes */}
        <circle cx="10" cy="15" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="60" cy="15" r="2.5" fill="currentColor" />
        <circle cx="100" cy="10" r="3.5" className="fill-zinc-400 dark:fill-zinc-200" />
        <circle cx="140" cy="20" r="2.5" fill="currentColor" />
        <circle cx="190" cy="15" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

export default ConstellationDivider;
