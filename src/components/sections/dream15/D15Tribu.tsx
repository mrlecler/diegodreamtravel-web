import { Users, VideoCamera, UsersThree, Camera } from '@phosphor-icons/react/dist/ssr';
import IconBadge from '@/components/ui/IconBadge';

const BULLETS = [
  { Icon: Users,       text: 'Grupo reducido y exclusivo, no un viaje masivo de cientos' },
  { Icon: VideoCamera,       text: 'Se conocen antes de viajar: videollamada de bienvenida y grupo de WhatsApp del viaje' },
  { Icon: UsersThree,  text: 'Chicos y chicas, todos cumpliendo 15 al mismo tiempo' },
  { Icon: Camera,      text: 'Las fotos, las historias y los amigos que te llevás para siempre' },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Tribu() {
  return (
    <section
      id="tribu"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(52px,7vw,88px) 0' }}
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
              Te subís sin conocer a nadie. Bajás con tu grupo para{' '}
              <em className="d15-accent" style={{ fontStyle: 'normal' }}>siempre</em>.
            </h2>

            <p
              className="text-[rgba(240,237,232,.92)] font-light"
              style={{ marginTop: 24, fontSize: 16, lineHeight: 1.75 }}
            >
              No es un viaje familiar. Es tu momento, con los de tu edad. Un grupo mixto de chicos y
              chicas cumpliendo 15 al mismo tiempo, viviendo lo mismo. Arriba del avión arrancan como
              desconocidos; vuelven siendo el grupo del viaje que no se olvida.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {BULLETS.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <IconBadge Icon={Icon} ring="var(--grad-d15)" iconColor="#E879C0" size={34} iconSize={18} radius={11} />
                  </div>
                  <span className="text-[15px] font-light text-[rgba(240,237,232,.92)] leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual — fotos del grupo con crossfade */}
          <div
            className="relative rounded-3xl overflow-hidden flex flex-col items-end justify-end"
            style={{
              minHeight: 500,
              background: '#1C0B1A',
              border: '1px solid rgba(240,237,232,.08)',
            }}
          >
            {/* Fotos del grupo — crossfade entre las 4 (Disney + Universal) */}
            {['/wdw03.webp', '/uor01.avif', '/wdw04.webp', '/uor02.avif'].map((src, i) => (
              <img key={src} src={src} alt="" aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0, animation: 'd15TribuFade 28s ease-in-out infinite', animationDelay: `${i * 7}s` }} />
            ))}
            {/* Oscurecido para que el caption se lea */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(to top, rgba(18,8,24,.72) 0%, rgba(18,8,24,.06) 45%, rgba(18,8,24,.12) 100%)',
            }} />
            <style>{`
              @keyframes d15TribuFade {
                0% { opacity: 0; }
                6% { opacity: 1; }
                25% { opacity: 1; }
                31% { opacity: 0; }
                100% { opacity: 0; }
              }
            `}</style>
            {/* Sparkle decorativo */}
            <div
              className="absolute top-6 left-6 opacity-40"
              style={{ color: '#F5C842', width: 28, height: 28, animation: 'qFloatPulse 6s ease-in-out infinite' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5c.4 5.2 5.3 10.1 10.5 10.5C17.3 12.4 12.4 17.3 12 22.5 11.6 17.3 6.7 12.4 1.5 12 6.7 11.6 11.6 6.7 12 1.5Z" />
              </svg>
            </div>
            <div
              className="absolute top-10 right-10 opacity-30"
              style={{ color: '#F472B6', width: 14, height: 14, animation: 'qStar 4.5s ease-in-out infinite 1s' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1.5c.4 5.2 5.3 10.1 10.5 10.5C17.3 12.4 12.4 17.3 12 22.5 11.6 17.3 6.7 12.4 1.5 12 6.7 11.6 11.6 6.7 12 1.5Z" />
              </svg>
            </div>

            {/* Caption */}
            <div
              className="m-5 rounded-2xl px-5 py-3.5"
              style={{
                background: 'rgba(18,8,24,.72)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(240,237,232,.12)',
              }}
            >
              <p
                className="text-[#F0EDE8] font-light"
                style={{ fontFamily: 'var(--font-skatyn), serif', fontSize: 22, lineHeight: 1.15 }}
              >
                Tu grupo.
                <br />
                <span style={{ color: '#E84393' }}>Tu momento.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
