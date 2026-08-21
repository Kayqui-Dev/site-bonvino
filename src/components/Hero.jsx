import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const FACTS = [
  { label: 'Sede', value: 'Av. Paulista, 1636' },
  { label: 'Atendimento', value: 'Presencial e online' },
  { label: 'Criminal', value: 'Plantão 24 horas' },
];

const SPARKS = Array.from({ length: 16 });

export default function Hero() {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const stageRef = useRef(null);
  const gavelRef = useRef(null);
  const barRef = useRef(null);
  const ringRef = useRef(null);
  const monoRef = useRef(null);
  const wordmarkRef = useRef(null);
  const sparkRefs = useRef([]);
  const photoRef = useRef(null);

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const revealContent = () =>
        gsap.fromTo(
          '.hero-animate',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' }
        );

      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' });
        setIntroDone(true);
        revealContent();
        return;
      }

      const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });

      // The monogram starts pinched shut at the strike line; the impact is what
      // splits it open, so the letters read as being struck into the metal.
      tl.set(monoRef.current, { clipPath: 'inset(50% 0% 50% 0%)' })
        .set(barRef.current, { scaleX: 0, opacity: 0 })
        .set(ringRef.current, { opacity: 0, scale: 0.25 })
        .set(wordmarkRef.current, { opacity: 0, letterSpacing: '0.9em' })
        .set(sparkRefs.current, { opacity: 0, x: 0, y: 0, scale: 1 })
        // Pivot sits above the handle, at the wrist, so the head swings through
        // a real arc instead of sliding.
        .set(gavelRef.current, { rotate: -62, opacity: 0, transformOrigin: '50% -70px' })

        // Wind-up
        .to(gavelRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .to(gavelRef.current, { rotate: -71, duration: 0.26, ease: 'power2.out' })

        // Strike
        .to(gavelRef.current, { rotate: 3, duration: 0.17, ease: 'power4.in' })

        // Impact cluster
        .add('hit')
        .to(stageRef.current, { y: 8, duration: 0.06, yoyo: true, repeat: 3, ease: 'power2.inOut' }, 'hit')
        .to(barRef.current, { scaleX: 1, opacity: 1, duration: 0.16, ease: 'expo.out' }, 'hit')
        .to(barRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 'hit+=0.22')
        .to(ringRef.current, { opacity: 0.7, scale: 3.4, duration: 1.05, ease: 'expo.out' }, 'hit')
        .set(ringRef.current, { opacity: 0 })
        .to(
          sparkRefs.current,
          {
            opacity: 1,
            duration: 0.05,
          },
          'hit'
        )
        .to(
          sparkRefs.current,
          {
            x: () => gsap.utils.random(-190, 190),
            y: () => gsap.utils.random(-70, 70),
            scale: 0,
            opacity: 0,
            duration: 0.75,
            ease: 'power3.out',
          },
          'hit+=0.03'
        )
        // The engraving wipe
        .to(
          monoRef.current,
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: 'expo.out' },
          'hit+=0.06'
        )
        .to(gavelRef.current, { rotate: -22, opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 'hit+=0.3')
        .to(
          wordmarkRef.current,
          { opacity: 1, letterSpacing: '0.45em', duration: 0.9, ease: 'power3.out' },
          'hit+=0.35'
        )

        // Curtain lifts
        .to(
          overlayRef.current,
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.9,
            ease: 'power3.inOut',
          },
          '+=0.35'
        )
        .set(overlayRef.current, { display: 'none' })
        .add(revealContent, '<0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Gentle pointer parallax on the portrait — depth without motion sickness.
  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' });

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      xTo(((e.clientX - cx) / cx) * -14);
      yTo(((e.clientY - cy) / cy) * -10);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const whatsappMessage = encodeURIComponent(
    'Olá, gostaria de agendar uma consulta jurídica no escritório da Av. Paulista.'
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-12"
    >
      {/* ---------- Intro: the gavel engraves the monogram ---------- */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[500] bg-navy flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 vignette-navy" />

        <div ref={stageRef} className="relative flex flex-col items-center">
          {/* Shockwave */}
          <div
            ref={ringRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-platinum/60"
            style={{ boxShadow: '0 0 70px rgba(195,208,226,0.4)' }}
          />

          {/* Sparks thrown off the strike */}
          {SPARKS.map((_, i) => (
            <span
              key={i}
              ref={(el) => (sparkRefs.current[i] = el)}
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-platinum"
              style={{ boxShadow: '0 0 8px rgba(234,241,248,0.9)' }}
            />
          ))}

          <div className="relative">
            <div
              ref={monoRef}
              className="font-serif font-bold text-7xl sm:text-9xl tracking-[0.06em] chrome-plate"
            >
              BP
            </div>

            {/* The struck line: flashes along the monogram's midline */}
            <div
              ref={barRef}
              className="absolute top-1/2 -left-10 -right-10 h-[2px] chrome-surface origin-center"
              style={{ boxShadow: '0 0 24px rgba(234,241,248,0.85)' }}
            />
          </div>

          <div
            ref={wordmarkRef}
            className="mt-6 text-[10px] sm:text-xs font-mono uppercase text-platinum-dim whitespace-nowrap"
          >
            Bonvino &amp; Pereira
          </div>

          {/* Gavel built from solid plates — a line icon read as thin and cheap */}
          {/* Handle rises from the head, so the head is what lands on the line */}
          <div ref={gavelRef} className="absolute -top-24 sm:-top-28">
            <div className="relative">
              <div className="w-24 sm:w-28 h-8 sm:h-9 rounded-[4px] chrome-surface shadow-[0_14px_38px_rgba(6,10,22,0.9)]" />
              <div className="absolute top-0 left-[18%] w-[3px] h-8 sm:h-9 bg-navy-deep/45" />
              <div className="absolute top-0 right-[18%] w-[3px] h-8 sm:h-9 bg-navy-deep/45" />
              <div className="absolute bottom-[calc(100%-6px)] left-1/2 -translate-x-1/2 w-[7px] h-16 sm:h-20 rounded-t-[3px] chrome-surface" />
            </div>
          </div>
        </div>
      </div>

      {/* One quiet field — no stack of gradients */}
      <div className="absolute inset-0 z-0 bg-navy">
        <div className="absolute inset-0 vignette-navy opacity-60" />
      </div>

      {/* ---------- Editorial split ---------- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Type column */}
        <div className="lg:col-span-7 flex flex-col gap-7">
          <div className="hero-animate flex items-center gap-4">
            <span className="h-px w-12 bg-platinum/50" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.4em] text-platinum">
              Sociedade de Advogados • OAB/SP
            </span>
          </div>

          {/* Mixed weight so the headline has a focal point instead of one flat
              block of serif at a single size. */}
          <h1 className="hero-animate font-serif text-ivory text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] tracking-tight text-balance">
            Quando o processo
            <br />
            <span className="italic text-platinum">decide um rumo</span>
            <br />
            da sua vida.
          </h1>

          <p className="hero-animate text-ivory-muted text-base sm:text-lg leading-relaxed max-w-lg text-pretty font-light">
            Advocacia criminal, cível, trabalhista e de família em São Paulo. Mais de
            10 anos acompanhando processos do primeiro atendimento à decisão final.
          </p>

          <div className="hero-animate flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic inline-flex items-center justify-center gap-2.5 bg-platinum hover:bg-platinum-hover text-navy font-semibold text-xs uppercase tracking-[0.16em] px-7 py-4 rounded-sm"
            >
              <MessageCircle className="w-4 h-4 fill-navy stroke-none" />
              <span>Falar com advogado</span>
            </a>

            <a
              href="#areas"
              className="inline-flex items-center gap-2 text-platinum hover:text-ivory text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
            >
              <span>Ver áreas de atuação</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Service facts, not achievement stats — a hard rule for OAB copy */}
          <dl className="hero-animate grid sm:grid-cols-3 gap-px bg-platinum/15 border-y border-platinum/15 mt-2">
            {FACTS.map((fact) => (
              <div key={fact.label} className="bg-navy px-4 py-4">
                <dt className="text-[9px] font-mono uppercase tracking-[0.3em] text-platinum mb-1.5">
                  {fact.label}
                </dt>
                <dd className="text-sm text-ivory leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo column */}
        <figure className="hero-animate lg:col-span-5 relative m-0">
          <div ref={photoRef} className="relative overflow-hidden rounded-sm border border-platinum/25 shadow-2xl shadow-navy-deep/50">
            <img
              src="/brand/socios-bonvino-pereira.jpg"
              alt="Os sócios Denilson Pereira e Leandro Sousa Bonvino no escritório"
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-[4/5] object-[58%_20%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
              <span className="block font-serif text-ivory text-sm sm:text-base leading-snug">
                Denilson Pereira (à esq.) e Leandro S. Bonvino
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-[0.28em] text-platinum mt-1.5">
                Sócios • Av. Paulista, 1636
              </span>
            </figcaption>
          </div>
        </figure>
      </div>

      {introDone && (
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
          <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-ivory-dim">Role</span>
          <span className="w-px h-8 bg-gradient-to-b from-platinum/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
