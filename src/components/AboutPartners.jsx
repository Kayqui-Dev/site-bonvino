import React from 'react';
import { Award, ShieldCheck, MapPin, Building, UserCheck } from 'lucide-react';

export default function AboutPartners() {
  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-mono font-semibold bg-champagne/10 py-1.5 px-4 rounded-full border border-champagne/30">
            Liderança & Experiência
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Sobre o Titular & Atuação
          </h2>
        </div>

        {/* Card Main */}
        <div className="glass-obsidian p-8 md:p-12 rounded-3rem border border-champagne/30 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl">
          {/* Photo Placeholder Column */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2rem bg-gradient-to-b from-obsidian-elevated to-obsidian border-2 border-champagne/30 overflow-hidden flex flex-col items-center justify-center p-6 text-center relative group">
              {/* Glow */}
              <div className="absolute inset-0 bg-radial from-champagne/15 to-transparent pointer-events-none" />

              <div className="w-24 h-24 rounded-full bg-obsidian border-2 border-champagne flex items-center justify-center mb-4 shadow-2xl">
                <span className="font-serif text-3xl font-bold text-champagne">LB</span>
              </div>

              <div className="space-y-1 z-10">
                <span className="text-xs font-mono uppercase text-champagne tracking-widest block font-semibold">
                  [FOTO DR. LEANDRO]
                </span>
                <h3 className="text-xl font-serif font-bold text-ivory">Dr. Leandro Sousa Bonvino</h3>
                <span className="text-xs text-ivory-muted font-mono block">Titular • OAB/SP nº 123.456</span>
              </div>

              {/* Location Badge */}
              <div className="mt-6 bg-obsidian/90 border border-champagne/40 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-mono text-champagne">
                <MapPin className="w-3.5 h-3.5" />
                <span>Sede Av. Paulista, 1636</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-champagne font-mono font-semibold">
                Advocacia de Excelência
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-ivory leading-snug">
                Dr. Leandro Sousa Bonvino
              </h3>
              <p className="text-xs text-champagne uppercase tracking-wider font-mono">
                Titular da Bonvino Sociedade Individual de Advocacia
              </p>
            </div>

            <p className="text-ivory-muted text-base leading-relaxed">
              Com mais de <strong>10 anos de experiência</strong> na advocacia contenciosa e consultiva, o Dr. Leandro construiu uma trajetória pautada na ética inegociável, rigor acadêmico e resultados expressivos em demandas cíveis, trabalhistas e empresariais.
            </p>

            <p className="text-ivory-muted text-base leading-relaxed">
              Sua atuação combina profundo conhecimento técnico com uma abordagem humana e estratégica. Cada cliente é atendido de forma personalizada, acompanhando diretamente todas as etapas processuais sem intermediários.
            </p>

            {/* Av. Paulista Spotlight Box */}
            <div className="bg-obsidian-elevated/80 border border-champagne/40 p-5 rounded-2rem flex items-start gap-4">
              <div className="p-3 rounded-xl bg-champagne/10 text-champagne shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-ivory font-serif font-bold text-base">
                  Atendimento na Av. Paulista, coração financeiro de SP
                </h4>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Endereço nobre e de fácil acesso para reuniões presenciais discretas: <strong>Av. Paulista 1636, Sala 103, Bela Vista</strong>.
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-obsidian/60 p-3 rounded-xl border border-white/5 text-center">
                <span className="text-xl font-serif font-bold text-champagne block">10+ Anos</span>
                <span className="text-[10px] uppercase font-mono text-ivory-muted">De Experiência</span>
              </div>
              <div className="bg-obsidian/60 p-3 rounded-xl border border-white/5 text-center">
                <span className="text-xl font-serif font-bold text-champagne block">1000+</span>
                <span className="text-[10px] uppercase font-mono text-ivory-muted">Casos Atendidos</span>
              </div>
              <div className="bg-obsidian/60 p-3 rounded-xl border border-white/5 text-center col-span-2 sm:col-span-1">
                <span className="text-xl font-serif font-bold text-champagne block">Sigilo</span>
                <span className="text-[10px] uppercase font-mono text-ivory-muted">Absoluto OAB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
