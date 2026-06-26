'use client';

import { SealCheck, UserCircle, CreditCard, Headset, Check } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/language';

const cardIcons = [SealCheck, UserCircle, CreditCard, Headset];

export default function WhyMe() {
  const { t } = useLang();
  const app = t.why.app;

  const blockRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  // Parallax: el mockup flota siguiendo suavemente el mouse (desktop, puntero fino)
  useEffect(() => {
    const block = blockRef.current;
    const tilt = tiltRef.current;
    if (!block || !tilt) return;
    if (!window.matchMedia('(pointer:fine)').matches || !window.matchMedia('(min-width:1024px)').matches) return;

    let curX = 0, curY = 0, tgtX = 0, tgtY = 0, raf = 0;
    const tick = () => {
      curX += (tgtX - curX) * 0.1;
      curY += (tgtY - curY) * 0.1;
      tilt.style.setProperty('--tx', curX.toFixed(1) + 'px');
      tilt.style.setProperty('--ty', curY.toFixed(1) + 'px');
      if (Math.abs(tgtX - curX) > 0.1 || Math.abs(tgtY - curY) > 0.1) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      const r = block.getBoundingClientRect();
      tgtX = ((e.clientX - r.left) / r.width - 0.5) * 22;
      tgtY = ((e.clientY - r.top) / r.height - 0.5) * 16;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { tgtX = 0; tgtY = 0; if (!raf) raf = requestAnimationFrame(tick); };

    block.addEventListener('mousemove', onMove);
    block.addEventListener('mouseleave', onLeave);
    return () => {
      block.removeEventListener('mousemove', onMove);
      block.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="por-que" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <style>{`
        @keyframes ddtFloaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ddtBloom { 0%,100%{opacity:.85} 50%{opacity:1} }

        /* Fondo decorativo (Universal) detrás del texto */
        .ddt-uni-bg { position:absolute; inset:0; z-index:0; pointer-events:none; opacity:.16; mix-blend-mode:multiply;
          background-image:url('/images/decor/universal-bg.webp'); background-size:cover; background-position:left center;
          -webkit-mask-image:linear-gradient(90deg,#000 0%,#000 30%,transparent 72%);
                  mask-image:linear-gradient(90deg,#000 0%,#000 30%,transparent 72%); }

        /* Stage + blooms de color (suaves, sobre claro) */
        .ddt-stage { position:relative; display:flex; align-items:center; justify-content:center; width:100%; min-height:560px; }
        .ddt-bloom { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(60px); animation:ddtBloom 6s ease-in-out infinite; }
        .ddt-bFu { width:58%; height:46%; top:8%;  left:18%; background:radial-gradient(circle, rgba(196,78,146,.20), transparent 66%); }
        .ddt-bTe { width:56%; height:44%; top:50%; left:34%; background:radial-gradient(circle, rgba(66,194,194,.20), transparent 66%); animation-delay:1.4s; }
        .ddt-bOr { width:40%; height:34%; top:42%; left:8%;  background:radial-gradient(circle, rgba(244,123,69,.16), transparent 66%); animation-delay:.7s; }

        /* Float + parallax */
        .ddt-float { position:relative; z-index:2; animation:ddtFloaty 6s ease-in-out infinite; }
        .ddt-parallax { transform:translate3d(var(--tx,0px), var(--ty,0px), 0); will-change:transform; }
        .ddt-phone-img { width:460px; max-width:100%; height:auto; display:block;
          filter:drop-shadow(0 38px 46px rgba(20,16,30,.30)); }

        @media (max-width:1024px){ .ddt-phone-img{ width:400px; } }
        @media (max-width:640px){ .ddt-phone-img{ width:300px; } .ddt-stage{ min-height:460px; } }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-xs font-semibold tracking-[0.18em] text-[#475066] uppercase">{t.why.eyebrow}</p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#0C1521] leading-tight">
            {t.why.titleA}
            <span className="text-grad-ddt">{t.why.titleHighlight}</span>
            {t.why.titleB}
          </h2>
          <p className="text-[#475066] leading-relaxed">{t.why.sub}</p>
        </div>

        {/* Feature destacado: la app (modo claro) */}
        <div
          ref={blockRef}
          className="relative rounded-3xl overflow-hidden border border-[#0C1521]/8 shadow-[0_30px_70px_-30px_rgba(12,21,33,.30)]"
          style={{ background: 'linear-gradient(135deg,#FCFBF9 0%,#F2EEE7 100%)' }}
        >
          <div className="ddt-uni-bg" aria-hidden="true" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12">
            {/* Texto */}
            <div className="flex flex-col items-start gap-5 order-2 lg:order-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white px-3 py-1 rounded-full" style={{ background: 'var(--grad-ddt)' }}>
                {app.badge}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#0C1521] leading-tight">{app.title}</h3>
              <p className="text-[#475066] leading-relaxed max-w-md">{app.desc}</p>
              <ul className="flex flex-col gap-2.5 mt-1">
                {app.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#0C1521]/85">
                    <Check size={16} weight="bold" style={{ color: '#1FA3A3' }} className="shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup real + blooms */}
            <div className="order-1 lg:order-2 ddt-stage">
              <span className="ddt-bloom ddt-bFu" />
              <span className="ddt-bloom ddt-bTe" />
              <span className="ddt-bloom ddt-bOr" />

              <div className="ddt-float">
                <div ref={tiltRef} className="ddt-parallax">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/decor/iphone-opt.webp" alt={app.title} className="ddt-phone-img" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.why.cards.map((card, i) => {
            const Icon = cardIcons[i];
            return (
              <div key={card.title} className="bg-white rounded-2xl border border-[#0C1521]/8 p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_rgba(5,14,31,.18)]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,91,0,0.10)' }}>
                  <Icon size={24} weight="duotone" style={{ color: '#FF5B00' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-semibold text-[#0C1521] text-sm leading-snug">{card.title}</h3>
                  <p className="text-xs text-[#475066] leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
