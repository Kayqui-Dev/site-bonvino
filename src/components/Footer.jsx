import React from 'react';
import Logo from './Logo';
import { ShieldCheck, MapPin, Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-platinum/30 rounded-t-4rem pt-20 pb-10 text-ivory-muted relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Legal Data */}
          <div className="space-y-4">
            <Logo />
            <p className="text-xs text-ivory-muted leading-relaxed font-sans pt-2">
              Mais de uma década defendendo patrimônios e direitos com alto rigor técnico e transparência na Av. Paulista.
            </p>

            <div className="space-y-1.5 text-[11px] font-mono text-platinum bg-platinum/10 p-3 rounded-2xl border border-platinum/20">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>OAB/SP • Leandro S. Bonvino e Denilson Pereira</span>
              </div>
              <p className="text-ivory-muted">Razão Social: Bonvino Sociedade Individual de Advocacia</p>
              <p className="text-ivory-muted">CNPJ: 65.949.614/0001-60</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="text-ivory font-serif font-bold text-sm tracking-wider uppercase mb-4 text-platinum">
                Navegação
              </h4>
              <ul className="space-y-2.5 font-mono">
                <li><a href="#hero" className="hover:text-platinum transition-colors">Home</a></li>
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
          <div className="space-y-4 text-xs font-mono">
            <h4 className="text-ivory font-serif font-bold text-sm tracking-wider uppercase mb-4 text-platinum">
              Endereço & Canais
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-platinum shrink-0 mt-0.5" />
              <span>Av. Paulista 1636, Sala 103, Bela Vista, São Paulo - SP, CEP 01310-200</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-platinum shrink-0" />
              <span>(11) 9173-7691</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-platinum shrink-0" />
              <a
                href="mailto:bonvinoconsultoria@outlook.com"
                className="hover:text-platinum break-all min-w-0"
              >
                bonvinoconsultoria@outlook.com
              </a>
            </div>

            {/* Active System Indicator. Wraps because at tablet widths the pill
                plus the handle pushed the page 22px sideways. */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 bg-navy-elevated px-3 py-1.5 rounded-full border border-white/10 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-emerald-400 font-bold tracking-wider">SISTEMA ATIVO</span>
              </div>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ivory-muted hover:text-platinum transition-colors"
              >
                <Instagram className="w-4 h-4 text-platinum" />
                <span>@bonvinoepereira.adv</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-ivory-dim gap-4">
          <p>© {year} Bonvino e Pereira Advocacia. Todos os direitos reservados.</p>
          <p>Provimento OAB nº 205/2021 • Av. Paulista, São Paulo/SP</p>
        </div>
      </div>
    </footer>
  );
}
