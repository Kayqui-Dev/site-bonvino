import { useEffect, useRef } from 'react';

/** A failed animation must never leave institutional content hidden. */
export default function Reveal({ children }) {
  const ref = useRef(/** @type {HTMLDivElement | null} */ (null));

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || motion.matches || !('IntersectionObserver' in window)) return;
    let animation;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!motion.matches && typeof element.animate === 'function') {
        animation = element.animate([{ opacity: 0.85, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' });
      }
      observer.disconnect();
    }, { threshold: 0.05 });
    const stopMotion = () => {
      if (motion.matches) animation?.cancel();
    };
    observer.observe(element);
    motion.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener('change', stopMotion);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
