import React, { useEffect, useRef, useState } from 'react';
import {
  Scale,
  Briefcase,
  ShieldCheck,
  Users,
  Building2,
  ShoppingCart,
  ReceiptText,
  MessageCircle,
  Plus,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppUrl } from '../site';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Copy describes the work performed, never outcomes obtained. The previous
// badges ("180+ Causas Vitoriosas", "350+ Casos Atendidos") were result and
// volume claims, which OAB publicity rules do not allow.
const AREAS = [
  {
    id: 'criminal',
    icon: ShieldCheck,
    title: 'Direito Criminal',
    matter: 'Penal',
    tag: 'Plantão 24h',
    description:
      'Atuação tempestiva na defesa dos direitos fundamentais, desde a fase policial até o julgamento.',
    fronts: [
      'Habeas corpus e medidas de urgência',
      'Acompanhamento em flagrante e delegacia',
      'Inquéritos policiais e ações penais',
    ],
  },
  {
    id: 'tributario',
    icon: ReceiptText,
    title: 'Direito Tributário',
    matter: 'Tributário',
    description:
      'Assessoria preventiva e contenciosa para decisões fiscais, com foco na segurança jurídica da empresa.',
    fronts: [
      'Planejamento fiscal e prevenção de riscos',
      'Análise de créditos e recuperação tributária',
      'Defesa administrativa e judicial tributária',
    ],
  },
  {
    id: 'civil',
    icon: Scale,
    title: 'Direito Civil',
    matter: 'Cível',
    description:
      'Proteção patrimonial e condução de litígios contratuais, indenizatórios e de propriedade.',
    fronts: [
      'Elaboração e revisão de contratos',
      'Reparação por danos morais e materiais',
      'Ações possessórias e usucapião',
    ],
  },
  {
    id: 'trabalhista',
    icon: Briefcase,
    title: 'Direito Trabalhista',
    matter: 'Trabalho',
    description:
      'Defesa técnica para empregados e assessoria preventiva para empresas nas rotinas laborais.',
    fronts: [
      'Reclamações trabalhistas e rescisão indireta',
      'Defesa patronal e auditoria preventiva',
      'Acordos e homologação judicial',
    ],
  },
  {
    id: 'familia',
    icon: Users,
    title: 'Direito de Família',
    matter: 'Família',
    description:
      'Condução discreta e humanizada de questões familiares e sucessórias, judiciais ou consensuais.',
    fronts: [
      'Divórcio e partilha de bens',
      'Guarda, convivência e alimentos',
      'Inventários e sucessões',
    ],
  },
  {
    id: 'empresarial',
    icon: Building2,
    title: 'Direito Empresarial',
    matter: 'Empresa',
    description:
      'Suporte jurídico continuado para sociedades, da constituição à gestão de riscos do negócio.',
    fronts: [
      'Constituição e reestruturação societária',
      'Gestão de riscos contratuais e compliance',
      'Conflitos entre sócios',
    ],
  },
  {
    id: 'consumidor',
    icon: ShoppingCart,
    title: 'Direito do Consumidor',
    matter: 'Consumidor',
    description:
      'Enfrentamento de práticas abusivas de fornecedores, instituições financeiras e planos de saúde.',
    fronts: [
      'Práticas e cláusulas abusivas',
      'Bancos, seguradoras e planos de saúde',
      'Ressarcimento e repetição de indébito',
    ],
  },
];

