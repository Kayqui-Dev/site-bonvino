import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { FIRM, getWhatsAppUrl } from '../site';

const LINKS = [
  { href: '#hero', label: 'Início', mobileLabel: 'Início' },
  { href: '#areas', label: 'Áreas de Atuação', mobileLabel: 'Áreas de Atuação' },
  { href: '#sobre', label: 'Sobre', mobileLabel: 'Sobre os Sócios' },
  { href: '#contato', label: 'Contato', mobileLabel: 'Contato' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(/** @type {HTMLElement | null} */ (null));
  const menuButtonRef = useRef(/** @type {HTMLButtonElement | null} */ (null));

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      setMobileOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMobileOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = (event) => {
      if (event.matches) setMobileOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [mobileOpen]);

  const whatsappUrl = getWhatsAppUrl();

  return (
    <header ref={headerRef} className="site-header" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
    }}>
      <nav aria-label="Navegação principal" className="mx-auto max-w-5xl">
        <div className="glass-nav flex items-center justify-between rounded-full px-4 py-3 sm:px-8">
          <a href="#hero" aria-label={`${FIRM.name} — início`} className="shrink-0 rounded-full" onClick={() => setMobileOpen(false)}>
            <Logo />
          </a>
          {/* Desktop Links. Switched at lg, not md: at 768px the four links plus
              the CTA overflowed the bar by 22px and pushed the page sideways. */}
          <div className="hidden items-center gap-6 lg:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="link-hover flex min-h-11 items-center rounded-lg px-1 py-2 text-sm font-medium uppercase tracking-wider text-ivory/80 hover:text-platinum">{link.label}</a>
            ))}
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-magnetic hidden min-h-11 items-center gap-2 rounded-full bg-platinum px-5 py-3 text-sm font-semibold uppercase tracking-wider text-navy hover:bg-platinum-hover lg:inline-flex">
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Agendar consulta
          </a>
          <div className="flex items-center gap-2 lg:hidden">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full bg-platinum text-navy" aria-label="Agendar consulta pelo WhatsApp">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <button ref={menuButtonRef} type="button" onClick={() => setMobileOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-full text-ivory-muted hover:text-platinum" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
              {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div id="mobile-navigation" hidden={!mobileOpen} className="mobile-navigation glass-nav mt-2 rounded-3xl p-4 shadow-xl lg:hidden">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center border-b border-platinum/15 px-3 py-3 text-sm uppercase tracking-wider text-ivory hover:text-platinum">{link.mobileLabel}</a>
            ))}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-platinum px-4 py-3 text-center text-sm font-semibold text-navy hover:bg-platinum-hover">
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              Agendar consulta
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
