import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowDownRight, ShieldCheck, MapPin, Award, Gavel } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const gavelRef = useRef(null);
  const monogramRef = useRef(null);
  const ringRef = useRef(null);
  const stageRef = useRef(null);

  // Overlay is skipped entirely for reduced-motion users.
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const revealContent = () =>
        gsap.fromTo(
          '.hero-animate',
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
        );

      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' });
        setIntroDone(true);
        revealContent();
        return;
      }

      const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });

      // 1. The gavel rears back, then strikes.
      tl.set(gavelRef.current, { rotate: -42, y: -26, opacity: 0, transformOrigin: '85% 85%' })
        .set(monogramRef.current, { opacity: 0, scale: 0.82 })
        .set(ringRef.current, { opacity: 0, scale: 0.2 })
        .to(gavelRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
        .to(gavelRef.current, {
          rotate: 4,
          y: 0,
          duration: 0.24,
          ease: 'power4.in',
        })

        // 2. Impact — the stage reverberates and a shockwave spreads.
        .add(() => {
          gsap.fromTo(
            stageRef.current,
            { y: 0 },
            { y: 6, duration: 0.07, yoyo: true, repeat: 3, ease: 'power2.inOut' }
          );
        })
        .to(ringRef.current, {
          opacity: 0.8,
          scale: 3.1,
          duration: 1.05,
          ease: 'expo.out',
          onComplete: () => gsap.set(ringRef.current, { opacity: 0 }),
        }, '<')

        // 3. The monogram is struck into being.
        .to(monogramRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: 'expo.out',
        }, '<0.05')
        .to(gavelRef.current, { opacity: 0, y: -18, duration: 0.6, ease: 'power2.inOut' }, '<0.3')

        // 4. Curtain lifts into the page.
        .to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          delay: 0.35,
        })
        .set(overlayRef.current, { display: 'none' })
        .add(revealContent, '<0.25');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappMessage = encodeURIComponent(
    'Olá, gostaria de agendar uma consulta jurídica no escritório da Av. Paulista.'
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pb-16 pt-32 px-4 sm:px-6 lg:px-12"
    >
      {/* ---------- Gavel strike curtain ---------- */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[500] bg-navy flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 vignette-navy" />

        <div ref={stageRef} className="relative flex flex-col items-center">
          {/* Shockwave ring */}
          <div
            ref={ringRef}
            className="absolute w-40 h-40 rounded-full border border-platinum/60"
            style={{ boxShadow: '0 0 60px rgba(195,208,226,0.35)' }}
          />

          {/* Chrome monogram, struck into place */}
          <div
            ref={monogramRef}
            className="font-serif font-bold text-7xl sm:text-9xl tracking-[0.06em] chrome-plate"
          >
            BP
          </div>

          <div className="mt-5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.45em] text-platinum-dim">
            Bonvino &amp; Pereira
          </div>

          {/* The gavel itself */}
          <div ref={gavelRef} className="absolute -top-24 sm:-top-28">
            <Gavel className="w-16 h-16 sm:w-20 sm:h-20 text-platinum drop-shadow-[0_10px_30px_rgba(30,58,110,0.9)]" />
          </div>
        </div>
      </div>

      {/* ---------- Background: real courthouse presence ---------- */}
      <div className="absolute inset-0 z-0">
        <img
          src="/brand/socio-denilson-pereira.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[65%_25%] sm:object-[70%_20%] ken-burns filter brightness-[0.42] contrast-110 saturate-[0.5]"
        />
        {/* Navy grade so the photo reads as brand, not stock */}
        <div className="absolute inset-0 bg-navy-deep/35 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/55 to-transparent" />
        <div className="absolute inset-0 vignette-navy opacity-70" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 max-w-4xl space-y-6">
        <div className="hero-animate inline-flex items-center gap-2 bg-platinum/10 border border-platinum/25 text-platinum px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase backdrop-blur-sm">
          <MapPin className="w-3.5 h-3.5" />
          <span>Av. Paulista, 1636 • Sala 103 • Bela Vista, SP</span>
        </div>

        <div className="hero-animate space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-ivory leading-[1.08] text-balance">
            Defesa jurídica de excelência.
          </h1>
          <div className="text-3xl sm:text-5xl md:text-7xl font-serif italic leading-tight text-platinum-gradient">
            Resultados que falam.
          </div>
        </div>

        <p className="hero-animate text-ivory-muted text-base sm:text-xl max-w-2xl font-light leading-relaxed text-pretty">
          Mais de 10 anos de experiência defendendo patrimônios e direitos com alto rigor técnico.
          Atendimento presencial exclusivo no coração financeiro de São Paulo.
        </p>

        <div className="hero-animate flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-platinum hover:bg-platinum-hover text-navy font-bold text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full btn-magnetic shadow-xl shadow-navy-deep/50"
          >
            <MessageCircle className="w-4 h-4 fill-navy stroke-none" />
            <span>Falar com Advogado</span>
          </a>

          <a
            href="#areas"
            className="inline-flex items-center justify-center gap-2 border border-platinum/30 hover:border-platinum text-platinum hover:bg-platinum/10 font-semibold text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full transition-all"
          >
            <span>Áreas de Atuação</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>
        </div>

        <div className="hero-animate pt-8 mt-8 border-t border-platinum/12 flex flex-wrap items-center gap-6 sm:gap-10 text-ivory-muted text-xs font-mono uppercase">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-platinum" />
            <span>OAB/SP • Bonvino &amp; Pereira</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-platinum" />
            <span>10+ Anos de Carreira</span>
          </div>
        </div>
      </div>

      {/* Scroll cue — pinned to the right edge so it clears the badge row */}
      {introDone && (
        <div className="hidden lg:flex absolute bottom-16 right-10 z-10 flex-col items-center gap-3 animate-float">
          <span
            className="text-[9px] font-mono uppercase tracking-[0.35em] text-ivory-dim"
            style={{ writingMode: 'vertical-rl' }}
          >
            Role
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-platinum/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
