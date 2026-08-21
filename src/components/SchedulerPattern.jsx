import React, { useState, useEffect } from 'react';
import { Calendar, MousePointer } from 'lucide-react';

const days = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
const slots = ['09:00', '11:00', '14:30', '16:30'];

export default function SchedulerPattern() {
  const [activeCell, setActiveCell] = useState({ day: 0, slot: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCell((prev) => {
        const nextSlot = (prev.slot + 1) % slots.length;
        const nextDay = nextSlot === 0 ? (prev.day + 1) % days.length : prev.day;
        return { day: nextDay, slot: nextSlot };
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy/90 border border-platinum/30 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="flex items-center gap-1.5 text-platinum font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Protocol Scheduler • Agenda Av. Paulista</span>
        </span>
        <span className="text-[10px] text-emerald-400">Disponível</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 text-[10px] font-mono text-center">
        {days.map((d, dIdx) => (
          <div key={dIdx} className="text-ivory-dim font-bold pb-1">
            {d}
          </div>
        ))}

        {slots.map((s, sIdx) =>
          days.map((_, dIdx) => {
            const isSelected = activeCell.day === dIdx && activeCell.slot === sIdx;
            return (
              <div
                key={`${dIdx}-${sIdx}`}
                className={`py-1 rounded border transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-platinum text-navy font-bold border-platinum scale-105 shadow-md shadow-platinum/30'
                    : 'bg-navy-card/60 border-white/5 text-ivory-muted'
                }`}
              >
                {s}
                {isSelected && (
                  <MousePointer className="w-3 h-3 text-navy absolute -bottom-1 -right-1 fill-navy animate-bounce" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
