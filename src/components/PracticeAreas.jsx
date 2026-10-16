import { useEffect, useRef, useState } from 'react';
import { Scale, Briefcase, ShieldCheck, Users, Building2, Landmark, ShoppingCart, ReceiptText, MessageCircle, Plus } from 'lucide-react';
import { getWhatsAppUrl } from '../site';
import { PRACTICE_AREAS } from '../practice-areas';

const ICONS = [ShieldCheck, ReceiptText, Scale, Briefcase, Users, Building2, ShoppingCart, Landmark];

export default function PracticeAreas() {
  const sectionRef = useRef(/** @type {HTMLElement | null} */ (null));
  const [active, setActive] = useState(0);

  useEffect(() => {
    sectionRef.current?.setAttribute('data-interactive', 'true');
    let alignmentFrame = 0;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const keepDesktopOpen = (event) => {
      if (event.matches) setActive((current) => current < 0 ? 0 : current);
    };
    const selectLinkedArea = (hash) => {
      const index = PRACTICE_AREAS.findIndex((area) => hash === `#area-${area.id}`);
      if (index === -1) return false;
      setActive(index);
      window.cancelAnimationFrame(alignmentFrame);
      // Align after React commits: closing an earlier mobile folder changes the target's position.
      alignmentFrame = window.requestAnimationFrame(() => {
        const target = document.getElementById(`area-${PRACTICE_AREAS[index].id}`);
        target?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        target?.querySelector('button')?.focus({ preventScroll: true });
      });
      return true;
    };
    const syncHash = () => selectLinkedArea(window.location.hash);
    const handleAreaLink = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href^="#area-"]') : null;
      const hash = link?.getAttribute('href');
      if (!selectLinkedArea(hash)) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    };
    syncHash();
    desktop.addEventListener('change', keepDesktopOpen);
    window.addEventListener('hashchange', syncHash);
    document.addEventListener('click', handleAreaLink);
    return () => {
      window.cancelAnimationFrame(alignmentFrame);
      desktop.removeEventListener('change', keepDesktopOpen);
      window.removeEventListener('hashchange', syncHash);
      document.removeEventListener('click', handleAreaLink);
    };
  }, []);

  const handleSelect = (index) => {
    const collapsible = window.matchMedia('(max-width: 1023px)').matches;
    setActive((previous) => collapsible && previous === index ? -1 : index);
  };

  const onKeyDown = (event, index) => {
    const last = PRACTICE_AREAS.length - 1;
    let next = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    sectionRef.current?.querySelectorAll('button')[next]?.focus();
  };

  return (
    <section id="areas" ref={sectionRef} aria-labelledby="areas-title" className="section-shell relative z-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-12">
        <div className="flex max-w-2xl flex-col gap-5">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-platinum/50" />
            <span className="font-sans text-sm uppercase tracking-[0.16em] text-platinum">Áreas de atuação</span>
          </div>
          <h2 id="areas-title" className="section-title font-serif font-semibold leading-tight text-ivory text-balance">Selecione a matéria do seu caso.</h2>
          <p className="text-base leading-relaxed text-ivory-muted text-pretty">Cada pasta reúne as frentes que o escritório conduz naquela área. Abra a que corresponde à sua situação e fale direto com um advogado.</p>
        </div>
        <div className="flex flex-col gap-2.5 lg:min-h-[36rem] lg:flex-row">
          {PRACTICE_AREAS.map((area, index) => {
            const Icon = ICONS[index];
            const isOpen = active === index;
            return (
              <article key={area.id} id={`area-${area.id}`} data-open={isOpen} className={`dossier-item relative flex min-w-0 flex-col rounded-sm border ${isOpen ? 'border-platinum/45 bg-navy-elevated' : 'border-platinum/20 bg-navy-elevated/40 hover:border-platinum/40'}`}>
                {/* Chrome edge marks the open file, like a tab standing proud. */}
                <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-l-sm bg-platinum transition-opacity ${isOpen ? 'opacity-100' : 'opacity-20'}`} />
                <h3 className={isOpen ? 'm-0' : 'm-0 lg:flex-1'}>
                  <button id={`dossier-trigger-${area.id}`} type="button" onClick={() => handleSelect(index)} onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches) setActive(index);
                  }} onKeyDown={(event) => onKeyDown(event, index)} aria-label={area.title} aria-expanded={isOpen} aria-controls={`dossier-panel-${area.id}`} className="dossier-trigger h-full w-full rounded-sm text-left focus-visible:outline-offset-[-4px]">
                    <span className="flex items-center gap-3 px-5 py-4 lg:hidden">
                      <Icon className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" />
                      <span className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="text-sm uppercase tracking-wider text-platinum">{area.matter}</span>
                        <span className="font-serif text-lg font-semibold leading-snug text-ivory">{area.title}</span>
                      </span>
                      <Plus className={`h-5 w-5 shrink-0 text-platinum transition-transform ${isOpen ? 'rotate-[135deg]' : ''}`} aria-hidden="true" />
                    </span>
                    {isOpen ? (
                      <span className="hidden items-center gap-3 px-6 pt-6 lg:flex">
                        <Icon className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" />
                        <span className="text-sm uppercase tracking-wider text-platinum">{area.matter}</span>
                      </span>
                    ) : (
                      <span className="hidden h-full min-h-80 flex-col items-center justify-between gap-5 px-3 py-6 lg:flex">
                        <Icon className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" />
                        <span className="rotate-180 whitespace-nowrap font-serif text-lg font-semibold text-ivory [writing-mode:vertical-rl]">{area.title}</span>
                        <Plus className="h-5 w-5 shrink-0 text-platinum" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                </h3>
                <div id={`dossier-panel-${area.id}`} hidden={!isOpen} role="region" aria-labelledby={`dossier-trigger-${area.id}`} className="flex-1">
                  <div className="flex h-full min-w-0 flex-col gap-5 px-5 pb-6 lg:px-6 lg:pt-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span aria-hidden="true" className="hidden font-serif text-3xl font-semibold leading-tight text-ivory lg:inline">{area.title}</span>
                      {area.tag && <span className="rounded-sm bg-platinum px-3 py-1 text-sm font-medium uppercase tracking-wide text-navy">{area.tag}</span>}
                    </div>
                    <p className="max-w-lg text-sm leading-relaxed text-ivory-muted">{area.description}</p>
                    <div className="flex flex-col">
                      <span className="border-b border-platinum/20 pb-3 text-sm font-medium uppercase tracking-wider text-platinum">Frentes conduzidas</span>
                      <ul className="flex flex-col divide-y divide-platinum/15">
                        {area.fronts.map((front) => (
                          <li key={front} className="flex items-start gap-3 py-3 text-sm leading-relaxed text-ivory">
                            <span aria-hidden="true" className="shrink-0 text-platinum">—</span>
                            <span className="min-w-0">{front}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href={getWhatsAppUrl(`Olá! Gostaria de agendar uma consulta jurídica sobre ${area.title}.`)} target="_blank" rel="noopener noreferrer" className="btn-magnetic mt-auto inline-flex min-h-12 max-w-full items-center justify-center gap-2 self-start rounded-sm bg-platinum px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-navy hover:bg-platinum-hover">
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0">Falar sobre {area.matter.toLowerCase()}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
