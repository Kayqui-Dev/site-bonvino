import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Manifesto() {
  const manifestoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = manifestoRef.current.querySelectorAll('.word-reveal');
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, manifestoRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={manifestoRef}
      className="relative py-32 px-4 sm:px-6 lg:px-12 bg-obsidian border-y border-champagne/20 overflow-hidden"
    >
      {/* Dark Marble Texture Parallax Background */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt="Textura Mármore Luxo"
          className="w-full h-full object-cover filter contrast-200"
        />
        <div className="absolute inset-0 bg-obsidian/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-champagne font-mono font-semibold bg-champagne/10 py-1.5 px-4 rounded-full border border-champagne/30">
          Manifesto de Atuação
        </span>

        {/* Small Neutral Line */}
        <p className="word-reveal text-ivory-muted text-base sm:text-2xl font-sans tracking-wide">
          A maioria dos escritórios foca em volume de processos.
        </p>

        {/* Massive Playfair Display Italic Champagne Text */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-champagne leading-tight font-bold text-balance">
          <span className="word-reveal inline-block mr-3">Nós</span>
          <span className="word-reveal inline-block mr-3">focamos</span>
          <span className="word-reveal inline-block mr-3">em</span>
          <br className="hidden sm:inline" />
          <span className="word-reveal inline-block mr-3 text-ivory">RESULTADOS</span>
          <span className="word-reveal inline-block mr-3 text-ivory">QUE</span>
          <span className="word-reveal inline-block mr-3 underline decoration-champagne/50 underline-offset-8">TRANSFORMAM</span>
          <span className="word-reveal inline-block text-ivory">VIDAS.</span>
        </h2>

        <div className="pt-6 w-24 h-[2px] bg-champagne mx-auto" />
      </div>
    </section>
  );
}
