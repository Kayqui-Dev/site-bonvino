import React from 'react';

/**
 * Brand lockup. Uses the real "BP" chrome monogram plate.
 * The circular crop excludes the wordmark baked into the source JPEG.
 */
export default function Logo({ size = 'normal', className = '' }) {
  return (
    <span
      className={`relative block shrink-0 select-none overflow-hidden rounded-full border border-platinum/25 bg-navy-elevated text-platinum ${
        size === 'hero' ? 'h-36 w-36 sm:h-44 sm:w-44' : 'h-14 w-14'
      } ${className}`}
    >
      <img
        src="/brand/logo-bp.jpg"
        alt="Monograma BP de Bonvino & Pereira Sociedade de Advogados"
        width={640}
        height={640}
        className="absolute left-1/2 top-0 h-auto w-[140%] max-w-none -translate-x-1/2"
      />
    </span>
  );
}
