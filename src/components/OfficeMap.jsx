import { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { FIRM } from '../site';

export default function OfficeMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const address = encodeURIComponent(FIRM.address);

  return (
    <div className="glass-navy flex min-w-0 flex-col rounded-3xl p-3">
      <div className="flex min-h-56 flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-platinum/20 bg-navy text-ivory">
        {isLoaded ? (
          <iframe
            title="Mapa do escritório na Avenida Paulista, 1636"
            src={`https://www.google.com/maps?q=${address}&output=embed&hl=pt-BR`}
            width="100%"
            height="224"
            className="h-56 w-full border-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 p-5 text-center">
            <MapPin className="h-6 w-6 text-platinum" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ivory-muted">O mapa só é carregado quando solicitado.</p>
            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="min-h-11 rounded-full border border-platinum/40 px-5 py-3 text-sm font-medium text-platinum transition-colors hover:bg-platinum/10"
            >
              Carregar mapa do Google
            </button>
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-sm text-platinum underline-offset-4 hover:underline"
      >
        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        Abrir rota no Google Maps
      </a>
    </div>
  );
}
