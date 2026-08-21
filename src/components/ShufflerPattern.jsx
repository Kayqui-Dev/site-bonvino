import React, { useState } from 'react';
import { Layers, RotateCcw } from 'lucide-react';

export default function ShufflerPattern({ items = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative min-h-[160px] flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3 text-platinum text-xs font-mono uppercase tracking-wider">
        <Layers className="w-3.5 h-3.5" />
        <span>Diagnostic Shuffler • Alternância de Frentes</span>
      </div>

      <div className="relative h-32 w-full">
        {items.map((item, idx) => {
          const isTop = idx === activeIdx;
          return (
            <button
              key={idx}
              type="button"
              aria-label={`Frente ${idx + 1}: ${item.text}. Clique para alternar.`}
              onClick={() => setActiveIdx((prev) => (prev + 1) % items.length)}
              className={`absolute inset-0 rounded-xl p-4 cursor-pointer transition-all duration-500 flex flex-col justify-between border text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-platinum ${
                isTop
                  ? 'bg-navy-elevated border-platinum z-20 translate-y-0 scale-100 shadow-xl shadow-black/80'
                  : 'bg-navy-card border-white/10 z-10 translate-y-3 scale-95 opacity-60 hover:opacity-90'
              }`}
              style={{
                transform: isTop
                  ? 'translateY(0px) scale(1)'
                  : `translateY(${ (idx + 1) * 6 }px) scale(${ 1 - (idx + 1) * 0.04 })`,
              }}
            >
              <div className="flex items-center justify-between text-xs w-full">
                <span className="font-mono text-platinum font-semibold">{item.tag}</span>
                {/* Icon instead of ↺ — that glyph is missing from JetBrains Mono and renders as tofu */}
                <span className="text-[10px] text-ivory-dim font-mono inline-flex items-center gap-1.5">
                  Alternar
                  <RotateCcw className="w-3 h-3" />
                </span>
              </div>
              <p className="text-xs text-ivory leading-relaxed font-medium">
                {item.text}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
