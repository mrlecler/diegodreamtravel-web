'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const WA_URL = 'https://wa.me/5493624703040';

// Fotos de Diego en cada destino (en /public/images/diego). Caption = lugar real.
const PHOTOS = [
  { file: 'magic-kingdom', caption: 'Magic Kingdom' },
  { file: 'epcot', caption: 'EPCOT' },
  { file: 'mario', caption: 'Super Nintendo World' },
  { file: 'epic-universe', caption: 'Epic Universe' },
  { file: 'hhn', caption: 'Halloween Horror Nights' },
  { file: 'diagon', caption: 'Ministry of Magic' },
  { file: 'hollywood', caption: 'Hollywood' },
  { file: 'nyc', caption: 'New York' },
  { file: 'friends', caption: 'Friends Experience' },
  { file: 'lincoln', caption: 'Washington DC' },
];

// Sellos de respaldo (logos blancos sobre chip navy). Los logos ya traen su texto.
const SEALS = [
  { src: '/cert-disney-avp.png', alt: 'Authorized Disney Vacation Planner' },
  { src: '/cert-universal-pta.png', alt: 'Universal Parks & Resorts · Preferred Travel Agency' },
  { src: '/images/logos/white/livi-travel.png', alt: 'Team Livi Travel' },
];

// Renderiza un texto con marcadores **negrita** resaltando los puntos importantes.
function renderRich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-[#0C1521]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function AboutDiego() {
  const { t } = useLang();

  return (
    <section id="quien-soy" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            {t.about.eyebrow}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0C1521] leading-tight">
            {t.about.titleA}
            <span className="text-grad-ddt">{t.about.titleHighlight}</span>
          </h2>
          <p className="text-[#475066] leading-relaxed">{renderRich(t.about.body)}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {t.about.stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="font-display text-4xl sm:text-5xl text-[#0C1521]">{s.value}</p>
              <p className="text-sm text-[#475066] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Galería: Diego en cada destino, en persona */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#475066] uppercase">
              {t.about.galleryEyebrow}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PHOTOS.map((p) => (
              <div key={p.file} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={`/images/diego/${p.file}.jpeg`}
                  alt={`Diego en ${p.caption}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(5,14,31,.88) 0%, rgba(5,14,31,.20) 45%, transparent 72%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2">
                  <span className="shrink-0 rounded-full" style={{ width: 14, height: 2, backgroundColor: '#FF5B00' }} />
                  <span className="text-[11px] uppercase tracking-[0.12em] text-white font-medium leading-tight">
                    {p.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sellos de respaldo: 3 chips navy con logos */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#475066] uppercase">
              {t.about.certsEyebrow}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SEALS.map((s) => (
              <div
                key={s.src}
                className="flex items-center justify-center rounded-2xl py-6 px-5"
                style={{ backgroundColor: '#0C1521' }}
              >
                <img src={s.src} alt={s.alt} className="h-9 w-auto max-w-[78%] object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA de cierre */}
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ backgroundColor: '#FF5B00', boxShadow: '0 0 24px rgba(255,91,0,.30)' }}
        >
          <WhatsappLogo size={18} weight="fill" />
          {t.about.cta}
        </a>
      </div>
    </section>
  );
}
