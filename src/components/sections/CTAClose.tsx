'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

export default function CTAClose() {
  const { t } = useLang();

  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{ backgroundColor: 'var(--navy)' }}
    >
      {/* Glow fucsia */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(196,78,146,.25) 0%, transparent 70%)',
        }}
      />
      {/* Glow turquesa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 85% 55%, rgba(66,194,194,.20) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8] leading-tight">
          {t.ctaClose.titleA}
          <span className="text-grad-ddt">{t.ctaClose.titleHighlight}</span>
        </h2>
        <p className="text-[#F0EDE8]/60 text-lg leading-relaxed">{t.ctaClose.line1}</p>
        <p className="text-[#F0EDE8]/45 max-w-md leading-relaxed">{t.ctaClose.line2}</p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{
            backgroundColor: '#FF5B00',
            boxShadow: '0 0 28px rgba(255,91,0,.40)',
          }}
        >
          <WhatsappLogo size={20} weight="fill" />
          {t.ctaClose.cta}
        </a>

        <a
          href="mailto:info@diegodreamtravel.com"
          className="text-sm text-[#F0EDE8]/40 hover:text-[#F0EDE8]/70 transition-colors"
        >
          info@diegodreamtravel.com
        </a>
      </div>
    </section>
  );
}
