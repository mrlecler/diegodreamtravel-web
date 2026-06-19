import { Check } from 'lucide-react';

const BULLETS = [
  'Grupo reducido y exclusivo, no un viaje masivo de cientos',
  'Se conocen antes de viajar: videollamada de bienvenida y grupo de WhatsApp del viaje',
  'Chicos y chicas, todos cumpliendo 15 al mismo tiempo',
  'Las fotos, las historias y los amigos que te llevás para siempre',
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Tribu() {
  return (
    <section
      id="tribu"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(72px,10vw,128px) 0' }}
    >
      {/* Glow izquierdo */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%', left: '-8%', width: '55%', height: '65%', zIndex: 0,
          background: 'radial-gradient(circle at 30% 40%, rgba(232,67,147,.14), transparent 65%)',
        }}
      />

      <div
        className="relative z-[1] mx-auto px-6"
        style={{ maxWidth: 'min(1080px, calc(100% - 48px))' }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {EYEBROW_LINE}
              <span
                className="text-[11px] font-semibold tracking-[3px] uppercase"
                style={{ color: '#E07AC4' }}
              >
                Tu tribu
              </span>
            </div>

            <h2
              className="text-[#F0EDE8]"
              style={{
                fontFamily: 'var(--font-skatyn), serif',
                fontWeight: 400,
                fontSize: 'clamp(36px, 5.2vw, 68px)',
                lineHeight: 0.96,
                letterSpacing: '.5px',
                maxWidth: '18ch',
              }}
            >
              Te subís sin conocer a nadie. Bajás con{' '}
              <em
                style={{
                  fontStyle: 'normal',
                  background: 'var(--grad-d15-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                tu grupo
              </em>{' '}
              para siempre.
            </h2>

            <p
              className="text-[rgba(240,237,232,.82)] font-light"
              style={{ marginTop: 24, fontSize: 16, lineHeight: 1.75 }}
            >
              No es un viaje familiar. Es tu momento, con los de tu edad. Un grupo mixto de chicos y
              chicas cumpliendo 15 al mismo tiempo, viviendo lo mismo. Arriba del avión arrancan como
              desconocidos; vuelven siendo el grupo del viaje que no se olvida.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(232,67,147,.2)' }}
                  >
                    <Check size={11} style={{ color: '#E84393' }} />
                  </span>
                  <span className="text-[15px] font-light text-[rgba(240,237,232,.82)] leading-snug">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual placeholder */}
          <div
            className="rounded-3xl flex flex-col items-center justify-center gap-4 p-12 text-center"
            style={{
              background: '#1C0B1A',
              border: '1px solid rgba(240,237,232,.08)',
              minHeight: 340,
            }}
          >
            <div
              className="text-[72px] leading-none"
              style={{ fontFamily: 'var(--font-skatyn), serif', color: 'rgba(240,237,232,.12)' }}
            >
              ✦
            </div>
            <p
              className="font-light"
              style={{
                fontFamily: 'var(--font-skatyn), serif',
                fontSize: 28,
                color: 'rgba(240,237,232,.55)',
                lineHeight: 1.15,
              }}
            >
              Tu grupo.
              <br />
              Tu momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
