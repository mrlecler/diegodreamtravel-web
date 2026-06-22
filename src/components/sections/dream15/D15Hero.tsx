const WA = 'https://wa.me/5493624703040?text=Hola%20Diego!%20Quiero%20info%20del%20viaje%20de%20quince.';

const SPARKLE = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.5c.4 5.2 5.3 10.1 10.5 10.5C17.3 12.4 12.4 17.3 12 22.5 11.6 17.3 6.7 12.4 1.5 12 6.7 11.6 11.6 6.7 12 1.5Z" />
  </svg>
);

const TP_STAR = (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="#00B67A">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.99 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.755 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const ARROW = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

type Sp = { top: string; left?: string; right?: string; color: string; size: number; anim: string };

const SPARKLES: Sp[] = [
  { top: '14%', left: '7%',   color: '#F5C842', size: 30, anim: 'qFloatPulse 5.5s ease-in-out infinite' },
  { top: '10%', right: '18%', color: '#F472B6', size: 20, anim: 'qFloatPulse 6.8s ease-in-out infinite .4s' },
  { top: '38%', left: '4%',   color: '#E84393', size: 14, anim: 'qFloatPulse 7s ease-in-out infinite 1.1s' },
  { top: '28%', left: '52%',  color: '#F9A8D4', size: 16, anim: 'qFloatPulse 8s ease-in-out infinite .7s' },
  { top: '6%',  right: '9%',  color: '#FDE68A', size: 12, anim: 'qStar 4.8s ease-in-out infinite 2s' },
  { top: '54%', right: '8%',  color: '#E84393', size: 22, anim: 'qFloatPulse 7s ease-in-out infinite .3s' },
  { top: '68%', left: '14%',  color: '#F472B6', size: 10, anim: 'qStar 9s ease-in-out infinite 1.6s' },
  { top: '45%', right: '22%', color: '#F5C842', size: 13, anim: 'qStar 6s ease-in-out infinite 2.5s' },
  { top: '16%', left: '44%',  color: '#FDE68A', size: 5,  anim: 'qGlitter 4.2s ease-in-out infinite 1.3s' },
  { top: '24%', right: '31%', color: '#F472B6', size: 6,  anim: 'qGlitter 5s ease-in-out infinite .8s' },
  { top: '40%', right: '36%', color: '#FDE68A', size: 4,  anim: 'qGlitter 4.5s ease-in-out infinite .5s' },
  { top: '57%', right: '27%', color: '#E84393', size: 5,  anim: 'qGlitter 3.5s ease-in-out infinite 1.7s' },
  { top: '73%', right: '42%', color: '#F9A8D4', size: 5,  anim: 'qGlitter 3.6s ease-in-out infinite 2.3s' },
];

export default function D15Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden flex flex-col"
      style={{ minHeight: '100svh' }}
    >
      {/* Fotos de fondo con crossfade lento (wdw01 <-> wdw02) */}
      <div className="absolute inset-0 z-0" style={{ background: '#120818' }}>
        <img src="/wdw01.jpg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <img src="/wdw02.webp" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover"
          style={{ animation: 'd15HeroFade 16s ease-in-out infinite' }} />
      </div>
      {/* Tinte de marca + oscurecido para legibilidad del texto */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: `
          radial-gradient(70% 60% at 72% 18%, rgba(232,67,147,.34), transparent 60%),
          radial-gradient(55% 50% at 12% 88%, rgba(148,42,142,.30), transparent 60%),
          linear-gradient(to bottom, rgba(18,8,24,.40) 0%, rgba(18,8,24,.12) 26%, rgba(18,8,24,.52) 60%, rgba(18,8,24,.97) 100%)
        `,
      }} />
      <style>{`
        @keyframes d15HeroFade {
          0%, 44% { opacity: 0; }
          54%, 94% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Sparkles flotantes */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="absolute z-[2] pointer-events-none"
          style={{
            top: s.top, left: s.left, right: s.right,
            color: s.color, width: s.size, height: s.size,
            animation: s.anim,
          }}
        >
          {SPARKLE}
        </div>
      ))}

      {/* Contenido */}
      <div
        className="relative z-[3] flex-1 flex flex-col justify-end w-full mx-auto px-6"
        style={{
          maxWidth: 'min(1080px, calc(100% - 48px))',
          paddingTop: 120,
          paddingBottom: 72,
        }}
      >
        <h1
          className="text-[#F0EDE8]"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(52px, 10.5vw, 138px)',
            lineHeight: 0.92,
            letterSpacing: 1,
            textShadow: '0 2px 32px rgba(232,67,147,.28)',
            animation: 'qFadeUp .7s ease .12s both',
            maxWidth: '14ch',
          }}
        >
          Tus 15 no se festejan. Se{' '}
          <em className="d15-accent" style={{ fontStyle: 'normal' }}>
            viajan
          </em>
          .
        </h1>

        <p
          className="text-[rgba(240,237,232,.92)] font-light"
          style={{
            marginTop: 26,
            maxWidth: 560,
            fontSize: 'clamp(16px, 1.7vw, 18px)',
            lineHeight: 1.65,
            animation: 'qFadeUp .7s ease .26s both',
          }}
        >
          El viaje grupal a Orlando para los que cumplen 15.{' '}
          <br className="hidden sm:block" />
          Disney, Universal y tu grupo. Yo armo cada detalle; vos solo lo vivís.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-3.5 mt-8"
          style={{ animation: 'qFadeUp .7s ease .4s both' }}
        >
          <a
            href="#form"
            className="d15-cta inline-flex items-center gap-2 text-white font-bold rounded-full no-underline"
            style={{
              fontSize: 14,
              letterSpacing: '.2px',
              padding: '16px 30px',
              background: 'var(--grad-d15)',
              boxShadow: '0 14px 34px -10px rgba(196,62,138,.8)',
            }}
          >
            Quiero sumarme
            {ARROW}
          </a>
          <a
            href={WA}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-[#F0EDE8] font-medium rounded-full no-underline glow-wa"
            style={{
              fontSize: 14,
              padding: '16px 28px',
              border: '1px solid rgba(240,237,232,.32)',
              background: 'rgba(18,8,24,.35)',
              backdropFilter: 'blur(6px)',
              transition: 'all .2s',
            }}
          >
            {WA_ICON}
            Hablá conmigo
          </a>
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-wrap items-center gap-3.5 mt-5"
          style={{ animation: 'qFadeUp .7s ease .54s both' }}
        >
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i}>{TP_STAR}</span>
              ))}
            </div>
            <span className="text-[12.5px] font-semibold text-[rgba(240,237,232,.88)]">
              Excelente en Trustpilot
            </span>
          </div>
          <span
            className="inline-block"
            style={{ width: 1, height: 12, background: 'rgba(240,237,232,.22)' }}
          />
          <span className="text-[12px] text-[rgba(240,237,232,.72)] tracking-[.3px]">
            Soy Agente oficial certificado Disney &amp; Universal · Operación seria de principio a fin
          </span>
        </div>
      </div>
    </section>
  );
}
