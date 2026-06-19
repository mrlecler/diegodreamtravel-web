const TP_STAR = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#00B67A">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.99 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.755 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

// Editá este array para agregar o modificar reseñas
const REVIEWS = [
  {
    name: 'María Virginia Munaretto',
    text: 'Diego es excelente. Siempre atento y rápido para resolver.',
  },
  {
    name: 'Hugo Martínez',
    text: 'El asesoramiento y la organización de Diego fueron clave para que el viaje saliera perfecto. Siempre estuvo pendiente y en comunicación con nosotros durante toda la estadía.',
  },
  {
    name: 'María Eugenia Munaretto',
    text: 'Excelente atención y servicio.',
  },
  // Diego: agregá 2 reseñas más acá:
  // { name: '', text: '' },
  // { name: '', text: '' },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Testimonials() {
  return (
    <section
      id="testimonios"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(72px,10vw,128px) 0' }}
    >
      {/* Glow fondo */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%', right: '-5%', width: '45%', height: '55%', zIndex: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(245,200,66,.1), transparent 65%)',
        }}
      />

      <div
        className="relative z-[1] mx-auto px-6"
        style={{ maxWidth: 'min(1080px, calc(100% - 48px))' }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          {EYEBROW_LINE}
          <span
            className="text-[11px] font-semibold tracking-[3px] uppercase"
            style={{ color: '#E07AC4' }}
          >
            Opiniones reales · Trustpilot
          </span>
        </div>

        {/* Título */}
        <h2
          className="text-[#F0EDE8]"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 0.96,
            letterSpacing: '.5px',
            maxWidth: '22ch',
          }}
        >
          No lo decimos nosotros. Lo dicen{' '}
          <em
            style={{
              fontStyle: 'normal',
              background: 'var(--grad-d15-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            quienes viajaron
          </em>{' '}
          con Diego.
        </h2>

        <p
          className="text-[rgba(240,237,232,.7)] font-light"
          style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7 }}
        >
          Opiniones reales de viajeros y familias que ya confiaron en Diego, verificadas en
          Trustpilot.
        </p>

        {/* Cards */}
        <div
          className="grid gap-4 mt-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="rounded-[18px] p-6 flex flex-col gap-4"
              style={{
                background: '#1C0B1A',
                border: '1px solid rgba(240,237,232,.08)',
              }}
            >
              {/* 5 estrellas */}
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i}>{TP_STAR}</span>
                ))}
              </div>
              <p className="text-[15px] font-light text-[rgba(240,237,232,.88)] leading-[1.65] flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <p className="text-[13px] font-semibold text-[rgba(240,237,232,.55)]">{r.name}</p>
            </div>
          ))}
        </div>

        {/* Link Trustpilot */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i}>{TP_STAR}</span>
            ))}
          </div>
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] font-semibold no-underline transition-colors"
            style={{ color: 'rgba(240,237,232,.72)' }}
          >
            Ver todas las opiniones en Trustpilot →
          </a>
        </div>
      </div>
    </section>
  );
}
