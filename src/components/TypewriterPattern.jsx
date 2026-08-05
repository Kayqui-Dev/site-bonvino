import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function TypewriterPattern({ textLines = [] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!textLines.length) return;
    const currentFullLine = textLines[lineIndex];

    if (charIndex < currentFullLine.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentFullLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setLineIndex((prev) => (prev + 1) % textLines.length);
        setCharIndex(0);
        setDisplayText('');
      }, 2500);
      return () => clearTimeout(lineTimeout);
    }
  }, [charIndex, lineIndex, textLines]);

  return (
    <div className="bg-obsidian/90 border border-champagne/30 rounded-xl p-4 font-mono text-xs space-y-2">
      <div className="flex items-center justify-between text-[11px] text-ivory-muted border-b border-white/10 pb-2">
        <span className="flex items-center gap-1.5 text-champagne font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Telemetry Feed • Casos Atendidos</span>
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      <div className="min-h-[48px] text-ivory flex items-center">
        <span>{displayText}</span>
        <span className="inline-block w-2 h-4 bg-champagne ml-1 animate-pulse" />
      </div>
    </div>
  );
}
