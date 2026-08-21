import React from 'react';
import { MapPin, Building } from 'lucide-react';

/**
 * The two founding partners, presented with equal visual weight to match the
 * "Bonvino & Pereira" mark.
 *
 * TODO: Dr. Denilson's bio, practice focus and OAB number are still pending.
 * The copy below is deliberately neutral — no invented credentials, years of
 * experience or registration numbers. Replace `bio` when the real data arrives.
 */
const partners = [
  {
    name: 'Dr. Leandro Sousa Bonvino',
    role: 'Sócio fundador',
    photo: '/brand/socio-leandro-bonvino.jpg',
    // Seated studio portrait, 2:3. The container is 4:5, so cover trims height
    // only — biasing upward keeps the face and drops the empty lower frame.
    imgStyle: { objectPosition: 'center 18%' },
    bio: 'Com mais de 10 anos de experiência na advocacia contenciosa e consultiva, construiu uma trajetória pautada na ética inegociável, rigor acadêmico e resultados expressivos em demandas cíveis, trabalhistas e empresariais.',
  },
  {
    name: 'Dr. Denilson Pereira',
    role: 'Sócio fundador',
    photo: '/brand/socio-denilson-pereira.jpg',
    // Same framing as Leandro's, so no corrective zoom is needed any more —
    // the old lobby shot that required it has been replaced.
    imgStyle: { objectPosition: 'center 18%' },
    bio: 'Sócio fundador do escritório, dedica-se à condução estratégica de processos e ao acompanhamento direto de cada cliente, sustentando o mesmo compromisso com técnica e discrição que define a banca.',
  },
];

export default function AboutPartners() {
  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-platinum font-mono font-semibold bg-platinum/10 py-1.5 px-4 rounded-full border border-platinum/30">
            Liderança &amp; Experiência
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-ivory">
            Os sócios
          </h2>
          <p className="text-ivory-muted text-base leading-relaxed text-pretty">
            Uma sociedade construída a quatro mãos, onde cada cliente é acompanhado
            diretamente por um dos titulares — sem intermediários.
          </p>
        </div>

        {/* Partners — equal weight, side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner) => (
            <article
              key={partner.name}
              className="glass-navy rounded-3rem border border-platinum/30 overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="aspect-[4/5] relative overflow-hidden group">
                <img
                  src={partner.photo}
                  alt={`${partner.name}, ${partner.role.toLowerCase()} do escritório`}
                  style={partner.imgStyle}
                  className="w-full h-full object-cover"
                />

                {/* Light navy grade only — a heavier blend would wash out the
                    rose of Leandro's suit, which is a real brand detail. */}
                <div className="absolute inset-0 bg-navy-deep/10 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/15 to-transparent pointer-events-none" />

                {/* Identity plate */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                  <h3 className="text-xl font-serif font-bold text-ivory text-balance">
                    {partner.name}
                  </h3>
                  <span className="text-[11px] text-platinum font-mono block tracking-wider uppercase">
                    {partner.role} • OAB/SP
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow">
                <p className="text-ivory-muted text-base leading-relaxed text-pretty">
                  {partner.bio}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Firm-level facts, shared by both partners */}
        <div className="glass-navy p-8 md:p-10 rounded-3rem border border-platinum/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-7">
            <div className="bg-navy-elevated/80 border border-platinum/40 p-5 rounded-2rem flex items-start gap-4 h-full">
              <div className="p-3 rounded-xl bg-platinum/10 text-platinum shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-ivory font-serif font-bold text-base text-balance">
                  Atendimento na Av. Paulista, coração financeiro de SP
                </h4>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Endereço nobre e de fácil acesso para reuniões presenciais discretas:{' '}
                  <strong>Av. Paulista 1636, Sala 103, Bela Vista</strong>.
                </p>
                <div className="pt-3">
                  <div className="inline-flex items-center gap-1.5 bg-navy/80 border border-platinum/30 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-platinum">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Sede Av. Paulista, 1636</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-navy/60 p-3 rounded-xl border border-platinum/10 text-center">
              <span className="text-xl font-serif font-bold text-platinum block">10+ Anos</span>
              <span className="text-[10px] uppercase font-mono text-ivory-muted">De Experiência</span>
            </div>
            <div className="bg-navy/60 p-3 rounded-xl border border-platinum/10 text-center">
              <span className="text-xl font-serif font-bold text-platinum block">1000+</span>
              <span className="text-[10px] uppercase font-mono text-ivory-muted">Casos Atendidos</span>
            </div>
            <div className="bg-navy/60 p-3 rounded-xl border border-platinum/10 text-center col-span-2 sm:col-span-1">
              <span className="text-xl font-serif font-bold text-platinum block">Sigilo</span>
              <span className="text-[10px] uppercase font-mono text-ivory-muted">Absoluto OAB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
