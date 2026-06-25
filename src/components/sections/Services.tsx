'use client';

import {
  WhatsappLogo, CastleTurret, Sparkle, UsersThree, MapTrifold, ArrowRight,
  ChatsCircle, AirplaneTilt, Bed, Car, Van, Lifebuoy, Binoculars, Ticket, Boat, HandCoins,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useLang } from '@/lib/language';
import DepartureStrip from '@/components/DepartureStrip';

const WA_BASE = 'https://wa.me/5493624703040';

// Diseño de cada mundo (no traducible). El texto sale del diccionario por índice.
// tint = gradiente de 3 paradas: navy abajo · color de categoría al medio · navy leve arriba.
const design = [
  {
    color: '#42C2C2', image: '/images/opt/image11-2560.webp', Icon: CastleTurret, external: true, href: '',
    tint: 'linear-gradient(to top,rgba(5,14,31,.94) 7%,rgba(66,194,194,.34) 56%,rgba(5,14,31,.22))',
  },
  {
    color: '#C44E92', image: '/wdw03.webp', Icon: Sparkle, external: false, href: '/dream15',
    tint: 'linear-gradient(to top,rgba(5,14,31,.94) 7%,rgba(196,78,146,.42) 56%,rgba(5,14,31,.22))',
  },
  {
    color: '#F47B45', image: '/images/opt/image45-2560.webp', Icon: UsersThree, external: true, href: '',
    tint: 'linear-gradient(to top,rgba(5,14,31,.94) 7%,rgba(244,123,69,.40) 56%,rgba(5,14,31,.22))',
  },
  {
    color: '#E63957', image: '/images/opt/image46-2560.webp', Icon: MapTrifold, external: true, href: '',
    tint: 'linear-gradient(to top,rgba(5,14,31,.94) 7%,rgba(230,57,87,.42) 56%,rgba(5,14,31,.22))',
  },
];

