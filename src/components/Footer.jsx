import React from 'react';
import Logo from './Logo';
import { ShieldCheck, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { FIRM } from '../site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-platinum/30 rounded-t-4rem pt-20 pb-28 sm:pb-10 text-ivory-muted relative z-10 shadow-2xl shadow-navy/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-platinum/15">
          {/* Col 1: Brand & Legal Data */}
          <div className="space-y-4">
            <Logo />
            <p className="text-xl font-serif font-semibold text-ivory text-balance">{FIRM.name}</p>
            <p className="text-sm text-ivory-muted leading-relaxed font-sans">
              Advocacia criminal estratégica e assessoria tributária e empresarial,
              com atendimento próximo e rigor técnico na Av. Paulista.
            </p>

            <div className="space-y-1.5 text-sm font-mono text-platinum bg-platinum/10 p-3 rounded-2xl border border-platinum/20">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>OAB/SP • Leandro Bonvino e Denilson Pereira</span>
              </div>
              <p className="text-ivory-muted leading-relaxed">Razão social: {FIRM.name}</p>
              <p className="text-ivory-muted">CNPJ: 65.949.614/0001-60</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="text-ivory font-serif font-bold text-sm tracking-wider uppercase mb-4 text-platinum">
                Navegação
              </h4>
              <ul className="space-y-2.5 font-mono">
                <li><a href="#hero" className="hover:text-platinum transition-colors">Início</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Áreas de Atuação</a></li>
                <li><a href="#sobre" className="hover:text-platinum transition-colors">Sobre os Sócios</a></li>
                <li><a href="#contato" className="hover:text-platinum transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-ivory font-serif font-bold text-sm tracking-wider uppercase mb-4 text-platinum">
                Especialidades
              </h4>
              <ul className="space-y-2.5 font-mono">
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito Tributário</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito Civil</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito Trabalhista</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito Criminal</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito de Família</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito Empresarial</a></li>
                <li><a href="#areas" className="hover:text-platinum transition-colors">Direito do Consumidor</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Contact & Active Status */}
          <div className="space-y-4 text-sm font-mono">
            <h4 className="text-ivory font-serif font-bold text-sm tracking-wider uppercase mb-4 text-platinum">
              Endereço & Canais
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-platinum shrink-0 mt-0.5" />
              <span className="leading-relaxed">{FIRM.address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-platinum shrink-0" />
              <a href={`tel:+${FIRM.phoneNumber}`} className="hover:text-platinum">{FIRM.phone}</a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-platinum shrink-0" />
              <a
                href={`mailto:${FIRM.email}`}
                className="hover:text-platinum break-all min-w-0"
              >
                {FIRM.email}
              </a>
            </div>

            {/* Keep the handle free to wrap at narrow tablet widths. */}
            <a
              href={FIRM.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-ivory-muted hover:text-platinum transition-colors"
            >
              <Instagram className="w-4 h-4 text-platinum shrink-0" aria-hidden="true" />
              <span>{FIRM.instagram}</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-sm font-mono text-ivory-dim gap-4">
          <p className="leading-relaxed">© {year} {FIRM.name}. Todos os direitos reservados.</p>
          <p className="shrink-0">São Paulo/SP</p>
        </div>
        <details id="termos" className="border-t border-platinum/15 pt-6 text-sm text-ivory-muted">
          <summary className="cursor-pointer font-sans font-medium text-platinum">Termos de uso e privacidade</summary>
          <div className="mt-4 max-w-4xl">
            <div className="flex flex-col gap-4 leading-relaxed">
              <p>
                Este site apresenta os serviços de {FIRM.name}. Seu conteúdo é informativo
                e não substitui a análise jurídica individual. O contato inicial não constitui
                contratação de serviços nem garantia de resultado.
              </p>
              <p>
                O formulário apenas prepara uma mensagem, sem armazenar seus dados neste site.
                O envio é realizado por você no WhatsApp, sujeito às políticas desse serviço.
                Links para Instagram e o mapa do Google também direcionam a serviços de terceiros.
                Não envie documentos ou informações sensíveis antes de receber orientação da equipe.
              </p>
              <p>
                Para tratar de atendimento ou de seus dados pessoais, escreva para{' '}
                <a href={`mailto:${FIRM.email}`} className="break-all text-platinum underline underline-offset-4">{FIRM.email}</a>.
              </p>
            </div>
          </div>
        </details>
      </div>
    </footer>
  );
}
