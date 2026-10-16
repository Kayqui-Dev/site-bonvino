import { MapPin, Building } from 'lucide-react';

/**
 * The two founding partners, presented with equal visual weight to match the
 * "Bonvino & Pereira" mark. No unverified registration numbers are added.
 */
const partners = [
  {
    name: 'Leandro Bonvino',
    role: 'Sócio fundador',
    focus: 'Advocacia Criminal Estratégica',
    photo: 'leandro-bonvino',
    // Biasing upward keeps the face when the 2:3 portrait is cropped to 4:5.
    imgStyle: { objectPosition: 'center 18%' },
    bio: 'À frente da atuação penal do escritório, Leandro Bonvino conduz a defesa de pessoas e empresas em investigações e processos criminais. Sua abordagem combina análise criteriosa das provas, construção de teses defensivas e atuação em habeas corpus e medidas de urgência, com atendimento humanizado e acompanhamento próximo em cada etapa.',
  },
  {
    name: 'Denilson Pereira',
    role: 'Sócio fundador',
    focus: 'Direito Tributário e Assessoria Empresarial',
    photo: 'denilson-pereira',
    imgStyle: { objectPosition: 'center 18%' },
    bio: 'Com foco em Direito Tributário, Denilson Pereira assessora empresas no planejamento fiscal, na análise de créditos e na recuperação tributária, conforme a legislação aplicável. Atua na prevenção de riscos e no contencioso administrativo e judicial, conectando a estratégia jurídica às decisões e à realidade de cada negócio.',
  },
];

const PHOTO_SIZES = '(min-width: 1376px) 624px, (min-width: 1024px) calc((100vw - 8rem) / 2), (min-width: 768px) calc((100vw - 5rem) / 2), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)';
const photoSources = (photo, format) => [320, 480, 768, 1023].map((width) => `/brand/socio-${photo}-${width}.${format} ${width}w`).join(', ');

export default function AboutPartners() {
  return (
    <section id="sobre" aria-labelledby="partners-title" className="section-shell relative z-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="section-label">Liderança &amp; Experiência</span>
          <h2 id="partners-title" className="section-title font-serif font-bold text-ivory text-balance">Os sócios</h2>
          <p className="text-base leading-relaxed text-ivory-muted text-pretty">Uma sociedade construída a quatro mãos, onde cada cliente é acompanhado diretamente por um dos titulares — sem intermediários.</p>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {partners.map((partner) => (
            <article key={partner.name} className="partner-card glass-navy flex min-w-0 flex-col overflow-hidden rounded-3xl shadow-xl sm:rounded-3rem">
              <div className="relative aspect-[4/5] overflow-hidden">
                <picture className="block h-full w-full">
                  <source type="image/avif" srcSet={photoSources(partner.photo, 'avif')} sizes={PHOTO_SIZES} />
                  <source type="image/webp" srcSet={photoSources(partner.photo, 'webp')} sizes={PHOTO_SIZES} />
                  <img src={`/brand/socio-${partner.photo}-768.webp`} alt={`${partner.name}, ${partner.role.toLowerCase()} do escritório`} width={1023} height={1537} loading="lazy" decoding="async" sizes={PHOTO_SIZES} style={partner.imgStyle} className="h-full w-full object-cover" />
                </picture>
                {/* Light navy grade preserves the real color of the partners' suits. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 sm:p-6">
                  <h3 className="font-serif text-xl font-bold text-ivory text-balance sm:text-2xl">{partner.name}</h3>
                  <span className="text-sm uppercase leading-relaxed tracking-wide text-platinum">{partner.role} • OAB/SP</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-8">
                <h4 className="font-sans text-sm font-semibold uppercase leading-relaxed tracking-wider text-platinum text-balance">{partner.focus}</h4>
                <p className="text-base leading-relaxed text-ivory-muted text-pretty">{partner.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="glass-navy grid min-w-0 grid-cols-1 items-center gap-6 rounded-3xl p-5 sm:rounded-3rem sm:p-8 lg:grid-cols-12 lg:p-10">
          <div className="flex min-w-0 items-start gap-4 lg:col-span-7">
            <div className="hidden shrink-0 rounded-xl bg-platinum/10 p-3 text-platinum sm:block"><Building className="h-6 w-6" aria-hidden="true" /></div>
            <div className="flex min-w-0 flex-col items-start gap-3">
              <h3 className="font-serif text-lg font-bold leading-snug text-ivory text-balance">Atendimento na Av. Paulista, coração financeiro de SP</h3>
              <p className="text-sm leading-relaxed text-ivory-muted">Endereço nobre e de fácil acesso para reuniões presenciais discretas: <strong>Av. Paulista 1636, Sala 103, Bela Vista</strong>.</p>
              <div className="inline-flex max-w-full items-start gap-2 rounded-2xl border border-platinum/30 bg-navy/80 px-3 py-2 text-sm leading-relaxed text-platinum">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">Sede Av. Paulista, 1636</span>
              </div>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-3">
            {[
              ['Proximidade', 'Contato com os sócios'],
              ['Estratégia', 'Análise individual'],
              ['Sigilo', 'Ética profissional'],
            ].map(([title, description]) => (
              <div key={title} className="flex min-w-0 flex-col gap-1 rounded-xl border border-platinum/15 bg-navy/60 p-3 text-center">
                <span className="font-serif text-lg font-bold text-platinum">{title}</span>
                <span className="text-sm leading-relaxed text-ivory-muted">{description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
