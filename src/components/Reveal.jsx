import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Alternating slide reveal (right / left) used between sections,
 * per the brand motion spec. Falls back to a plain render when the
 * visitor prefers reduced motion.
 */
export default function Reveal({ from = 'right', children, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: from === 'right' ? 64 : -64 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [from]);

  // The outer wrapper clips the horizontal offset so the slide-in cannot
  // widen the document and push the whole page sideways.
  return (
    <div className="overflow-x-clip">
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
