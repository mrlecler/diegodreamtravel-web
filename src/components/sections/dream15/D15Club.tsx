import { Wallet, CalendarCheck, SealCheck, Sparkle, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import IconBadge from '@/components/ui/IconBadge';

const STEPS = [
  {
    n: '01',
    Icon: Wallet,
    title: 'Reservás tu lugar',
    desc: 'Asegurás el cupo en el grupo desde el día uno, al precio de hoy.',
  },
  {
    n: '02',
    Icon: CalendarCheck,
    title: 'Pagás en cuotas',
    desc: 'Armás un plan mensual a tu medida. El viaje deja de ser un golpe y pasa a ser un plan.',
  },
  {
    n: '03',
    Icon: SealCheck,
    title: 'Cuidás el precio',
    desc: 'Anclás temprano y te cubrís de los aumentos. Empezar antes siempre juega a favor de tu bolsillo.',
  },
  {
    n: '04',
    Icon: Sparkle,
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
      style={{ background: '#120818', padding: 'clamp(52px,7vw,88px) 0' }}
    >
      {/* Glow fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'radial-gradient(60% 50% at 50% 30%, rgba(232,67,147,.16), transparent 65%)',
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
          Reservás hoy. Pagás en cuotas. Viajás con todo{' '}
          <em className="d15-accent" style={{ fontStyle: 'normal' }}>pago</em>.
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
          {STEPS.map(({ n, Icon, title, desc }) => (
            <div
              key={n}
              className="rounded-[18px] p-7 flex flex-col gap-3 transition-all duration-[250ms] hover:-translate-y-1"
              style={{
                background: '#1C0B1A',
                border: '1px solid rgba(240,237,232,.08)',
              }}
            >
              <div className="flex items-center justify-between">
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
                <IconBadge Icon={Icon} ring="var(--grad-d15)" iconColor="#E879C0" size={36} iconSize={19} radius={10} />
              </div>
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
            className="d15-cta inline-flex items-center gap-2 text-white font-bold rounded-full no-underline"
            style={{
              fontSize: 14,
              padding: '14px 28px',
              background: 'var(--grad-d15)',
              boxShadow: '0 12px 30px -10px rgba(196,62,138,.7)',
            }}
          >
            Sumate al Club
            <ArrowRight size={16} weight="bold" />
          </a>
          <span
            className="inline-flex items-center gap-2 text-[13px] font-medium rounded-full px-4 py-2"
            style={{
              color: '#F5C842',
              border: '1px solid rgba(245,200,66,.4)',
              boxShadow: '0 0 18px rgba(245,200,66,.25)',
            }}
          >
            Cupos limitados por grupo
          </span>
        </div>
      </div>
    </section>
  );
}
