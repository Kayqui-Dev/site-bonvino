import React from 'react';
import { Award, ShieldCheck, MapPin, Building, UserCheck } from 'lucide-react';

export default function AboutPartners() {
  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-platinum font-mono font-semibold bg-platinum/10 py-1.5 px-4 rounded-full border border-platinum/30">
            Liderança & Experiência
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Sobre o Titular & Atuação
          </h2>
        </div>

        {/* Card Main */}
        <div className="glass-navy p-8 md:p-12 rounded-3rem border border-platinum/30 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl">
          {/* Photo Column — real studio portrait */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2rem overflow-hidden border border-platinum/25 relative group shadow-2xl shadow-navy-deep/40">
              <img
                src="/brand/dr-leandro-retrato.jpg"
                alt="Dr. Leandro Sousa Bonvino, titular do escritório"
                className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />

              {/* Navy grade + bottom scrim for the caption */}
              <div className="absolute inset-0 bg-navy-deep/20 mix-blend-color pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent pointer-events-none" />

              {/* Identity plate */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                <h3 className="text-xl font-serif font-bold text-ivory">
                  Dr. Leandro Sousa Bonvino
                </h3>
                <span className="text-[11px] text-platinum font-mono block tracking-wider uppercase">
                  Titular • OAB/SP
                </span>

                <div className="pt-3">
                  <div className="inline-flex items-center gap-1.5 bg-navy/80 backdrop-blur-sm border border-platinum/30 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-platinum">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sede Av. Paulista, 1636</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-platinum font-mono font-semibold">
                Advocacia de Excelência
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-ivory leading-snug">
                Dr. Leandro Sousa Bonvino
              </h3>
              <p className="text-xs text-platinum uppercase tracking-wider font-mono">
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
            <div className="bg-navy-elevated/80 border border-platinum/40 p-5 rounded-2rem flex items-start gap-4">
              <div className="p-3 rounded-xl bg-platinum/10 text-platinum shrink-0">
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
              <div className="bg-navy/60 p-3 rounded-xl border border-white/5 text-center">
                <span className="text-xl font-serif font-bold text-platinum block">10+ Anos</span>
                <span className="text-[10px] uppercase font-mono text-ivory-muted">De Experiência</span>
              </div>
              <div className="bg-navy/60 p-3 rounded-xl border border-white/5 text-center">
                <span className="text-xl font-serif font-bold text-platinum block">1000+</span>
                <span className="text-[10px] uppercase font-mono text-ivory-muted">Casos Atendidos</span>
              </div>
              <div className="bg-navy/60 p-3 rounded-xl border border-white/5 text-center col-span-2 sm:col-span-1">
                <span className="text-xl font-serif font-bold text-platinum block">Sigilo</span>
                <span className="text-[10px] uppercase font-mono text-ivory-muted">Absoluto OAB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