// Íconos de "Me encargo de cada detalle" (mismo orden que services.included.items)
const includedIcons = [
  ChatsCircle, AirplaneTilt, Bed, Car, Van, Lifebuoy, Binoculars, Ticket, Boat, HandCoins,
];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="servicios" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <style>{`
        .cm-worlds{display:flex;gap:4px;border-radius:20px;overflow:hidden;box-shadow:0 30px 70px -34px rgba(5,14,31,.5);}
        .cm-world{position:relative;flex:1 1 0;min-width:0;min-height:560px;overflow:hidden;text-decoration:none;display:flex;flex-direction:column;isolation:isolate;transition:flex .55s cubic-bezier(.22,1,.36,1),filter .45s ease;}
        .cm-world .cm-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(.6) saturate(1.15);transform:scale(1.001);transition:transform .7s ease,filter .5s ease;z-index:0;}
        .cm-world .cm-tint{position:absolute;inset:0;z-index:1;}
        .cm-world .cm-content{position:relative;z-index:2;flex:1;padding:32px 28px;display:flex;flex-direction:column;}
        .cm-world .cm-icon{margin-bottom:auto;}
        .cm-world .cm-eyebrow{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;}
        .cm-world .cm-title{font-size:clamp(24px,2.6vw,34px);line-height:1;letter-spacing:.4px;color:#F0EDE8;}
        .cm-world .cm-tag{font-size:13.5px;line-height:1.6;color:rgba(240,237,232,.82);margin-top:12px;max-width:30ch;}
        .cm-cta{display:inline-flex;align-items:center;gap:8px;margin-top:22px;padding:11px 16px;border-radius:999px;font-weight:600;font-size:12px;color:#F0EDE8;background:rgba(240,237,232,.13);border:1px solid rgba(240,237,232,.28);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);align-self:flex-start;transition:background .25s ease,gap .25s ease;}
        .cm-cta-d15{background:linear-gradient(90deg,#F47B45,#E63957 40%,#C44E92);border:0;font-weight:700;box-shadow:0 10px 26px -10px rgba(196,78,146,.6);}
        @media (hover:hover) and (min-width:861px){
          .cm-worlds:hover .cm-world{flex:.84;filter:brightness(.7) saturate(.55);}
          .cm-worlds:hover .cm-world:hover{flex:1.95;filter:none;}
          .cm-world:hover .cm-bg{transform:scale(1.07);filter:brightness(.82) saturate(1.32);}
          .cm-world:hover .cm-cta{background:rgba(240,237,232,.22);gap:11px;}
        }
        @media (max-width:860px){
          .cm-worlds{flex-direction:column;border-radius:18px;}
          .cm-world{flex:none;min-height:380px;}
          .cm-world .cm-bg{filter:brightness(.66) saturate(1.2);}
          .cm-world .cm-icon{margin-bottom:120px;}
        }
        @media (prefers-reduced-motion: reduce){
          .cm-world,.cm-world .cm-bg,.cm-cta{transition:none;}
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header (alineado a la izquierda) */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#475066] uppercase">
              {t.services.eyebrow}
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0C1521] leading-tight">
            {t.services.titleA}
            <span className="text-grad-ddt">{t.services.titleHighlight}</span>
          </h2>
          <p className="text-[#475066] leading-relaxed">
            {t.services.sub}{' '}
            <span className="text-[#475066]/50">{t.services.hint}</span>
          </p>
        </div>

        {/* Cartel de salidas */}
        <DepartureStrip />

        {/* Cuatro mundos — panel único con efecto acordeón */}
        <div>
          <div className="cm-worlds">
            {t.services.worlds.map((w, i) => {
              const d = design[i];
              const Icon = d.Icon;
              const num = String(i + 1).padStart(2, '0');

              const inner = (
                <>
                  <div className="cm-bg" style={{ backgroundImage: `url(${d.image})` }} />
                  <div className="cm-tint" style={{ background: d.tint }} />
                  <div className="cm-content">
                    <Icon size={36} weight="duotone" className="cm-icon" style={{ color: d.color }} />
                    <div className="cm-eyebrow" style={{ color: d.color }}>{num} · {w.category}</div>
                    <div className="cm-title font-display">{w.title}</div>
                    <div className="cm-tag">{w.desc}</div>
                    {d.external ? (
                      <span className="cm-cta">
                        <WhatsappLogo size={15} weight="fill" style={{ color: '#25D366' }} />
                        {w.cta}
                      </span>
                    ) : (
                      <span className="cm-cta cm-cta-d15">
                        {w.cta}
                        <ArrowRight size={14} weight="bold" />
                      </span>
                    )}
                  </div>
                </>
              );

              return d.external ? (
                <a
                  key={w.title}
                  className="cm-world"
                  href={`${WA_BASE}?text=${encodeURIComponent(w.wa)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${w.category}: ${w.title}`}
                >
                  {inner}
                </a>
              ) : (
                <Link key={w.title} className="cm-world" href={d.href} aria-label={`${w.category}: ${w.title}`}>
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Cierre de los mundos: estrella de marca + principios */}
          <div className="flex items-center gap-2.5 mt-6 flex-wrap">
            <svg viewBox="0 0 100 100" width="14" height="14" aria-hidden="true">
              <path
                d="M50 0 C50 28 72 50 100 50 C72 50 50 72 50 100 C50 72 28 50 0 50 C28 50 50 28 50 0Z"
                fill="#FF5B00"
              />
            </svg>
            <span
              className="text-[10px] uppercase tracking-[0.15em] text-[#050E1F]/40"
              style={{ fontFamily: 'ui-monospace,SFMono-Regular,Menlo,monospace' }}
            >
              {t.services.footerLine}
            </span>
          </div>
        </div>

        {/* Me encargo de cada detalle — servicios incluidos */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#475066] uppercase">
              {t.services.included.title}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {t.services.included.items.map((label, i) => {
              const Icon = includedIcons[i];
              return (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-[#0C1521]/10 bg-white/55 px-4 py-3 transition-colors hover:border-[#0C1521]/20 hover:bg-white/80"
                >
                  <Icon size={22} weight="duotone" style={{ color: '#FF5B00' }} className="shrink-0" />
                  <span className="text-sm text-[#0C1521] leading-tight">{label}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[#475066]/55 leading-relaxed">{t.services.included.note}</p>
        </div>
      </div>
    </section>
  );
}
