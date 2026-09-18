import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { FIRM, getWhatsAppUrl } from '../site';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = (event) => event.matches && setMobileOpen(false);
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [mobileOpen]);

  const whatsappUrl = getWhatsAppUrl();

  return (
    <nav aria-label="Navegação principal" className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6">
      <div
        className={`max-w-5xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-8 py-3.5 flex items-center justify-between ${
          isScrolled
            ? 'glass-nav shadow-2xl shadow-navy/80'
            : 'bg-navy/40 backdrop-blur-md border border-platinum/15'
        }`}
      >
        {/* Logo */}
        <a href="#hero" aria-label={`${FIRM.name} — início`} className="rounded-full">
          <Logo />
        </a>

        {/* Desktop Links. Switched at lg, not md: at 768px the four links plus
            the CTA overflowed the bar by 22px and pushed the page sideways. */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#hero" className="text-sm uppercase tracking-wider text-ivory/80 hover:text-platinum link-hover font-medium">
            Início
          </a>
          <a href="#areas" className="text-sm uppercase tracking-wider text-ivory/80 hover:text-platinum link-hover font-medium">
            Áreas de Atuação
          </a>
          <a href="#sobre" className="text-sm uppercase tracking-wider text-ivory/80 hover:text-platinum link-hover font-medium">
            Sobre
          </a>
          <a href="#contato" className="text-sm uppercase tracking-wider text-ivory/80 hover:text-platinum link-hover font-medium">
            Contato
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-platinum hover:bg-platinum-hover text-navy font-semibold text-sm tracking-wider uppercase px-5 py-2.5 rounded-full btn-magnetic shadow-lg shadow-platinum/10"
          >
            <MessageCircle className="w-4 h-4 fill-navy stroke-none" />
            <span>Agendar consulta</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full bg-platinum text-navy"
            aria-label="Agendar consulta pelo WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-navy" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="p-3 text-ivory-muted hover:text-platinum"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div id="mobile-navigation" className="lg:hidden mt-2 max-w-5xl mx-auto glass-nav rounded-3xl p-6 shadow-2xl">
          <a
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-platinum/15"
          >
            Início
          </a>
          <a
            href="#areas"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-platinum/15"
          >
            Áreas de Atuação
          </a>
          <a
            href="#sobre"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-platinum/15"
          >
            Sobre os Sócios
          </a>
          <a
            href="#contato"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-platinum/15"
          >
            Contato
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-platinum text-navy font-bold text-sm uppercase tracking-wider py-3 rounded-full text-center mt-4"
          >
            <MessageCircle className="w-4 h-4 fill-navy" />
            <span>Agendar consulta</span>
          </a>
        </div>
      )}
    </nav>
  );
}
