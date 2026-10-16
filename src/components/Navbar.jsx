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
  const barRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const menuButtonRef = useRef(/** @type {HTMLButtonElement | null} */ (null));

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const updateHeader = () => {
      document.documentElement.style.setProperty('--header-bottom', `${Math.ceil(bar.getBoundingClientRect().bottom)}px`);
      if (!menuButtonRef.current?.getClientRects().length) setMobileOpen(false);
    };
    const observer = new ResizeObserver(updateHeader);
    observer.observe(bar);
    window.addEventListener('resize', updateHeader, { passive: true });
    updateHeader();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeader);
      document.documentElement.style.removeProperty('--header-bottom');
    };
  }, []);

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
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [mobileOpen]);

  const whatsappUrl = getWhatsAppUrl();

  return (
    <header ref={headerRef} className="site-header" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
    }}>
      <nav aria-label="Navegação principal" className="navigation-container mx-auto max-w-5xl">
        <div ref={barRef} className="navigation-bar glass-nav flex items-center justify-between rounded-full">
          <a href="#hero" aria-label={`${FIRM.name} — início`} className="shrink-0 rounded-full" onClick={() => setMobileOpen(false)}>
            <Logo className="navigation-logo" />
          </a>
          <div className="desktop-links items-center gap-6">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="link-hover flex min-h-11 items-center rounded-lg px-1 py-2 text-sm font-medium uppercase tracking-wider text-ivory/80 hover:text-platinum">{link.label}</a>
            ))}
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="desktop-consult btn-magnetic min-h-11 items-center gap-2 rounded-full bg-platinum px-5 py-3 text-sm font-semibold uppercase tracking-wider text-navy hover:bg-platinum-hover">
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Agendar consulta
          </a>
          <div className="mobile-controls items-center gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="navigation-icon-button flex items-center justify-center rounded-full bg-platinum text-navy" aria-label="Agendar consulta pelo WhatsApp">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <button ref={menuButtonRef} type="button" onClick={() => setMobileOpen((open) => !open)} className="navigation-icon-button flex items-center justify-center rounded-full text-ivory-muted hover:text-platinum" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
              {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div id="mobile-navigation" hidden={!mobileOpen} className="mobile-navigation glass-nav mt-2 rounded-3xl p-4 shadow-xl">
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
