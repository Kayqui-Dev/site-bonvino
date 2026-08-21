import React from 'react';

/**
 * Brand lockup. Uses the real "BP" chrome monogram plate.
 * The source art is a dark-navy JPEG, so it is blended into the navy
 * background instead of sitting on a visible square.
 */
export default function Logo({ size = 'normal', className = '' }) {
  if (size === 'hero') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <img
          src="/brand/logo-bp.jpg"
          alt="Monograma Bonvino &amp; Pereira"
          className="w-28 h-28 sm:w-36 sm:h-36 object-contain mb-5 mix-blend-screen opacity-95 drop-shadow-[0_8px_30px_rgba(30,58,110,0.7)]"
        />
        <div className="font-serif tracking-[0.22em] font-bold text-3xl sm:text-5xl uppercase text-platinum-gradient">
          BONVINO &amp; PEREIRA
        </div>
        <div className="tracking-[0.4em] text-[10px] sm:text-xs uppercase text-ivory-muted font-mono mt-2">
          Sociedade de Advogados
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* At small sizes the photographed plate turns to mud and repeats the
          wordmark beside it, so the monogram is set as chrome type instead. */}
      <span
        aria-hidden="true"
        className="w-10 h-10 shrink-0 rounded-lg border border-platinum/25 bg-navy-elevated/60 flex items-center justify-center font-serif font-bold text-base chrome-plate"
      >
        BP
      </span>
      <div className="flex flex-col leading-tight">
        <span className="font-serif tracking-[0.16em] font-bold text-sm uppercase text-platinum-gradient">
          BONVINO &amp; PEREIRA
        </span>
        <span className="text-[9px] tracking-[0.22em] font-mono text-ivory-dim uppercase">
          Sociedade de Advogados
        </span>
      </div>
    </div>
  );
}
