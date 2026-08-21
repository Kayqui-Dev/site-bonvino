import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  // Starts hidden: it used to mount visible and stay forever, which on a phone
  // parked a 320px pill on top of the hero's primary CTA.
  const [showTooltip, setShowTooltip] = useState(false);
  const dismissed = useRef(false);

  const shown = useRef(false);

  useEffect(() => {
    // The hero already has its own WhatsApp CTA, and on a phone this pill
    // landed right on top of it. So the invitation waits until the reader has
    // scrolled past the hero, shows once, then retreats.
    let retreat;

    const onScroll = () => {
      if (shown.current || dismissed.current) return;
      if (window.scrollY < window.innerHeight * 0.85) return;

      shown.current = true;
      setShowTooltip(true);
      retreat = setTimeout(() => setShowTooltip(false), 7000);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(retreat);
    };
  }, []);

  const dismiss = () => {
    dismissed.current = true;
    setShowTooltip(false);
  };

  const whatsappMessage = encodeURIComponent(
    'Olá! Gostaria de falar com um advogado do escritório Bonvino & Pereira sobre um atendimento na Av. Paulista.'
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {/* Always mounted so it can animate out; inert + aria-hidden keep the
          retreated pill out of the tab order and off screen readers. */}
      <div
        aria-hidden={!showTooltip}
        inert={showTooltip ? undefined : ''}
        className={`relative mb-3 bg-navy-elevated text-ivory text-xs font-mono py-2 px-3.5 rounded-xl border border-platinum/40 shadow-2xl flex items-center gap-2 max-w-[15rem] sm:max-w-xs transition-all duration-500 ease-out ${
          showTooltip
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
        <span>Fale com um advogado agora</span>
        <button
          onClick={dismiss}
          className="text-ivory-muted hover:text-white ml-1 p-1 -m-1"
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
        aria-label="WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 animate-pulse-subtle transition-transform duration-200 active:scale-95"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </a>
    </div>
  );
}
