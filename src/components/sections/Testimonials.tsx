'use client';

import { useLang } from '@/lib/language';

// Estrellas estilo Trustpilot: cada una en su cuadradito verde, glifo blanco.
// Soporta relleno parcial (ej. 4.2) como el widget real.
const TP_GREEN = '#00B67A';
const TP_EMPTY = '#dcdce6';
const STAR_PATH = 'M12 2.2l2.96 6.0 6.62.96-4.79 4.67 1.13 6.6L12 18.27 6.08 20.43l1.13-6.6L2.42 9.16l6.62-.96z';

function TrustStars({ rating = 5, size = 22 }: { rating?: number; size?: number }) {
  return (
    <div className="flex gap-[3px]" aria-label={`${rating} de 5 estrellas en Trustpilot`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const p = Math.max(0, Math.min(1, rating - i)); // porción rellena de este cuadrito
        return (
          <span
            key={i}
            className="relative inline-flex items-center justify-center overflow-hidden"
            style={{ width: size, height: size, borderRadius: 3, background: TP_EMPTY }}
          >
            {p > 0 && (
              <span className="absolute inset-y-0 left-0" style={{ width: `${p * 100}%`, background: TP_GREEN }} />
            )}
            <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="#fff" className="relative" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLang();
  const tp = t.testimonials;

  return (
    <section id="testimonios" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">{tp.eyebrow}</p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0C1521] leading-tight">
            {tp.titleA}
            <span className="text-grad-ddt">{tp.titleHighlight}</span>
          </h2>
          <div className="flex items-center gap-2.5 mt-2">
            <TrustStars rating={4.2} size={26} />
            <span className="text-sm font-semibold text-[#0C1521]">{tp.scoreLine}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tp.items.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl border p-6 flex flex-col gap-4"
              style={{ borderColor: 'rgba(5,14,31,.07)', boxShadow: '0 2px 16px rgba(5,14,31,.06)' }}
            >
              <TrustStars rating={item.rating} size={20} />
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="text-[#0C1521] font-semibold text-sm leading-snug">{item.title}</p>
                <p className="text-[#475066] text-sm leading-relaxed">{item.text}</p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'rgba(5,14,31,.06)' }}>
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photo} alt={item.name} className="w-9 h-9 rounded-full object-cover shrink-0" loading="lazy" />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: 'var(--grad-ddt)' }}
                  >
                    {item.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[#0C1521] font-semibold text-xs truncate">{item.name}</p>
                  <p className="text-[#475066]/60 text-[10px]">{tp.reviewTag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot footer */}
        <div className="text-center flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <TrustStars rating={5} size={20} />
            <span className="text-sm text-[#475066]">{tp.trustLine}</span>
          </div>
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#475066]/60 underline underline-offset-2 hover:text-[#0C1521] transition-colors"
          >
            {tp.seeAll}
          </a>
        </div>
      </div>
    </section>
  );
}
