'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

export default function CTAClose() {
  const { t } = useLang();

  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: 'var(--navy)' }}
    >
      {/* Foto Animal Kingdom de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/decor/cierre-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 68%',
          opacity: 0.55,
        }}
      />
      {/* Overlay navy (más oscuro arriba, deja ver el árbol abajo) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,14,31,.95) 0%, rgba(5,14,31,.80) 42%, rgba(5,14,31,.52) 100%)',
        }}
      />
      {/* Glow fucsia */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(196,78,146,.22) 0%, transparent 70%)',
        }}
      />
      {/* Glow turquesa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 85% 45%, rgba(66,194,194,.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="font-display text-4xl sm:text-5xl text-[#F0EDE8] leading-tight">
          {t.ctaClose.titleA}
          <span className="text-grad-ddt">{t.ctaClose.titleHighlight}</span>
        </h2>
        <p className="text-[#F0EDE8]/70 text-lg leading-relaxed">{t.ctaClose.line1}</p>
        <p className="text-[#F0EDE8]/50 max-w-md leading-relaxed">{t.ctaClose.line2}</p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
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
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-medium text-[#F0EDE8] transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(240,237,232,.18)' }}
          >
            info@diegodreamtravel.com
          </a>
        </div>
      </div>
    </section>
  );
}
