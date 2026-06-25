'use client';

import { useLang } from '@/lib/language';

// Carrusel de partners (logos blancos en /public/images/logos/white).
// Orden entremezclado para no agrupar variantes de una misma marca.
const PARTNERS = [
  'disney-wdw',
  'universal-orlando',
  'royal-caribbean',
  'expedia',
  'seaworld',
  'legoland',
  'disney-california',
  'busch-gardens',
  'holafly',
  'universal',
  'civitatis',
  'brightline',
  'disney-paris',
  'visit-orlando',
  'hellotickets',
  'bookingcars',
  'pax',
];

export default function TrustBar() {
  const { t } = useLang();
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative py-5 sm:py-6 overflow-hidden" style={{ backgroundColor: '#0C1521' }}>
      {/* hairline superior con el gradiente de marca */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg,#F47B45,#E63957,#C44E92,#42C2C2)',
          opacity: 0.5,
        }}
      />

      <style>{`
        @keyframes trustMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-trust-marquee {
          animation: trustMarquee 35s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-trust-marquee { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
        {/* Rótulo fijo: queda quieto mientras las marcas desfilan al lado */}
        <div className="flex items-center gap-3 shrink-0 relative z-10 sm:pr-7 sm:mr-1 sm:border-r sm:border-white/10">
          <span className="shrink-0 rounded-full" style={{ width: 18, height: 2, backgroundColor: '#FF5B00' }} />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#F0EDE8]/60 whitespace-nowrap">
            {t.trustBar.label}
          </span>
        </div>

        {/* Marquee de logos */}
        <div
          className="relative overflow-hidden flex-1 w-full"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 4%, black 92%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 4%, black 92%, transparent)',
          }}
        >
          <div className="animate-trust-marquee flex shrink-0 items-center w-max">
            {doubled.map((p, i) => (
              <span key={i} className="inline-flex items-center justify-center px-6 sm:px-8 shrink-0">
                <img
                  src={`/images/logos/white/${p}.png`}
                  alt={p.replace(/-/g, ' ')}
                  className="h-6 sm:h-7 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
