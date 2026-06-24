'use client';

import {
  WhatsappLogo, CastleTurret, Sparkle, UsersThree, MapTrifold,
  ChatsCircle, AirplaneTilt, Bed, Car, Van, Lifebuoy, Binoculars, Ticket, Boat, HandCoins,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useLang } from '@/lib/language';
import DepartureStrip from '@/components/DepartureStrip';

const WA_BASE = 'https://wa.me/5493624703040';
const GRAD_DDT = 'linear-gradient(90deg,#F47B45,#E63957,#C44E92,#42C2C2)';

// Diseño (no traducible). El texto sale del diccionario por índice.
const design = [
  { color: '#42C2C2', image: '/wdw01.jpg',                    Icon: CastleTurret, external: true,  href: '' },
  { color: '#C44E92', image: '/wdw02.webp',                   Icon: Sparkle,      external: false, href: '/dream15' },
  { color: '#F47B45', image: '/wdw03.webp',                   Icon: UsersThree,   external: true,  href: '' },
  { color: '#E63957', image: '/images/opt/image52-1280.webp', Icon: MapTrifold,   external: true,  href: '' },
];

// Íconos de "Me encargo de cada detalle" (mismo orden que services.included.items)
const includedIcons = [
  ChatsCircle,   // Asesoramiento personalizado
  AirplaneTilt,  // Vuelos y tickets
  Bed,           // Alojamiento
  Car,           // Alquiler de vehículos
  Van,           // Traslados
  Lifebuoy,      // Asistencia al viajero
  Binoculars,    // Tours y excursiones
  Ticket,        // Entradas a parques
  Boat,          // Cruceros
  HandCoins,     // Financiación en cuotas
];

export default function Services() {
  const { t } = useLang();

  return (
    <section id="servicios" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
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

        {/* World cards — 4 en fila, inmersivas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.services.worlds.map((w, i) => {
            const d = design[i];
            const Icon = d.Icon;
            const num = String(i + 1).padStart(2, '0');
            const href = d.external
              ? `${WA_BASE}?text=${encodeURIComponent(w.wa)}`
              : d.href;

            return (
              <div
                key={w.title}
                className="group relative rounded-3xl overflow-hidden min-h-[460px] flex flex-col justify-end cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${d.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Tinte de color por categoría */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
                  style={{ background: `linear-gradient(to top, ${d.color}59 0%, ${d.color}26 38%, transparent 72%)` }}
                />
                {/* Scrim navy para legibilidad del texto */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(5,14,31,.93) 0%, rgba(5,14,31,.5) 45%, rgba(5,14,31,.08) 78%, transparent 100%)',
                  }}
                />

                {/* Contenido */}
                <div className="relative z-10 p-6 flex flex-col items-start gap-3">
                  <Icon size={34} weight="duotone" style={{ color: d.color }} />

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest" style={{ color: d.color }}>{num}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: d.color }}>
                      · {w.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-[1.7rem] text-white leading-tight">{w.title}</h3>
                  <p className="text-sm text-white/85 leading-relaxed">{w.desc}</p>

                  {d.external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 self-start rounded-full px-4 py-2.5 text-xs font-semibold text-white border border-white/12 backdrop-blur-sm transition-all hover:scale-[1.03]"
                      style={{ backgroundColor: 'rgba(12,21,33,0.82)' }}
                    >
                      <WhatsappLogo size={15} weight="fill" style={{ color: d.color }} />
                      {w.cta}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full px-5 py-2.5 text-xs font-semibold text-white transition-all hover:scale-[1.03] hover:opacity-95"
                      style={{ background: GRAD_DDT }}
                    >
                      {w.cta}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
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
                  <Icon size={22} weight="duotone" style={{ color: '#0C1521' }} className="shrink-0" />
                  <span className="text-sm text-[#0C1521] leading-tight">{label}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[#475066]/55 leading-relaxed">{t.services.included.note}</p>
        </div>

        {/* Footer line */}
        <p className="text-center text-sm text-[#475066]/60">{t.services.footerLine}</p>
      </div>
    </section>
  );
}
