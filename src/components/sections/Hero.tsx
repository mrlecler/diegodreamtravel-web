'use client';

import { useState, useEffect } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

// Fotos del hero (optimizadas en /public/images/opt), en ORDEN CURADO FIJO:
//  1) Orlando — Universal + Disney mezclados, arrancando por Epic Universe
//  2) Miami
//  3) New York · California · Las Vegas
// (Las de gente/experiencia 12, 31, 36, 51, 55, 60 quedan fuera del hero.)
const HERO_NUMS = ['50', '09', '06', '11', '08', '17', '61', '56', '58', '52', '57', '63', '64', '53', '62'];

// Destino real de cada foto (todas las disponibles en /opt, por si sumás alguna a HERO_NUMS)
const HERO_LABELS: Record<string, string> = {
  '06': 'Islands of Adventure',
  '08': 'EPCOT',
  '09': 'Magic Kingdom',
  '11': 'Walt Disney World',
  '12': 'Ministry of Magic',        // Epic Universe
  '17': 'Walt Disney World',
  '31': 'Universal Orlando',
  '36': 'Volcano Bay',
  '50': 'Universal Epic Universe',
  '51': 'Universal Orlando',
  '52': 'New York',
  '53': 'Las Vegas',
  '55': 'Miami',                     // despedida de solteras en la playa
  '56': 'Miami Beach',
  '57': 'New York',
  '58': 'Miami Beach',
  '60': 'Disney Hollywood Studios',  // Slinky Dog
  '61': 'Disney Hollywood Studios',  // Toy Story Land
  '62': 'Las Vegas',                 // The Strip
  '63': 'Santa Monica',              // Los Ángeles
  '64': 'San Francisco',
};

const ROTATE_MS = 7000;

export default function Hero() {
  const { t } = useLang();

  // Orden fijo y determinístico (mismo en SSR y cliente → sin hydration mismatch)
  const [order] = useState<string[]>(HERO_NUMS);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
  }, []);

  useEffect(() => {
    if (reduce || order.length < 2) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % order.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, order]);

  return (
    <section
      data-nav-dark
      className="relative min-h-screen flex flex-col items-start justify-center text-left px-6 sm:px-10 lg:px-20 pt-28 pb-16 overflow-hidden"
      style={{ backgroundColor: 'var(--navy)' }}
    >
      <style>{`
        @keyframes heroZoomIn  { from { transform: scale(1);    } to { transform: scale(1.12); } }
        @keyframes heroZoomOut { from { transform: scale(1.12); } to { transform: scale(1);    } }
        @keyframes fadeKicker  { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Slideshow de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {order.map((num, i) => (
          <div
            key={num}
            aria-hidden
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url(/images/opt/image${num}-2560.webp)`,
              opacity: i === active ? 1 : 0,
              willChange: 'opacity, transform',
              animation: reduce
                ? 'none'
                : `${i % 2 === 0 ? 'heroZoomIn' : 'heroZoomOut'} 24s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Overlay de marca — scrim navy para legibilidad */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,14,31,.82) 0%, rgba(5,14,31,.55) 45%, rgba(5,14,31,.92) 100%)',
        }}
      />
      {/* Glow fucsia */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 25% 35%, rgba(196,78,146,.38) 0%, transparent 70%)',
        }}
      />
      {/* Glow turquesa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(66,194,194,.30) 0%, transparent 70%)',
        }}
      />

      {/* Contador de slides */}
      <div
        aria-hidden
        className="absolute top-32 right-6 sm:right-10 lg:right-20 z-10 flex flex-col items-end gap-2"
      >
        <span className="text-xs font-mono tracking-widest tabular-nums text-[#F0EDE8]/55">
          {String(active + 1).padStart(2, '0')} / {String(order.length).padStart(2, '0')}
        </span>
        <div className="w-32 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.20)' }}>
          <div
            style={{
              height: '100%',
              width: `${((active + 1) / order.length) * 100}%`,
              background: 'linear-gradient(90deg,#F47B45,#E63957,#C44E92,#42C2C2)',
              transition: reduce ? 'none' : 'width 600ms ease',
            }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-start gap-5">
        {/* Kicker de destino */}
        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
          <span
            key={order[active]}
            className="text-xs uppercase tracking-[0.22em] text-[#F0EDE8]/80"
            style={{ animation: reduce ? 'none' : 'fadeKicker 0.4s ease forwards' }}
          >
            {HERO_LABELS[order[active]] ?? 'Orlando · Florida, USA'}
          </span>
        </div>

        {/* H1 — tamaño fluido: escala con ancho y alto del viewport, tope 72px */}
        <h1
          className="font-display text-[#F0EDE8] leading-[1.03] drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
          style={{ fontSize: 'clamp(2.5rem, min(5.5vw, 8.5vh), 4.5rem)' }}
        >
          {t.hero.titleA}
          <span className="text-grad-ddt">{t.hero.titleHighlight}</span>
        </h1>

        {/* Sub */}
        <p className="text-base sm:text-lg text-[#F0EDE8]/75 max-w-xl leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-1">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: '#FF5B00',
              boxShadow: '0 0 28px rgba(255,91,0,.40)',
            }}
          >
            <WhatsappLogo size={20} weight="fill" />
            {t.hero.ctaWhatsapp}
          </a>
          <a
            href="/dream15"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-medium text-[#F0EDE8] backdrop-blur-sm transition-all border border-[rgba(196,78,146,0.7)] bg-[rgba(196,78,146,0.10)] hover:border-[rgba(196,78,146,1)] hover:bg-[rgba(196,78,146,0.20)] hover:shadow-[0_0_24px_rgba(196,78,146,0.45)] hover:scale-[1.02]"
          >
            {t.hero.ctaDream15}
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-start gap-3 mt-1">
          <span className="text-xs text-[#F0EDE8]/70 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5">
            {t.hero.badgeCert}
          </span>
          <span className="text-xs text-[#00B67A] border border-[rgba(0,182,122,0.40)] bg-[rgba(0,182,122,0.08)] backdrop-blur-sm rounded-full px-3 py-1.5">
            {t.hero.badgeTrust}
          </span>
        </div>
      </div>
    </section>
  );
}
