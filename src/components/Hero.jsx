import { MessageCircle, ArrowUpRight, ArrowDown } from 'lucide-react';
import { getWhatsAppUrl } from '../site';

const FACTS = [
  { label: 'Sede', value: 'Av. Paulista, 1636' },
  { label: 'Atendimento', value: 'Presencial e online' },
  { label: 'Criminal', value: 'Plantão 24 horas' },
];

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center px-4 pb-12 pt-36 sm:px-6 lg:px-12 lg:pb-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 vignette-navy opacity-60" />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <div className="flex w-full flex-col items-center gap-7 sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-sm uppercase tracking-[0.24em] text-platinum sm:tracking-[0.35em]">Bonvino &amp; Pereira</span>
            <span className="font-sans text-sm tracking-wide text-ivory-muted">Sociedade de Advogados</span>
          </div>
          <h1 id="hero-title" className="hero-title font-serif font-semibold leading-[1.15] tracking-tight text-ivory text-balance">
            Excelência jurídica.
            <span className="block italic text-platinum">Segurança para decidir.</span>
          </h1>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-ivory-muted text-pretty sm:text-lg">
            Advocacia criminal estratégica e assessoria tributária e empresarial.
            Rigor técnico, discrição e atendimento próximo para proteger seus
            direitos e orientar suas decisões.
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-8">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-magnetic rounded-full bg-platinum px-6 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-navy hover:bg-platinum-hover">
              <span className="flex items-center justify-center gap-3">
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                Agendar consulta
              </span>
            </a>
            <a href="#areas" className="link-hover flex min-h-11 items-center justify-center gap-2 rounded-full px-2 py-3 font-sans text-sm font-medium text-platinum hover:text-ivory">
              Conheça nossa atuação
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
        {/* Service facts, not achievement stats — a hard rule for OAB copy. */}
        <dl className="flex w-full max-w-2xl divide-x divide-platinum/15 border-t border-platinum/15 pt-6">
          {FACTS.map((fact) => (
            <div key={fact.label} className="flex min-w-0 flex-1 flex-col gap-2 px-2 sm:px-4">
              <dt className="font-sans text-sm leading-relaxed text-ivory-muted">{fact.label}</dt>
              <dd className="font-sans text-sm leading-relaxed text-platinum">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <a href="#sobre" className="hidden min-h-11 flex-col items-center gap-2 rounded-xl p-2 text-sm text-ivory-muted transition-colors hover:text-platinum lg:flex">
          Conheça o escritório
          <ArrowDown className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
