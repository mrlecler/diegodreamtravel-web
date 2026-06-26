'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

export default function CTAClose() {
  const { t } = useLang();

  return (
    <section
      data-nav-dark
      className="relative px-6 overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundColor: 'var(--navy)',
        minHeight: '92vh',
        paddingTop: 'clamp(64px, 8vh, 120px)',
        paddingBottom: 'clamp(64px, 8vh, 120px)',
      }}
    >
      {/* Foto Animal Kingdom de fondo (cubre toda la sección, árbol completo) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/decor/cierre-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          opacity: 0.62,
        }}
      />
      {/* Overlay navy: más oscuro arriba y abajo, deja respirar el árbol en el centro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,14,31,.92) 0%, rgba(5,14,31,.62) 30%, rgba(5,14,31,.50) 55%, rgba(5,14,31,.40) 100%)',
        }}
      />
      {/* Glow fucsia */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 18% 30%, rgba(196,78,146,.18) 0%, transparent 70%)',
        }}
      />
      {/* Glow turquesa */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 38% at 86% 34%, rgba(66,194,194,.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-7">
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-[#F0EDE8] leading-[1.05] drop-shadow-[0_2px_20px_rgba(5,14,31,.6)]">
          {t.ctaClose.titleA}
          <span className="text-grad-ddt">{t.ctaClose.titleHighlight}</span>
        </h2>
        <p className="text-[#F0EDE8]/85 text-xl sm:text-2xl leading-relaxed drop-shadow-[0_2px_12px_rgba(5,14,31,.7)]">
          {t.ctaClose.line1}
        </p>
        <p className="text-[#F0EDE8]/65 text-base sm:text-lg max-w-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(5,14,31,.7)]">
          {t.ctaClose.line2}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{
              backgroundColor: '#FF5B00',
              boxShadow: '0 0 32px rgba(255,91,0,.45)',
            }}
          >
            <WhatsappLogo size={20} weight="fill" />
            {t.ctaClose.cta}
          </a>

          <a
            href="mailto:info@diegodreamtravel.com"
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-medium text-[#F0EDE8] transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(240,237,232,.22)', backdropFilter: 'blur(2px)' }}
          >
            info@diegodreamtravel.com
          </a>
        </div>
      </div>
    </section>
  );
}
