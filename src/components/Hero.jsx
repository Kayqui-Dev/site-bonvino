import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The strike was tuned for a 1350px stage: on a 378px screen the shockwave
    // grew wider than the viewport and read as a stray arc, and 1px sparks
    // vanished. Impact values now scale with the screen.
    const isMobile = window.matchMedia('(max-width: 639px)').matches;
    const V = isMobile
      ? { ringScale: 2.25, sparkX: 116, sparkY: 52, pivot: '50% -52px', rest: -58, windUp: -67 }
      : { ringScale: 3.4, sparkX: 190, sparkY: 70, pivot: '50% -70px', rest: -62, windUp: -71 };

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
        // Centring is set here, not with Tailwind translate classes, because
        // GSAP overwrites the whole transform once it animates scale.
        .set(ringRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.25 })
        .set(wordmarkRef.current, { opacity: 0, letterSpacing: '0.9em' })
        .set(sparkRefs.current, { opacity: 0, x: 0, y: 0, scale: 1 })
        // Pivot sits above the handle, at the wrist, so the head swings through
        // a real arc instead of sliding.
        .set(gavelRef.current, {
          xPercent: -50,
          rotate: V.rest,
          opacity: 0,
          transformOrigin: V.pivot,
        })

        // Wind-up
        .to(gavelRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        .to(gavelRef.current, { rotate: V.windUp, duration: 0.26, ease: 'power2.out' })

        // Strike
        .to(gavelRef.current, { rotate: 3, duration: 0.17, ease: 'power4.in' })

        // Impact cluster
        .add('hit')
        .to(stageRef.current, { y: 8, duration: 0.06, yoyo: true, repeat: 3, ease: 'power2.inOut' }, 'hit')
        .to(barRef.current, { scaleX: 1, opacity: 1, duration: 0.16, ease: 'expo.out' }, 'hit')
        .to(barRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 'hit+=0.22')
        .to(ringRef.current, { opacity: 0.7, scale: V.ringScale, duration: 1.05, ease: 'expo.out' }, 'hit')
        .set(ringRef.current, { opacity: 0 })
        .to(sparkRefs.current, { opacity: 1, duration: 0.05 }, 'hit')
        .to(
          sparkRefs.current,
          {
            x: () => gsap.utils.random(-V.sparkX, V.sparkX),
            y: () => gsap.utils.random(-V.sparkY, V.sparkY),
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
          { opacity: 1, letterSpacing: isMobile ? '0.3em' : '0.45em', duration: 0.9, ease: 'power3.out' },
          'hit+=0.35'
        )

        // Curtain lifts
        .to(
          overlayRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'power3.inOut' },
          '+=0.35'
        )
        .set(overlayRef.current, { display: 'none' })
        .add(revealContent, '<0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Depth on the portrait. Pointer parallax only exists for a mouse, so touch
  // screens were getting a completely static image — they get scroll parallax
  // inside the frame instead.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (imgRef.current) {
        // Slightly oversized so shifting it never exposes the frame edge.
        gsap.fromTo(
          imgRef.current,
          { yPercent: -5, scale: 1.12 },
          {
            yPercent: 5,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, heroRef);

    let cleanupPointer;
    if (window.matchMedia('(pointer: fine)').matches && frameRef.current) {
      const xTo = gsap.quickTo(frameRef.current, 'x', { duration: 0.9, ease: 'power3.out' });
      const yTo = gsap.quickTo(frameRef.current, 'y', { duration: 0.9, ease: 'power3.out' });
      const onMove = (e) => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        xTo(((e.clientX - cx) / cx) * -14);
        yTo(((e.clientY - cy) / cy) * -10);
      };
      window.addEventListener('pointermove', onMove);
      cleanupPointer = () => window.removeEventListener('pointermove', onMove);
    }

    return () => {
      ctx.revert();
      cleanupPointer?.();
    };
  }, []);

  const whatsappMessage = encodeURIComponent(
    'Olá, gostaria de agendar uma consulta jurídica no escritório da Av. Paulista.'
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-12"
    >
      {/* ---------- Intro: the gavel engraves the monogram ---------- */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[500] bg-navy flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 vignette-navy" />

        <div ref={stageRef} className="relative flex flex-col items-center">
          {/* Shockwave — base size also shrinks so the ring stays on screen */}
          <div
            ref={ringRef}
            className="absolute top-1/2 left-1/2 w-28 h-28 sm:w-44 sm:h-44 rounded-full border border-platinum/60"
            style={{ boxShadow: '0 0 70px rgba(195,208,226,0.4)' }}
          />

          {/* Sparks thrown off the strike — larger on mobile to stay legible */}
          {SPARKS.map((_, i) => (
            <span
              key={i}
              ref={(el) => (sparkRefs.current[i] = el)}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-1 sm:h-1 rounded-full bg-platinum"
              style={{ boxShadow: '0 0 8px rgba(234,241,248,0.9)' }}
            />
          ))}

          <div className="relative">
            <div
              ref={monoRef}
              className="font-serif font-bold text-8xl sm:text-9xl tracking-[0.06em] chrome-plate"
            >
              BP
            </div>

            {/* The struck line: flashes along the monogram's midline */}
            <div
              ref={barRef}
              className="absolute top-1/2 -left-8 -right-8 sm:-left-10 sm:-right-10 h-[2px] chrome-surface origin-center"
              style={{ boxShadow: '0 0 24px rgba(234,241,248,0.85)' }}
            />

            {/* Gavel built from solid plates — a line icon read as thin and
                cheap. Anchored to the monogram's midline, so the head actually
                lands on the struck line at every screen size instead of
                stopping short of it. */}
            <div ref={gavelRef} className="absolute left-1/2 bottom-1/2 w-24 sm:w-28">
              <div className="flex flex-col items-center">
                <div className="w-[7px] h-16 sm:h-20 rounded-t-[3px] chrome-surface" />
                <div className="relative w-full h-8 sm:h-9 rounded-[4px] chrome-surface shadow-[0_14px_38px_rgba(6,10,22,0.9)]">
                  <span className="absolute top-0 left-[18%] w-[3px] h-full bg-navy-deep/45" />
                  <span className="absolute top-0 right-[18%] w-[3px] h-full bg-navy-deep/45" />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={wordmarkRef}
            className="mt-6 text-[10px] sm:text-xs font-mono uppercase text-platinum-dim whitespace-nowrap"
          >
            Bonvino &amp; Pereira
          </div>
        </div>
      </div>

      {/* One quiet field — no stack of gradients */}
      <div className="absolute inset-0 z-0 bg-navy">
        <div className="absolute inset-0 vignette-navy opacity-60" />
      </div>

      {/* ---------- Editorial split ----------
          Mobile follows DOM order, which puts the portrait straight after the
          headline: it is the hero asset and used to sit entirely below the
          fold. Desktop places the same nodes explicitly into two columns. */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-x-16 lg:gap-y-7 lg:items-center">
        <div className="hero-animate flex items-center gap-4 lg:col-start-1 lg:col-span-7 lg:row-start-1">
          <span className="h-px w-10 sm:w-12 bg-platinum/50" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-platinum">
            Sociedade de Advogados • OAB/SP
          </span>
        </div>

        {/* Mixed weight so the headline has a focal point instead of one flat
            block of serif at a single size. */}
        {/* 4xl is the largest size where "Quando o processo" still holds one
            line at 378px — bigger and the explicit line breaks fall apart. */}
        <h1 className="hero-animate font-serif text-ivory text-4xl sm:text-5xl lg:text-[4rem] leading-[1.06] tracking-tight text-balance lg:col-start-1 lg:col-span-7 lg:row-start-2">
          Quando o processo
          <br />
          <span className="italic text-platinum">decide um rumo</span>
          <br />
          da sua vida.
        </h1>

        <figure className="hero-animate relative m-0 lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-5 lg:self-center">
          <div
            ref={frameRef}
            className="relative overflow-hidden rounded-sm border border-platinum/25 shadow-2xl shadow-navy-deep/50"
          >
            <img
              ref={imgRef}
              src="/brand/socios-bonvino-pereira.jpg"
              alt="Os sócios Denilson Pereira e Leandro Sousa Bonvino no escritório"
              className="w-full h-full object-cover aspect-[16/10] lg:aspect-[4/5] object-[56%_18%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

            <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <span className="block font-serif text-ivory text-sm sm:text-base leading-snug">
                Denilson Pereira (à esq.) e Leandro S. Bonvino
              </span>
              <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.28em] text-platinum mt-1.5">
                Sócios • Av. Paulista, 1636
              </span>
            </figcaption>
          </div>
        </figure>

        <p className="hero-animate text-ivory-muted text-base sm:text-lg leading-relaxed max-w-lg text-pretty font-light lg:col-start-1 lg:col-span-7 lg:row-start-3">
          Advocacia criminal, cível, trabalhista e de família em São Paulo. Mais de
          10 anos acompanhando processos do primeiro atendimento à decisão final.
        </p>

        <div className="hero-animate flex flex-col sm:flex-row sm:items-center gap-4 lg:col-start-1 lg:col-span-7 lg:row-start-4">
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
            className="link-hover inline-flex items-center justify-center sm:justify-start gap-2 text-platinum hover:text-ivory text-xs uppercase tracking-[0.16em] font-semibold py-2"
          >
            <span>Ver áreas de atuação</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Service facts, not achievement stats — a hard rule for OAB copy.
            Three columns on mobile too: stacked, they pushed the portrait and
            the whole photo column off the first screen. */}
        <dl className="hero-animate grid grid-cols-3 gap-px bg-platinum/15 border-y border-platinum/15 lg:col-start-1 lg:col-span-7 lg:row-start-5">
          {FACTS.map((fact) => (
            <div key={fact.label} className="bg-navy px-3 py-3.5 sm:px-4 sm:py-4">
              <dt className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-platinum mb-1.5">
                {fact.label}
              </dt>
              <dd className="text-[11px] sm:text-sm text-ivory leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
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
