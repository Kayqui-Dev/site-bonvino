import Logo from './Logo';
import { ShieldCheck, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { FIRM } from '../site';
import { PRACTICE_AREAS } from '../practice-areas';

const LINK_CLASS = 'inline-flex min-h-11 items-center rounded-lg py-2 leading-relaxed transition-colors hover:text-platinum';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" aria-labelledby="footer-title" className="footer-shell relative z-10 rounded-t-3rem border-t border-platinum/30 bg-navy pt-12 text-ivory-muted sm:pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-12">
        <h2 id="footer-title" className="sr-only">Informações do escritório e navegação</h2>
        <div className="grid min-w-0 grid-cols-1 gap-10 border-b border-platinum/15 pb-10 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex min-w-0 flex-col items-start gap-4">
            <Logo />
            <p className="font-serif text-xl font-semibold text-ivory text-balance">{FIRM.name}</p>
            <p className="text-sm leading-relaxed">Advocacia criminal estratégica e assessoria tributária e empresarial, com atendimento próximo e rigor técnico na Av. Paulista.</p>
            <div className="flex w-full min-w-0 flex-col gap-2 rounded-2xl border border-platinum/20 bg-platinum/10 p-4 text-sm leading-relaxed">
              <div className="flex items-start gap-2 font-semibold text-platinum"><ShieldCheck className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>OAB/SP • Leandro Bonvino e Denilson Pereira</span></div>
              <p>Razão social: {FIRM.name}</p>
              <p>CNPJ: 65.949.614/0001-60</p>
            </div>
          </div>
          <div className="footer-navigation grid min-w-0 gap-5 text-sm sm:gap-8">
            <nav aria-label="Navegação no rodapé" className="flex min-w-0 flex-col gap-3">
              <h3 className="font-serif text-sm font-bold uppercase text-platinum">Navegação</h3>
              <ul className="flex flex-col">
                {[
                  ['#hero', 'Início'], ['#areas', 'Áreas de Atuação'], ['#sobre', 'Sobre os Sócios'], ['#contato', 'Contato'],
                ].map(([href, label]) => <li key={href}><a href={href} className={LINK_CLASS}>{label}</a></li>)}
              </ul>
            </nav>
            <nav aria-label="Áreas de atuação no rodapé" className="flex min-w-0 flex-col gap-3">
              <h3 className="font-serif text-sm font-bold uppercase text-platinum">Especialidades</h3>
              <ul className="flex flex-col">
                {PRACTICE_AREAS.map((area) => <li key={area.id}><a href={`#area-${area.id}`} className={LINK_CLASS}>{area.title}</a></li>)}
              </ul>
            </nav>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-4 text-sm md:col-span-2 xl:col-span-1">
            <h3 className="font-serif text-sm font-bold uppercase text-platinum">Endereço &amp; Canais</h3>
            <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-platinum" aria-hidden="true" /><p className="min-w-0 leading-relaxed">{FIRM.address}</p></div>
            <a href={`tel:+${FIRM.phoneNumber}`} className={`${LINK_CLASS} gap-3`}><Phone className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" /><span>{FIRM.phone}</span></a>
            <a href={`mailto:${FIRM.email}`} className={`${LINK_CLASS} max-w-full gap-3`}><Mail className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" /><span className="min-w-0 break-all">{FIRM.email}</span></a>
            {/* Keep the handle free to wrap at narrow tablet widths. */}
            <a href={FIRM.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${LINK_CLASS} max-w-full gap-3`}><Instagram className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" /><span className="min-w-0 break-words">{FIRM.instagram}</span></a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 text-sm sm:flex-row">
          <p className="leading-relaxed">© {year} {FIRM.name}. Todos os direitos reservados.</p>
          <p className="shrink-0">São Paulo/SP</p>
        </div>
        <details id="termos" className="border-t border-platinum/15 text-sm text-ivory-muted">
          <summary className="min-h-12 cursor-pointer rounded-sm py-4 font-medium text-platinum">Termos de uso e privacidade</summary>
          <div className="flex max-w-4xl flex-col gap-4 py-4 leading-relaxed">
            <p>Este site apresenta os serviços de {FIRM.name}. Seu conteúdo é informativo e não substitui a análise jurídica individual. O contato inicial não constitui contratação de serviços nem garantia de resultado.</p>
            <p>O formulário apenas prepara uma mensagem, sem armazenar seus dados neste site. O envio é realizado por você no WhatsApp, sujeito às políticas desse serviço. Links para Instagram e o mapa do Google também direcionam a serviços de terceiros. O mapa só é carregado após sua solicitação. Não envie documentos ou informações sensíveis antes de receber orientação da equipe.</p>
            <p>Para tratar de atendimento ou de seus dados pessoais, escreva para <a href={`mailto:${FIRM.email}`} className="break-all rounded-sm text-platinum underline underline-offset-4">{FIRM.email}</a>.</p>
          </div>
        </details>
      </div>
    </footer>
  );
}
