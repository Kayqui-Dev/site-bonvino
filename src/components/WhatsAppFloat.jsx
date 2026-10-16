import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../site';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const visibleSections = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) visibleSections.set(entry.target.id, entry.isIntersecting);
      const hero = document.getElementById('hero');
      setIsVisible(Boolean(hero && hero.getBoundingClientRect().bottom <= 0 && ![...visibleSections.values()].some(Boolean)));
    });
    for (const id of ['hero', 'contato', 'footer']) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Agendar consulta pelo WhatsApp" hidden={!isVisible} className="whatsapp-float h-14 w-14 items-center justify-center rounded-full border border-platinum/40 bg-platinum text-navy shadow-xl transition-colors hover:bg-platinum-hover">
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
