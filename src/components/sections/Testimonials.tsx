'use client';

import { useLang } from '@/lib/language';
import { useEffect, useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

// Estrellas estilo Trustpilot: cada una en su cuadradito verde, glifo blanco.
const TP_GREEN = '#00B67A';
const TP_EMPTY = '#dcdce6';
const STAR_PATH = 'M12 2.2l2.96 6.0 6.62.96-4.79 4.67 1.13 6.6L12 18.27 6.08 20.43l1.13-6.6L2.42 9.16l6.62-.96z';

function TrustStars({ rating = 5, size = 22 }: { rating?: number; size?: number }) {
  return (
    <div className="flex gap-[3px]" aria-label={`${rating} de 5 estrellas en Trustpilot`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const p = Math.max(0, Math.min(1, rating - i));
        return (
          <span
            key={i}
            className="relative inline-flex items-center justify-center overflow-hidden"
            style={{ width: size, height: size, borderRadius: 3, background: TP_EMPTY }}
          >
            {p > 0 && <span className="absolute inset-y-0 left-0" style={{ width: `${p * 100}%`, background: TP_GREEN }} />}
            <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="#fff" className="relative" aria-hidden="true">
              <path d={STAR_PATH} />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

const SERIF = "'Georgia', 'Times New Roman', serif";
const ROTATE_MS = 6500;

export default function Testimonials() {
  const { t } = useLang();
  const tp = t.testimonials;
  const items = tp.items;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % items.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [idx, paused, items.length]);

  const cur = items[idx];

  return (
    <section id="testimonios" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <style>{`
        @keyframes tSpot { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .t-spot { animation: tSpot .5s cubic-bezier(.22,.61,.36,1); }
      `}</style>

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Header (alineado a la izquierda como el resto del sitio) */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#475066] uppercase">{tp.eyebrow}</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0C1521] leading-tight">
            {tp.titleA}
            <span className="text-grad-ddt">{tp.titleHighlight}</span>
          </h2>
        </div>

        {/* Spotlight rotativo */}
        <div
          className="relative w-full flex flex-col items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Comilla decorativa */}
          <span
            aria-hidden="true"
            className="select-none leading-none"
            style={{ fontFamily: SERIF, fontSize: '4rem', color: 'rgba(12,21,33,.13)', marginBottom: '-1.25rem' }}
          >
            &ldquo;
          </span>

          <div key={idx} className="t-spot flex flex-col items-start gap-6 w-full">
            <TrustStars rating={cur.rating} size={20} />

            <blockquote
              className="text-[#0C1521] max-w-3xl"
              style={{ fontFamily: SERIF, fontSize: 'clamp(1.25rem, 2vw, 1.7rem)', lineHeight: 1.45, fontWeight: 500 }}
            >
              {cur.text}
            </blockquote>

            <div className="flex flex-col gap-1">
              <p className="text-[#0C1521] font-semibold text-base">{cur.name}</p>
              <p className="flex items-center gap-1.5 text-[11px] tracking-wide text-[#475066] uppercase">
                <CheckCircle size={15} weight="fill" style={{ color: TP_GREEN }} />
                {tp.reviewTag}
              </p>
            </div>
          </div>

          {/* Avatares para navegar */}
          <div className="flex items-center gap-3 mt-9 flex-wrap">
            {items.map((it, i) => {
              const active = i === idx;
              return (
                <button
                  key={it.name}
                  onClick={() => setIdx(i)}
                  aria-label={`Ver reseña de ${it.name}`}
                  aria-current={active}
                  className="rounded-full transition-all duration-300 focus:outline-none"
                  style={{
                    transform: active ? 'scale(1.12)' : 'scale(1)',
                    opacity: active ? 1 : 0.45,
                    filter: active ? 'none' : 'grayscale(0.4)',
                    boxShadow: active ? '0 0 0 2px var(--warm), 0 0 0 4px #FF5B00' : 'none',
                  }}
                >
                  {it.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.photo} alt={it.name} className="w-11 h-11 rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: 'var(--grad-ddt)' }}
                    >
                      {it.initials}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Trustpilot (sin puntaje ni cantidad) */}
        <a
          href="https://www.trustpilot.com/review/diegodreamtravel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#475066] hover:text-[#0C1521] transition-colors w-fit"
        >
          <TrustStars rating={5} size={18} />
          <span className="underline underline-offset-2">{tp.seeAll}</span>
        </a>
      </div>
    </section>
  );
}
