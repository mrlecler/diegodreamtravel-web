const STEPS = [
  {
    n: '01',
    title: 'Reservás tu lugar',
    desc: 'Asegurás el cupo en el grupo desde el día uno, al precio de hoy.',
  },
  {
    n: '02',
    title: 'Pagás en cuotas',
    desc: 'Armás un plan mensual a tu medida. El viaje deja de ser un golpe y pasa a ser un plan.',
  },
  {
    n: '03',
    title: 'Cuidás el precio',
    desc: 'Anclás temprano y te cubrís de los aumentos. Empezar antes siempre juega a favor de tu bolsillo.',
  },
  {
    n: '04',
    title: 'Viajás con todo pago',
    desc: 'Cuando llega la fecha, el viaje ya está saldado. Solo te queda disfrutar.',
  },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Club() {
  return (
    <section
      id="club"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(72px,10vw,128px) 0' }}
    >
      {/* Glow central */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '70%', height: '60%', zIndex: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(245,200,66,.08), transparent 70%)',
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
            Club Dream 15 · Reservá y pagá en cuotas
          </span>
        </div>

        {/* Título */}
        <h2
          className="text-[#F0EDE8]"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            lineHeight: 0.96,
            letterSpacing: '.5px',
            maxWidth: '20ch',
          }}
        >
          Reservás hoy. Pagás en cuotas. Viajás con{' '}
          <em
            style={{
              fontStyle: 'normal',
              background: 'var(--grad-d15-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            todo pago
          </em>
          .
        </h2>

        <p
          className="text-[rgba(240,237,232,.82)] font-light"
          style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.75 }}
        >
          Con el <strong className="font-semibold text-[#F0EDE8]">Club Dream 15</strong> reservás el
          lugar ahora y lo pagás en cuotas a tu medida, mes a mes. Armás tu viaje con uno o dos años
          de anticipación y llegás con todo pago. Sin un solo golpe al bolsillo, sin apuros de último
          momento.
        </p>
        <p
          className="text-[rgba(240,237,232,.55)] font-light italic"
          style={{ marginTop: 12, fontSize: 15 }}
        >
          Pagar tu viaje al exterior en cuotas es algo que casi nadie te ofrece. Acá sí.
        </p>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {STEPS.map(({ n, title, desc }) => (
            <div
              key={n}
              className="rounded-[18px] p-7 flex flex-col gap-3"
              style={{
                background: '#1C0B1A',
                border: '1px solid rgba(240,237,232,.08)',
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontFamily: 'var(--font-skatyn), serif',
                  fontSize: 36,
                  lineHeight: 1,
                  background: 'var(--grad-d15-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {n}
              </span>
              <h3 className="text-[16px] font-bold text-[#F0EDE8]">{title}</h3>
              <p className="text-[14px] font-light leading-[1.6] text-[rgba(240,237,232,.82)]">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#form"
            className="inline-flex items-center gap-2 text-white font-bold rounded-full no-underline"
            style={{
              fontSize: 14,
              padding: '14px 28px',
              background: 'var(--grad-d15)',
              boxShadow: '0 12px 30px -10px rgba(196,62,138,.7)',
            }}
          >
            Sumate al Club
          </a>
          <span className="text-[13px] font-medium text-[rgba(240,237,232,.45)]">
            Cupos limitados por grupo
          </span>
        </div>
      </div>
    </section>
  );
}
