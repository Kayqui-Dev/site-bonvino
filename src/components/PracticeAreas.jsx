import React, { useEffect, useRef } from 'react';
import {
  Scale,
  Briefcase,
  ShieldCheck,
  Users,
  Building2,
  ShoppingCart,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShufflerPattern from './ShufflerPattern';
import TypewriterPattern from './TypewriterPattern';
import SchedulerPattern from './SchedulerPattern';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const practiceData = [
  {
    id: 'civil',
    icon: Scale,
    title: 'Direito Civil',
    badge: '350+ Casos Atendidos',
    description:
      'Proteção patrimonial, análise e elaboração de contratos complexos, reparações por danos morais e materiais, além de ações de execução e posse.',
    patternType: 'shuffler',
    shufflerItems: [
      { tag: 'FRENTE 1', text: 'Elaboração e Revisão de Contratos de Alta Complexidade' },
      { tag: 'FRENTE 2', text: 'Reparações por Danos Morais, Materiais e Estéticos' },
      { tag: 'FRENTE 3', text: 'Ações Possessórias, Usucapião e Direitos Reais' },
    ],
  },
  {
    id: 'trabalhista',
    icon: Briefcase,
    title: 'Direito Trabalhista',
    badge: '280+ Processos Concluídos',
    description:
      'Defesa estratégica tanto para empregados em busca de reparação quanto para empresas na adequação preventiva de rotinas trabalhistas e negociações.',
    patternType: 'shuffler',
    shufflerItems: [
      { tag: 'FRENTE 1', text: 'Reclamações Trabalhistas & Rescisões Indiretas' },
      { tag: 'FRENTE 2', text: 'Defesa Trabalhista Patronal & Auditoria Preventiva' },
      { tag: 'FRENTE 3', text: 'Acordos Extrajudiciais e Homologação na Justiça' },
    ],
  },
  {
    id: 'criminal',
    icon: ShieldCheck,
    title: 'Direito Criminal',
    badge: 'Plantão 24/7 Urgências',
    description:
      'Atuação tempestiva e técnica na defesa dos direitos fundamentais em inquéritos policiais, prisões preventivas, habeas corpus e processos penais.',
    patternType: 'typewriter',
    typewriterLines: [
      '>> [SOLICITAÇÃO] Habeas Corpus urgente impetrado com sucesso.',
      '>> [DELEGACIA] Acompanhamento presencial em flagrante 24h.',
      '>> [INQUÉRITO] Trancamento de ação penal por ausência de justa causa.',
    ],
  },
  {
    id: 'familia',
    icon: Users,
    title: 'Direito de Família',
    badge: '200+ Famílias Assistidas',
    description:
      'Condução humanizada, discreta e firme em divórcios, partilha de bens, guarda de filhos, fixação de alimentos e inventários sucessórios.',
    patternType: 'typewriter',
    typewriterLines: [
      '>> [DIVÓRCIO] Acordo consensual de partilha de patrimônio homologado.',
      '>> [GUARDA] Fixação de guarda compartilhada e plano de convivência.',
      '>> [INVENTÁRIO] Homologação célere de partilha de bens sem litígio.',
    ],
  },
  {
    id: 'empresarial',
    icon: Building2,
    title: 'Direito Empresarial',
    badge: '120+ Empresas Assessoradas',
    description:
      'Suporte jurídico integral para corporações: reestruturação societária, gestão de riscos contratuais, compliance e proteção dos sócios.',
    patternType: 'scheduler',
  },
  {
    id: 'consumidor',
    icon: ShoppingCart,
    title: 'Direito do Consumidor',
    badge: '180+ Causas Vitoriosas',
    description:
      'Repressão jurídica contra práticas abusivas de grandes fornecedores, bancos e planos de saúde com foco no ressarcimento de danos.',
    patternType: 'scheduler',
  },
];

export default function PracticeAreas() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.practice-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getWhatsAppUrl = (title) => {
    const text = encodeURIComponent(
      `Olá! Gostaria de consultar o Dr. Leandro sobre a área de *${title}* no escritório da Av. Paulista.`
    );
    return `https://wa.me/551191737691?text=${text}`;
  };

  return (
    <section id="areas" ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-mono font-semibold bg-champagne/10 py-1.5 px-4 rounded-full border border-champagne/30">
            Especialidades Jurídicas
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Áreas de Atuação
          </h2>
          <p className="text-ivory-muted text-base">
            Soluções jurídicas estratégicas com alto rigor técnico e atendimento exclusivo na Av. Paulista, São Paulo.
          </p>
        </div>

        {/* Grid 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="practice-card glass-obsidian p-8 rounded-2rem flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne group-hover:bg-champagne group-hover:text-obsidian transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-champagne bg-champagne/10 border border-champagne/30 px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-ivory font-bold">{item.title}</h3>
                    <p className="text-xs text-ivory-muted leading-relaxed">{item.description}</p>
                  </div>

                  {/* Pattern Renderer */}
                  <div className="pt-2">
                    {item.patternType === 'shuffler' && (
                      <ShufflerPattern items={item.shufflerItems} />
                    )}
                    {item.patternType === 'typewriter' && (
                      <TypewriterPattern textLines={item.typewriterLines} />
                    )}
                    {item.patternType === 'scheduler' && <SchedulerPattern />}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={getWhatsAppUrl(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-obsidian-elevated hover:bg-champagne text-ivory hover:text-obsidian text-xs font-semibold uppercase tracking-wider py-3.5 px-4 rounded-xl border border-white/10 hover:border-champagne transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar Especialista</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
