import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowUpRight, Gavel } from 'lucide-react';
import gsap from 'gsap';

const AREAS = [
  'Direito Criminal',
  'Direito Civil',
  'Direito Trabalhista',
  'Direito de Família',
  'Direito Empresarial',
  'Direito do Consumidor',
];

export default function Hero() {
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const gavelRef = useRef(null);
  const monogramRef = useRef(null);
  const ringRef = useRef(null);
  const stageRef = useRef(null);

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const revealContent = () =>
        gsap.fromTo(
          '.hero-animate',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' }
        );

      if (reduced) {
        gsap.set(overlayRef.current, { autoAlpha: 0, display: 'none' });
        setIntroDone(true);
        revealContent();
        return;
      }

      const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });

      tl.set(gavelRef.current, { rotate: -42, y: -26, opacity: 0, transformOrigin: '85% 85%' })
        .set(monogramRef.current, { opacity: 0, scale: 0.86 })
        .set(ringRef.current, { opacity: 0, scale: 0.2 })
        .to(gavelRef.current, { opacity: 1, duration: 0.32, ease: 'power2.out' })
        .to(gavelRef.current, { rotate: 4, y: 0, duration: 0.22, ease: 'power4.in' })

        .add(() => {
          gsap.fromTo(
            stageRef.current,
            { y: 0 },
            { y: 5, duration: 0.07, yoyo: true, repeat: 3, ease: 'power2.inOut' }
          );
        })
        .to(
          ringRef.current,
          {
            opacity: 0.75,
            scale: 3,
            duration: 1,
            ease: 'expo.out',
            onComplete: () => gsap.set(ringRef.current, { opacity: 0 }),
          },
          '<'
        )
        .to(monogramRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: 'expo.out' }, '<0.05')
        .to(gavelRef.current, { opacity: 0, y: -18, duration: 0.55, ease: 'power2.inOut' }, '<0.3')

        .to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power2.inOut',
          delay: 0.3,
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
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-32 pb-16 px-4 sm:px-6 lg:px-12"
    >
      {/* ---------- Gavel strike curtain ---------- */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[500] bg-navy flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 vignette-navy" />

        <div ref={stageRef} className="relative flex flex-col items-center">
          <div
            ref={ringRef}
            className="absolute w-40 h-40 rounded-full border border-platinum/60"
            style={{ boxShadow: '0 0 60px rgba(195,208,226,0.35)' }}
          />

          <div
            ref={monogramRef}
            className="font-serif font-bold text-7xl sm:text-9xl tracking-[0.06em] chrome-plate"
          >
            BP
          </div>

          <div className="mt-5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.45em] text-platinum-dim">
            Bonvino &amp; Pereira
          </div>

          <div ref={gavelRef} className="absolute -top-24 sm:-top-28">
            <Gavel className="w-16 h-16 sm:w-20 sm:h-20 text-platinum drop-shadow-[0_10px_30px_rgba(30,58,110,0.9)]" />
          </div>
        </div>
      </div>

      {/* A single quiet field instead of a stack of gradients. The photograph
          is now a framed subject on the right, not a washed-out backdrop. */}
      <div className="absolute inset-0 z-0 bg-navy">
        <div className="absolute inset-0 vignette-navy opacity-60" />
      </div>

      {/* ---------- Editorial split ---------- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Type column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="hero-animate flex items-center gap-4">
            <span className="h-px w-12 bg-platinum/50" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.4em] text-platinum">
              Sociedade de Advogados • OAB/SP
            </span>
          </div>

          {/* Concrete positioning: what they practise and where, with no
              superlatives. "Excelência / resultados que falam" said nothing. */}
          <h1 className="font-serif text-ivory text-4xl sm:text-5xl lg:text-[3.65rem] leading-[1.1] tracking-tight text-balance">
            Advocacia criminal, cível, trabalhista e de família.
          </h1>

          <p className="text-ivory-muted text-base sm:text-lg leading-relaxed max-w-xl text-pretty font-light">
            Escritório presencial na Av. Paulista, 1636, em São Paulo. Mais de 10 anos
            acompanhando processos do primeiro atendimento à decisão final.
          </p>

          {/* The practice index earns its place: real navigation, not decoration */}
          <ul className="hero-animate grid sm:grid-cols-2 gap-x-10 border-t border-platinum/15 pt-1 max-w-xl">
            {AREAS.map((area) => (
              <li key={area} className="border-b border-platinum/10">
                <a
                  href="#areas"
                  className="group flex items-center justify-between py-2.5 text-sm text-ivory-muted hover:text-ivory transition-colors"
                >
                  <span>{area}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-platinum/40 group-hover:text-platinum transition-colors" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hero-animate flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-platinum hover:bg-platinum-hover text-navy font-semibold text-xs uppercase tracking-[0.16em] px-7 py-4 rounded-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-navy stroke-none" />
              <span>Falar com advogado</span>
            </a>

            <a
              href="#sobre"
              className="inline-flex items-center gap-2 text-platinum hover:text-ivory text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
            >
              <span>Conhecer os sócios</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Photo column — the partners as a visible subject, with a documentary
            caption plate. Squared frame and a platinum hairline, no gradient wash. */}
        <figure className="hero-animate lg:col-span-5 relative m-0">
          <div className="relative overflow-hidden rounded-sm border border-platinum/25 shadow-2xl shadow-navy-deep/50">
            <img
              src="/brand/socios-bonvino-pereira.jpg"
              alt="Os sócios Denilson Pereira e Leandro Sousa Bonvino no escritório"
              className="w-full h-full object-cover aspect-[4/3] lg:aspect-[4/5] object-[58%_20%]"
            />
            {/* Only enough scrim to seat the caption — the faces stay clear */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy via-navy/70 to-transparent" />

            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
              {/* Named left-to-right, as a photo caption should read */}
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
