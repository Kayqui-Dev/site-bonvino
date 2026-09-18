import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '../site';

export default function WhatsAppFloat() {
  // Starts hidden: it used to mount visible and stay forever, which on a phone
  // parked a 320px pill on top of the hero's primary CTA.
  const [showTooltip, setShowTooltip] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const dismissed = useRef(false);

  const shown = useRef(false);

  useEffect(() => {
    // The hero already has its own WhatsApp CTA, and on a phone this pill
    // landed right on top of it. So the invitation waits until the reader has
    // scrolled past the hero, shows once, then retreats.
    let retreat;

    const onScroll = () => {
      const heroBottom = document.getElementById('hero')?.getBoundingClientRect().bottom;
      const hasPassedHero = heroBottom !== undefined && heroBottom <= 128;
      setPastHero(hasPassedHero);
      if (!hasPassedHero || shown.current || dismissed.current) return;

      shown.current = true;
      setShowTooltip(true);
      retreat = setTimeout(() => setShowTooltip(false), 7000);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(retreat);
    };
  }, []);

  const dismiss = () => {
    dismissed.current = true;
    setShowTooltip(false);
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <div className={`pointer-events-none fixed bottom-6 right-6 z-50 flex-col items-end select-none ${pastHero ? 'flex' : 'hidden lg:flex'}`}>
      {/* Always mounted so it can animate out; inert + aria-hidden keep the
          retreated pill out of the tab order and off screen readers. */}
      <div
        aria-hidden={!showTooltip}
        inert={!showTooltip}
        className={`relative mb-3 bg-navy-elevated text-ivory text-sm font-sans py-2 px-3.5 rounded-xl border border-platinum/40 shadow-2xl flex items-center gap-2 max-w-[15rem] sm:max-w-xs transition-all duration-500 ease-out ${
          showTooltip
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <span>Agende sua consulta jurídica</span>
        <button
          onClick={dismiss}
          type="button"
          className="text-ivory-muted hover:text-platinum p-2"
          aria-label="Fechar aviso"
        >
          <X className="w-3 h-3" />
        </button>
        <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-navy-elevated border-r border-b border-platinum/40 transform rotate-45" />
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar consulta pelo WhatsApp"
        className="pointer-events-auto w-14 h-14 rounded-full border border-platinum/40 bg-platinum text-navy hover:bg-platinum-hover flex items-center justify-center shadow-2xl shadow-navy/80 transition-transform duration-200 active:scale-95"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
      </a>
    </div>
  );
}
