import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 'penal',
    caseType: 'Defesa Penal Estratégica',
    quote:
      'Em um momento difícil para nossa família, o Dr. Leandro Bonvino nos ouviu com atenção e explicou cada etapa da defesa. A agilidade na condução das medidas processuais e o cuidado com o pedido de habeas corpus fizeram a diferença na forma como atravessamos esse período.',
    focus: 'Atendimento humanizado e defesa dos direitos fundamentais',
  },
  {
    id: 'tributario',
    caseType: 'Consultoria Tributária e Corporativa',
    quote:
      'O Dr. Denilson Pereira analisou nossa operação e esclareceu as possibilidades de recuperação tributária dentro da legislação. O planejamento fiscal e a revisão dos riscos trouxeram mais clareza para as decisões da empresa, com orientação próxima em cada etapa.',
    focus: 'Planejamento fiscal, recuperação tributária e prevenção de riscos',
  },
  {
    id: 'empresarial',
    caseType: 'Atuação Empresarial Geral',
    quote:
      'Encontramos na Bonvino & Pereira um suporte jurídico integrado para a rotina da empresa. Da revisão de contratos às questões societárias e tributárias, a equipe nos ajuda a antecipar riscos e fortalecer a proteção jurídica do negócio, sem perder de vista nossa realidade.',
    focus: 'Assessoria integrada e proteção jurídica empresarial',
  },
];

function ThirdSectorInfo() {
  return (
    <article aria-labelledby="third-sector-info-title" className="glass-navy rounded-3xl border border-platinum/30 p-6 shadow-2xl sm:p-10 md:p-12">
      <div className="flex flex-col gap-6">
        <span className="self-start rounded-full border border-platinum/25 bg-platinum/10 px-3 py-1 font-sans text-sm leading-relaxed text-platinum">
          Informação institucional — não é depoimento
        </span>
        <h3 id="third-sector-info-title" className="font-serif text-2xl leading-tight text-ivory text-balance sm:text-3xl">
          Assessoria Jurídica para Organizações do Terceiro Setor
        </h3>
        <p className="font-sans text-sm leading-relaxed text-ivory-muted text-pretty sm:text-base">
          Atuação jurídica voltada ao suporte de associações, institutos e fundações na estruturação de projetos, formalização de parcerias, acompanhamento da execução de recursos e orientação em processos de prestação de contas.
        </p>
        <ul className="flex flex-col divide-y divide-platinum/10 border-y border-platinum/15 font-sans text-sm leading-relaxed text-ivory">
          {[
            'Projetos e parcerias institucionais.',
            'Emendas parlamentares e execução de recursos.',
            'Prestação de contas e conformidade jurídica.',
          ].map((highlight) => (
            <li key={highlight} className="py-3">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-platinum/60">—</span>
                <span>{highlight}</span>
              </div>
            </li>
          ))}
        </ul>
        <a href="#area-terceiro-setor" className="self-start rounded-sm font-sans text-sm font-medium text-platinum underline underline-offset-4 transition-colors hover:text-ivory">
          Conheça a atuação no Terceiro Setor
        </a>
      </div>
    </article>
  );
}

export default function Testimonials({ clientTestimonials = [] }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const authorizedTestimonials = clientTestimonials.filter(
    (testimonial) => testimonial.authenticityConfirmed === true && testimonial.publicationAuthorized === true
  );
  const isIllustrative = authorizedTestimonials.length === 0;
  const slides = isIllustrative ? testimonials : authorizedTestimonials;
  const currentIndex = Math.min(current, slides.length - 1);
  const currentSlide = slides[currentIndex];

  const nextSlide = () => setCurrent((currentIndex + 1) % slides.length);
  const prevSlide = () => setCurrent((currentIndex - 1 + slides.length) % slides.length);

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
    <section id="depoimentos" aria-labelledby="testimonials-title" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm uppercase tracking-widest text-platinum font-sans">
              Atendimento próximo, atuação estratégica
            </span>
            <h2 id="testimonials-title" className="text-3xl sm:text-5xl font-serif font-bold text-ivory text-balance">
              Depoimentos de clientes
            </h2>
            <p className="text-sm leading-relaxed text-ivory-muted text-pretty">
              {isIllustrative
                ? 'Os três textos do carrossel são modelos ilustrativos, não relatos reais de clientes. A publicação como depoimentos depende de validação e autorização dos envolvidos.'
                : 'Manifestações publicadas após confirmação de autenticidade e autorização dos envolvidos. Cada relato se refere à experiência individual de atendimento.'}
            </p>
          </div>
        </div>

        {/* Carousel Outer */}
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label={isIllustrative ? 'Modelos de depoimentos' : 'Manifestações autorizadas de clientes'}
          className="max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStartX.current = null; }}
        >
          {/* Card */}
          <div className="glass-navy p-6 sm:p-10 md:p-12 rounded-3xl border border-platinum/30 shadow-2xl">
            <div aria-live="polite" aria-atomic="true" className="flex min-h-[27rem] flex-col justify-between gap-8 sm:min-h-[23rem]">
              <div className="flex flex-col gap-5">
                <span className="self-start rounded-full border border-platinum/25 bg-platinum/10 px-3 py-1 font-sans text-sm text-platinum">
                  {isIllustrative ? 'Exemplo ilustrativo — não verificado' : 'Manifestação autorizada'}
                </span>
                <h3 className="font-sans text-base font-semibold text-platinum text-balance">
                  {currentSlide.caseType}
                </h3>
                {/* Quote Text */}
                <blockquote className="font-serif text-xl italic leading-relaxed text-ivory text-pretty sm:text-2xl">
                  “{currentSlide.quote}”
                </blockquote>
              </div>
              <div className="border-t border-platinum/15 pt-5">
                <div className="flex flex-col gap-4 font-sans text-sm leading-relaxed text-ivory-muted">
                  <p>{currentSlide.focus}</p>
                  {!isIllustrative && (currentSlide.representative || currentSlide.organization) && (
                    <footer>
                      {currentSlide.representative && (
                        <p className="font-semibold text-platinum">{currentSlide.representative}</p>
                      )}
                      {(currentSlide.role || currentSlide.organization) && (
                        <p>{[currentSlide.role, currentSlide.organization].filter(Boolean).join(' • ')}</p>
                      )}
                    </footer>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Depoimento anterior"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-platinum/30 bg-navy text-platinum transition-colors hover:bg-navy-elevated"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Dots */}
            <div className="flex items-center">
              {slides.map((testimonial, idx) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  aria-label={`Ver ${isIllustrative ? 'exemplo' : 'manifestação'} ${idx + 1}: ${testimonial.caseType}`}
                  aria-current={currentIndex === idx ? 'true' : undefined}
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span className={`h-2 rounded-full transition-all ${currentIndex === idx ? 'w-6 bg-platinum' : 'w-2 bg-platinum/30'}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Próximo depoimento"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-platinum/30 bg-navy text-platinum transition-colors hover:bg-navy-elevated"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-6 text-center font-sans text-sm leading-relaxed text-ivory-muted">
            Cada caso exige análise individual. Não há garantia de resultado.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ThirdSectorInfo />
        </div>
      </div>
    </section>
  );
}
