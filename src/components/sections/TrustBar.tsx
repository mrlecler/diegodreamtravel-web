'use client';

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
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative py-6 overflow-hidden" style={{ backgroundColor: '#0C1521' }}>
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
          animation: trustMarquee 45s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-trust-marquee { animation: none; }
        }
      `}</style>

      <div
        className="flex"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="animate-trust-marquee flex shrink-0 items-center">
          {doubled.map((p, i) => (
            <span key={i} className="inline-flex items-center justify-center px-8 shrink-0">
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
    </section>
  );
}
