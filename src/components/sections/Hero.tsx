'use client';

import { useState, useEffect } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

// Candidatas del hero (optimizadas en /public/images/opt)
const HERO_NUMS = ['04', '06', '08', '09', '11', '12', '17', '31', '34', '35', '36'];

const ROTATE_MS = 7000;

function shuffle(arr: string[]): string[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

export default function Hero() {
  const { t } = useLang();

  // Orden estable para SSR; se randomiza en el cliente (evita mismatch de hidratación)
  const [order, setOrder] = useState<string[]>(HERO_NUMS);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    setOrder(shuffle(HERO_NUMS));
    setActive(0);
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
      className="relative min-h-screen flex flex-col items-start justify-center text-left px-6 sm:px-10 lg:px-20 pt-28 pb-20 overflow-hidden"
      style={{ backgroundColor: 'var(--navy)' }}
    >
      <style>{`
        @keyframes heroZoomIn  { from { transform: scale(1);    } to { transform: scale(1.12); } }
        @keyframes heroZoomOut { from { transform: scale(1.12); } to { transform: scale(1);    } }
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

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-start gap-6">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-[#F0EDE8]/80 tracking-wide">
          {t.hero.eyebrow}
        </span>

        {/* H1 */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[#F0EDE8] leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
          {t.hero.titleA}
          <span className="text-grad-ddt">{t.hero.titleHighlight}</span>
        </h1>

        {/* Sub */}
        <p className="text-lg sm:text-xl text-[#F0EDE8]/75 max-w-xl leading-relaxed drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
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
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-medium text-[#F0EDE8]/85 border border-white/25 bg-white/5 backdrop-blur-sm hover:border-white/45 hover:text-[#F0EDE8] transition-all"
          >
            {t.hero.ctaDream15}
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-start gap-3 mt-2">
          <span className="text-xs text-[#F0EDE8]/70 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5">
            {t.hero.badgeCert}
          </span>
          <span className="text-xs text-[#F0EDE8]/70 border border-white/15 bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5">
            {t.hero.badgeTrust}
          </span>
        </div>
      </div>
    </section>
  );
}
