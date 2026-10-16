import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../site';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(/** @type {HTMLAnchorElement | null} */ (null));

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const visibleSections = new Map();
    const content = document.querySelector('.dossier-layout');
    const updateVisibility = () => {
      const hero = document.getElementById('hero');
      const button = buttonRef.current;
      if (!hero || !content || !button) return;
      const rightInset = parseFloat(getComputedStyle(button).right);
      const hasGutter = window.innerWidth - content.getBoundingClientRect().right >= rightInset + 64;
      setIsVisible(hasGutter && hero.getBoundingClientRect().bottom <= 0 && ![...visibleSections.values()].some(Boolean));
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) visibleSections.set(entry.target.id, entry.isIntersecting);
      updateVisibility();
    });
    const layoutObserver = new ResizeObserver(updateVisibility);
    if (content) layoutObserver.observe(content);
    window.addEventListener('resize', updateVisibility, { passive: true });
    for (const id of ['hero', 'contato', 'footer']) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => {
      observer.disconnect();
      layoutObserver.disconnect();
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  return (
    <a ref={buttonRef} href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="Agendar consulta pelo WhatsApp" hidden={!isVisible} className="whatsapp-float h-14 w-14 items-center justify-center rounded-full border border-platinum/40 bg-platinum text-navy shadow-xl transition-colors hover:bg-platinum-hover">
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
