import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(
    "Olá, gostaria de agendar uma consulta jurídica com o Dr. Leandro Sousa Bonvino no escritório da Av. Paulista."
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <nav className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6">
      <div
        className={`max-w-5xl mx-auto rounded-full transition-all duration-300 px-5 sm:px-8 py-3.5 flex items-center justify-between ${
          isScrolled
            ? 'glass-nav shadow-2xl shadow-black/80'
            : 'bg-obsidian/40 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="focus:outline-none">
          <Logo />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-champagne link-hover font-medium">
            Home
          </a>
          <a href="#areas" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-champagne link-hover font-medium">
            Áreas de Atuação
          </a>
          <a href="#sobre" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-champagne link-hover font-medium">
            Sobre
          </a>
          <a href="#contato" className="text-xs uppercase tracking-wider text-ivory/80 hover:text-champagne link-hover font-medium">
            Contato
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-champagne hover:bg-champagne-hover text-obsidian font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full btn-magnetic shadow-lg shadow-champagne/10"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian stroke-none" />
            <span>Falar com Advogado</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-champagne text-obsidian"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-ivory-muted hover:text-champagne"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 max-w-5xl mx-auto glass-obsidian rounded-2rem p-6 space-y-4 shadow-2xl">
          <a
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-white/5"
          >
            Home
          </a>
          <a
            href="#areas"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-white/5"
          >
            Áreas de Atuação
          </a>
          <a
            href="#sobre"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-white/5"
          >
            Sobre os Sócios
          </a>
          <a
            href="#contato"
            onClick={() => setMobileOpen(false)}
            className="block text-sm uppercase tracking-wider text-ivory py-2 border-b border-white/5"
          >
            Contato
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-champagne text-obsidian font-bold text-xs uppercase tracking-wider py-3 rounded-full text-center mt-4"
          >
            <MessageCircle className="w-4 h-4 fill-obsidian" />
            <span>Falar com Advogado</span>
          </a>
        </div>
      )}
    </nav>
  );
}
