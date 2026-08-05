import React, { useEffect, useRef } from 'react';
import { MessageCircle, ArrowDownRight, ShieldCheck, MapPin, Award } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Olá, gostaria de agendar uma consulta jurídica no escritório da Av. Paulista."
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pb-16 pt-32 px-4 sm:px-6 lg:px-12"
    >
      {/* Background Image: Dark Marble Luxury Law Office */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"
          alt="Escritório de Advocacia Bonvino Av. Paulista"
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125 scale-105 transform transition-transform duration-10000"
        />
        {/* Obsidian Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-obsidian/40 to-obsidian" />
      </div>

      {/* Content — Bottom-Left Third */}
      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Badge Tag */}
        <div className="hero-animate inline-flex items-center gap-2 bg-champagne/10 border border-champagne/30 text-champagne px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase">
          <MapPin className="w-3.5 h-3.5" />
          <span>Av. Paulista, 1636 • Sala 103 • Bela Vista, SP</span>
        </div>

        {/* Headline */}
        <div className="hero-animate space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-ivory leading-[1.1]">
            Defesa jurídica de excelência.
          </h1>
          <div className="text-3xl sm:text-5xl md:text-7xl font-serif italic text-champagne leading-tight">
            Resultados que falam.
          </div>
        </div>

        {/* Subtitle */}
        <p className="hero-animate text-ivory-muted text-base sm:text-xl max-w-2xl font-light leading-relaxed">
          Mais de 10 anos de experiência defendendo patrimônios e direitos com alto rigor técnico. Atendimento presencial exclusivo no coração financeiro de São Paulo.
        </p>

        {/* CTAs */}
        <div className="hero-animate flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-champagne hover:bg-champagne-hover text-obsidian font-bold text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full btn-magnetic shadow-xl shadow-champagne/20"
          >
            <MessageCircle className="w-4.5 h-4.5 fill-obsidian stroke-none" />
            <span>Falar com Advogado</span>
          </a>

          <a
            href="#areas"
            className="inline-flex items-center justify-center gap-2 border border-champagne/40 hover:border-champagne text-champagne hover:bg-champagne/10 font-semibold text-xs uppercase tracking-[0.18em] px-8 py-4 rounded-full transition-all"
          >
            <span>Áreas de Atuação</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="hero-animate pt-8 flex flex-wrap items-center gap-6 sm:gap-10 text-ivory-muted text-xs font-mono uppercase border-t border-white/10 mt-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-champagne" />
            <span>OAB/SP • Titular Leandro Bonvino</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-champagne" />
            <span>10+ Anos de Carreira</span>
          </div>
        </div>
      </div>
    </section>
  );
}
