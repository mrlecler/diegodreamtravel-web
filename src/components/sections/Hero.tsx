'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden"
      style={{ backgroundColor: 'var(--navy)' }}
    >
      {/* Glow fucsia */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 25% 40%, rgba(196,78,146,.25) 0%, transparent 70%)',
        }}
      />
      {/* Glow turquesa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 65%, rgba(66,194,194,.20) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#F0EDE8]/70 tracking-wide">
          {t.hero.eyebrow}
        </span>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0EDE8] leading-tight">
          {t.hero.titleA}
          <span className="text-grad-ddt">{t.hero.titleHighlight}</span>
        </h1>

        {/* Sub */}
        <p className="text-lg sm:text-xl text-[#F0EDE8]/60 max-w-xl leading-relaxed">
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
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
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-medium text-[#F0EDE8]/75 border border-white/15 hover:border-white/35 hover:text-[#F0EDE8] transition-all"
          >
            {t.hero.ctaDream15}
          </a>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <span className="text-xs text-[#F0EDE8]/55 border border-white/10 rounded-full px-3 py-1.5">
            {t.hero.badgeCert}
          </span>
          <span className="text-xs text-[#F0EDE8]/55 border border-white/10 rounded-full px-3 py-1.5">
            {t.hero.badgeTrust}
          </span>
        </div>
      </div>
    </section>
  );
}
