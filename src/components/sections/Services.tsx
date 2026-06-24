'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLang } from '@/lib/language';
import DepartureStrip from '@/components/DepartureStrip';

const WA_BASE = 'https://wa.me/5493624703040';

// Diseño (no traducible). El texto sale del diccionario por índice.
const design = [
  { color: '#42C2C2', image: '/wdw01.jpg',  external: true,  href: '' },
  { color: '#C44E92', image: '/wdw02.webp', external: false, href: '/dream15' },
  { color: '#F47B45', image: '/wdw03.webp', external: true,  href: '' },
  { color: '#E63957', image: '/wdw04.webp', external: true,  href: '' },
];

export default function Services() {
  const { t } = useLang();

  return (
    <section
      id="servicios"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            {t.services.eyebrow}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0C1521] leading-tight">
            {t.services.titleA}
            <span className="text-grad-ddt">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-[#475066] max-w-lg mx-auto leading-relaxed">
            {t.services.sub}
          </p>
          <p className="text-xs text-[#475066]/50 mt-1">{t.services.hint}</p>
        </div>

        {/* Cartel de salidas */}
        <DepartureStrip />

        {/* World cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {t.services.worlds.map((w, i) => {
            const d = design[i];
            const num = String(i + 1).padStart(2, '0');
            const href = d.external
              ? `${WA_BASE}?text=${encodeURIComponent(w.wa)}`
              : d.href;
            return (
              <div
                key={w.title}
                className="group relative rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-end cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${d.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Degradé para legibilidad — se aclara en hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 group-hover:from-black/80 group-hover:via-black/35 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 p-7 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white/60 tracking-widest">{num}</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm"
                      style={{ backgroundColor: `${d.color}40`, color: '#fff' }}
                    >
                      {w.category}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-white">{w.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{w.desc}</p>

                  {d.external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                      style={{ backgroundColor: '#FF5B00' }}
                    >
                      <WhatsappLogo size={14} weight="fill" />
                      {w.cta}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full px-4 py-2 text-xs font-semibold text-white border border-white/40 hover:bg-white/10 transition-all backdrop-blur-sm"
                    >
                      {w.cta}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer line */}
        <p className="text-center text-sm text-[#475066]/60">{t.services.footerLine}</p>
      </div>
    </section>
  );
}
