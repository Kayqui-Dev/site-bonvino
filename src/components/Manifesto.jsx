export default function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="section-shell relative border-y border-platinum/20 bg-navy text-ivory">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <span className="section-label">Manifesto de Atuação</span>
        <p className="text-base leading-relaxed text-ivory-muted text-pretty sm:text-xl">Cada caso exige atenção, estratégia e responsabilidade.</p>
        <h2 id="manifesto-title" className="section-title font-serif font-bold italic leading-tight text-platinum text-balance">
          Nós focamos em
          <span className="block text-ivory">proteger direitos.</span>
        </h2>
      </div>
    </section>
  );
}
