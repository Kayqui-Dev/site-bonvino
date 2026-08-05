import React, { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      'O Dr. Leandro conduziu nosso litígio contratual com precisão impecável. A clareza nas explicações e a agilidade na resposta no escritório da Av. Paulista foram determinantes para o nosso acordo favorável.',
    clientName: 'Empresário do Setor Imobiliário',
    caseType: 'Direito Civil & Contratos',
    result: 'Acordo Favorable • R$ 450 mil preservados',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Em um momento delicado de disputa familiar e partilha de bens, o atendimento foi de um respeito e humanidade ímpares. Conseguimos resolver tudo sem desgastes judiciais prolongados.',
    clientName: 'Cliente de Família & Sucessões',
    caseType: 'Direito de Família',
    result: 'Partilha Pacífica • Homologação Célere',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Excelente assessoria trabalhista patronal. O escritório reestruturou todos os nossos modelos de contrato e evitou um contencioso milionário na empresa.',
    clientName: 'Diretor de Operações de Logística',
    caseType: 'Direito Trabalhista Patronal',
    result: 'Auditoria de Riscos • 100% Sucesso',
    rating: 5,
  },
  {
    id: 4,
    quote:
      'A atuação na emergência jurídica criminal foi imediata. A presença no acompanhamento do inquérito garantiu nossa tranquilidade e a rápida restituição dos nossos direitos.',
    clientName: 'Executivo do Setor Financeiro',
    caseType: 'Direito Criminal & Defesa',
    result: 'Arquivamento de Inquérito',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
    touchStartX.current = null;
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-mono font-semibold bg-champagne/10 py-1.5 px-4 rounded-full border border-champagne/30">
            Reconhecimento
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Depoimentos de Clientes
          </h2>
        </div>

        {/* Carousel Outer */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card */}
          <div className="glass-obsidian p-8 md:p-14 rounded-3rem border border-champagne/30 relative overflow-hidden transition-all duration-500 min-h-[320px] flex flex-col justify-between shadow-2xl">
            {/* Giant Champagne Quote Mark */}
            <Quote className="w-20 h-20 text-champagne/10 absolute -top-2 -left-2 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne text-champagne" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-ivory text-lg sm:text-2xl font-serif italic leading-relaxed">
                "{testimonials[current].quote}"
              </p>
            </div>

            {/* Client Meta */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-ivory font-bold text-base">{testimonials[current].clientName}</h4>
                <p className="text-xs text-champagne font-mono uppercase tracking-wider mt-0.5">
                  {testimonials[current].caseType} • <span className="text-emerald-400 font-semibold">{testimonials[current].result}</span>
                </p>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      current === idx ? 'w-8 bg-champagne' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-obsidian border border-champagne/40 text-ivory hover:text-champagne hover:border-champagne flex items-center justify-center transition-all shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Próximo"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-obsidian border border-champagne/40 text-ivory hover:text-champagne hover:border-champagne flex items-center justify-center transition-all shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
