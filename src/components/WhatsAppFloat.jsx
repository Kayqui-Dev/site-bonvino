import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappMessage = encodeURIComponent(
    'Olá! Gostaria de falar com um advogado do escritório Bonvino & Pereira sobre um atendimento na Av. Paulista.'
  );
  const whatsappUrl = `https://wa.me/551191737691?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
      {showTooltip && (
        <div className="relative mb-3 bg-navy-elevated text-ivory text-xs font-mono py-2 px-3.5 rounded-xl border border-platinum/40 shadow-2xl flex items-center gap-2 max-w-xs animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span>Fale com um advogado agora</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-ivory-muted hover:text-white ml-1 p-0.5"
            aria-label="Fechar"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-navy-elevated border-r border-b border-platinum/40 transform rotate-45" />
        </div>
      )}

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