export default function PracticeAreas() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  // Hover-to-open is a mouse affordance. On a touch screen it fired on tap and
  // fought the tap-to-close toggle below.
  const hoverable = useRef(false);

  useEffect(() => {
    hoverable.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  // On mobile the folders behave like an accordion, so tapping the open one
  // closes it. The desktop cabinet always keeps one file open, or it would
  // collapse into six empty spines.
  const handleSelect = (i) => {
    const collapsible = window.matchMedia('(max-width: 1023px)').matches;
    setActive((prev) => (collapsible && prev === i ? -1 : i));
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.dossier-item'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Arrow keys walk the cabinet, as with any composite widget.
  const onKeyDown = (e, index) => {
    const last = AREAS.length - 1;
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    sectionRef.current?.querySelectorAll('.dossier-trigger')[next]?.focus();
  };

  return (
    <section id="areas" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header — hairline label, matching the hero, instead of a pill badge */}
        <div className="flex flex-col gap-5 mb-12 max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-platinum/50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-platinum">
              Áreas de atuação
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-ivory leading-[1.1] text-balance">
            Selecione a matéria do seu caso.
          </h2>
          <p className="text-ivory-muted text-base leading-relaxed text-pretty">
            Cada pasta reúne as frentes que o escritório conduz naquela área. Abra a
            que corresponde à sua situação e fale direto com um advogado.
          </p>
        </div>

        {/* ---------- The cabinet ---------- */}
        <div className="flex flex-col lg:flex-row gap-2.5 lg:h-[29rem]">
          {AREAS.map((area, i) => {
            const Icon = area.icon;
            const isOpen = active === i;

            return (
              <article
                key={area.id}
                className={`dossier-item relative flex flex-col overflow-hidden rounded-sm border transition-all duration-500 ease-out ${
                  isOpen
                    ? 'border-platinum/45 bg-navy-elevated lg:flex-[3.6]'
                    : 'border-platinum/15 bg-navy-elevated/40 hover:border-platinum/35 hover:bg-navy-elevated/70 lg:flex-[0.42]'
                }`}
              >
                {/* Chrome edge marks the open file, like a tab standing proud.
                    Closed folders keep a dim edge on mobile so the column still
                    reads as a stack of files rather than plain list rows. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 bottom-0 w-[3px] chrome-surface transition-opacity duration-500 z-10 ${
                    isOpen ? 'opacity-100' : 'opacity-25 lg:opacity-0'
                  }`}
                />

                {/* One stable button node across both states, so keyboard focus
                    survives opening and closing the file. */}
                <h3 className={`m-0 ${isOpen ? '' : 'lg:flex-1'}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    onMouseEnter={() => hoverable.current && setActive(i)}
                    // Only keyboard focus opens a file. A tap also focuses the
                    // button, which would re-open what the tap just closed.
                    onFocus={(e) => e.target.matches(':focus-visible') && setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    aria-expanded={isOpen}
                    aria-controls={`dossier-panel-${area.id}`}
                    className="dossier-trigger w-full h-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum focus-visible:ring-inset"
                  >
                    {/* Mobile: a file tab — matter code, title, and a marker
                        that turns as the folder opens. */}
                    <span className="flex lg:hidden items-center gap-3.5 px-5 py-4">
                      <Icon
                        className={`w-5 h-5 shrink-0 transition-colors duration-300 ${
                          isOpen ? 'text-platinum' : 'text-platinum/60'
                        }`}
                      />
                      <span className="flex flex-col flex-1 min-w-0 gap-0.5">
                        <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-platinum/70">
                          {area.matter}
                        </span>
                        <span className="text-[15px] font-serif text-ivory leading-snug">
                          {area.title}
                        </span>
                      </span>
                      <Plus
                        className={`w-4 h-4 shrink-0 transition-transform duration-500 ease-out ${
                          isOpen ? 'rotate-[135deg] text-platinum' : 'text-platinum/50'
                        }`}
                      />
                    </span>

                    {/* Desktop: a vertical spine when filed, a header when open */}
                    {isOpen ? (
                      <span className="hidden lg:flex items-center gap-3 px-7 pt-7">
                        <Icon className="w-5 h-5 text-platinum" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-platinum">
                          {area.matter}
                        </span>
                      </span>
                    ) : (
                      <span className="hidden lg:flex flex-col items-center justify-between h-full py-6">
                        <Icon className="w-5 h-5 text-platinum shrink-0" />
                        {/* Arbitrary properties: a custom class cannot take a
                            lg: variant, so the writing mode is set inline. */}
                        <span className="text-base font-serif text-ivory whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                          {area.title}
                        </span>
                        <Plus className="w-4 h-4 text-platinum/50 shrink-0" />
                      </span>
                    )}
                  </button>
                </h3>

                {/* Panel. Mobile animates open by tweening grid-template-rows
                    from 0fr to 1fr, which slides to the content's natural
                    height — the previous display toggle snapped with no motion.
                    `inert` keeps the collapsed CTA out of the tab order. */}
                <div
                  id={`dossier-panel-${area.id}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out lg:block lg:transition-none ${
                    isOpen ? 'grid-rows-[1fr] lg:flex-1' : 'grid-rows-[0fr] lg:hidden'
                  }`}
                >
                  {/* The clipping layer the grid row animates against */}
                  <div className="overflow-hidden lg:h-full">
                   <div className="flex flex-col gap-5 px-5 pb-6 pt-1 lg:px-7 lg:pb-7 lg:pt-3 lg:h-full">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Mobile already shows the title in the accordion row */}
                    <span className="hidden lg:inline font-serif text-3xl text-ivory">
                      {area.title}
                    </span>
                    {area.tag && (
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-navy bg-platinum px-2.5 py-1 rounded-sm">
                        {area.tag}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-ivory-muted leading-relaxed max-w-md">
                    {area.description}
                  </p>

                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-platinum pb-2 border-b border-platinum/20">
                      Frentes conduzidas
                    </span>
                    <ul className="flex flex-col">
                      {area.fronts.map((front) => (
                        <li
                          key={front}
                          className="text-sm text-ivory py-2.5 border-b border-platinum/10 flex items-start gap-3"
                        >
                          <span aria-hidden="true" className="text-platinum/60 font-mono text-xs pt-0.5">
                            —
                          </span>
                          <span className="leading-snug">{front}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={getWhatsAppUrl(`Olá! Gostaria de agendar uma consulta jurídica sobre ${area.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-magnetic mt-auto inline-flex items-center justify-center gap-2.5 bg-platinum hover:bg-platinum-hover text-navy text-xs font-semibold uppercase tracking-[0.16em] py-3.5 px-5 rounded-sm self-start"
                  >
                    <MessageCircle className="w-4 h-4 fill-navy stroke-none" />
                    <span>Falar sobre {area.matter.toLowerCase()}</span>
                  </a>
                   </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
