import React from 'react';

export default function Logo({ size = 'normal', className = '' }) {
  if (size === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="w-16 h-16 rounded-full bg-champagne/10 border border-champagne/40 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
          <svg className="w-9 h-9 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18L4 7.5v9M12 3l8 4.5v9M12 21l-8-4.5M12 21l8-4.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.5l-4 2.25v4.5l4 2.25 4-2.25v-4.5L12 8.5z" />
          </svg>
        </div>
        <div className="font-serif tracking-[0.25em] font-bold text-3xl sm:text-5xl text-champagne uppercase drop-shadow-sm">
          BONVINO & PEREIRA
        </div>
        <div className="tracking-[0.4em] text-xs sm:text-sm uppercase text-ivory-muted font-mono mt-1">
          ADVOCACIA
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="w-9 h-9 rounded-lg bg-champagne/10 border border-champagne/30 flex items-center justify-center shrink-0">
        <svg className="w-5 h-5 text-champagne" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18L4 7.5v9M12 3l8 4.5v9M12 21l-8-4.5M12 21l8-4.5" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-serif tracking-[0.18em] font-bold text-sm text-champagne uppercase">
          BONVINO & PEREIRA
        </span>
        <span className="text-[10px] tracking-[0.2em] font-mono text-ivory-muted uppercase">
          ADVOCACIA
        </span>
      </div>
    </div>
  );
}
