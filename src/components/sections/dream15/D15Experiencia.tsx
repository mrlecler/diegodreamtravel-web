import { MagicWand, Ticket, Camera, AirplaneTilt, ForkKnife, Heart } from '@phosphor-icons/react/dist/ssr';

const CARDS = [
  {
    Icon: MagicWand,
    title: 'Disney & Universal',
    desc: 'Los parques completos, los shows, los castillos y cada personaje. El escenario más mágico del mundo.',
  },
  {
    Icon: Ticket,
    title: 'Entradas y reservas',
    desc: 'Entradas, reservas especiales y los lugares que hay que vivir, ya resueltos. Sin filas eternas, sin perderte nada.',
  },
  {
    Icon: Camera,
    title: 'Fotos que quedan',
    desc: 'El momento, tu grupo y mil historias entrando. Recuerdos que vas a mirar el resto de tu vida.',
  },
  {
    Icon: AirplaneTilt,
    title: 'De punta a punta',
    desc: 'Vuelos, hotel, traslados y cada detalle coordinado. Salís de casa y ya está todo pensado.',
  },
  {
    Icon: ForkKnife,
    title: 'Cena de bienvenida',
    desc: 'El viaje arranca con una cena especial en un lugar icónico. Hard Rock o Planet Hollywood. El grupo se conoce y todo empieza a lo grande.',
  },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Experiencia() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(52px,7vw,88px) 0' }}
    >
      {/* Glow fondo derecho */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-5%', width: '50%', height: '60%', zIndex: 0,
          background: 'radial-gradient(circle at 70% 30%, rgba(232,67,147,.16), transparent 65%)',
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
            La experiencia
          </span>
        </div>

        {/* Título */}
        <h2
          className="text-[#F0EDE8]"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(38px, 5.6vw, 74px)',
            lineHeight: 0.96,
            letterSpacing: '.5px',
            maxWidth: '18ch',
          }}
        >
          No es un viaje cualquiera. Es{' '}
          <em className="d15-accent" style={{ fontStyle: 'normal' }}>el</em>{' '}
          viaje.
        </h2>

        <p
          className="text-[rgba(240,237,232,.92)] font-light"
          style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.75 }}
        >
          El escenario es Orlando: Disney, Universal, los parques y todos los personajes que viste
          desde siempre. Vos viajás, la vivís y posás para la foto. Lo demás lo armo yo, pieza por
          pieza.
        </p>

        {/* Cards — 5 en fila en desktop */}
        <div
          className="grid gap-3.5 mt-12"
          style={{
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          }}
        >
          {/* Mobile: 2 cols, overridden by inline grid */}
          <style>{`
            @media (max-width: 767px) {
              .exp-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .exp-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
          `}</style>
        </div>
        <div
          className="exp-grid grid gap-3.5 mt-12"
          style={{
            gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          }}
        >
          {CARDS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-[18px] flex flex-col transition-all duration-[250ms] hover:-translate-y-1"
              style={{
                background: '#1C0B1A',
                border: '1px solid rgba(240,237,232,.08)',
                padding: '28px 24px',
              }}
            >
              <div
                className="mb-4 flex-shrink-0"
                style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'var(--grad-d15)',
                  padding: 1.5,
                  boxShadow: '0 10px 26px -12px rgba(196,62,138,.55)',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ borderRadius: 12.5, background: '#150813', color: '#E879C0' }}
                >
                  <Icon size={23} weight="duotone" />
                </div>
              </div>
              <h3 className="text-[14px] font-bold text-[#F0EDE8] mb-1.5 leading-tight">{title}</h3>
              <p className="text-[12.5px] font-light leading-[1.6] text-[rgba(240,237,232,.72)]">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Nota familia add-on */}
        <div
          className="mt-8 rounded-2xl px-5 py-4 flex items-start gap-3"
          style={{ background: 'rgba(245,200,66,.07)', border: '1px solid rgba(245,200,66,.22)' }}
        >
          <div className="flex-shrink-0 mt-0.5" style={{ color: '#F5C842' }}>
            <Heart size={18} weight="duotone" />
          </div>
          <p className="text-[14px] font-light text-[rgba(245,200,66,.85)] leading-relaxed">
            <strong className="font-semibold text-[rgba(245,200,66,.95)]">
              ¿Querés que tu familia te acompañe?
            </strong>{' '}
            Es un add-on opcional. Si mamá, papá o quien quieras suma su lugar, lo agregamos sin que
            cambie tu plan.
          </p>
        </div>
      </div>
    </section>
  );
}
