import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import Logo from './Logo';
import { getWhatsAppUrl } from '../site';

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
        gsap.set('.hero-animate', { opacity: 1, y: 0 });
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

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-36 pb-24 px-5 sm:px-8 lg:px-12"
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
            <div ref={monoRef}>
              <Logo size="hero" />
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
            className="mt-6 text-sm font-sans uppercase text-platinum whitespace-nowrap"
          >
            Bonvino &amp; Pereira
          </div>
        </div>
      </div>

      {/* One quiet field — no stack of gradients */}
      <div className="absolute inset-0 z-0 bg-navy">
        <div className="absolute inset-0 vignette-navy opacity-60" />
      </div>

      {/* ---------- Institutional opening ---------- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="hero-animate flex flex-col items-center gap-2">
            <span className="font-sans text-sm uppercase tracking-[0.24em] text-platinum sm:tracking-[0.35em]">
              Bonvino &amp; Pereira
            </span>
            <span className="font-sans text-sm tracking-wide text-ivory-muted">
              Sociedade de Advogados
            </span>
          </div>

          {/* Mixed weight so the headline has a focal point instead of one flat
              block of serif at a single size. */}
          <h1 className="hero-animate font-serif text-4xl leading-[1.15] tracking-tight text-ivory text-balance sm:text-6xl lg:text-7xl">
            Excelência jurídica.
            <span className="block italic text-platinum">Segurança para decidir.</span>
          </h1>

          <p className="hero-animate max-w-2xl font-sans text-base leading-relaxed text-ivory-muted text-pretty sm:text-lg">
            Advocacia criminal estratégica e assessoria tributária e empresarial.
            Rigor técnico, discrição e atendimento próximo para proteger seus
            direitos e orientar suas decisões.
          </p>

          <div className="hero-animate flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-8">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic rounded-full bg-platinum px-7 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-platinum-hover"
            >
              <span className="flex items-center justify-center gap-3">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Agendar consulta
              </span>
            </a>
            <a
              href="#areas"
              className="link-hover py-3 font-sans text-sm font-medium text-platinum hover:text-ivory"
            >
              <span className="flex items-center justify-center gap-2">
                Conheça nossa atuação
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* Service facts, not achievement stats — a hard rule for OAB copy. */}
        <dl className="hero-animate mx-auto mt-12 flex max-w-2xl divide-x divide-platinum/15 border-t border-platinum/15 pt-6">
          {FACTS.map((fact) => (
            <div key={fact.label} className="min-w-0 flex-1 px-2 sm:px-4">
              <dt className="font-sans text-sm text-ivory-muted">{fact.label}</dt>
              <dd className="mt-2 font-sans text-sm leading-relaxed text-platinum">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {introDone && (
        <div className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
          <span className="text-sm font-sans text-ivory-muted">Conheça o escritório</span>
          <span className="w-px h-8 bg-gradient-to-b from-platinum/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
