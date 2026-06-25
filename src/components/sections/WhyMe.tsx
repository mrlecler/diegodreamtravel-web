'use client';

import { SealCheck, UserCircle, CreditCard, Headset, Check, DeviceMobile } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/language';

const cardIcons = [SealCheck, UserCircle, CreditCard, Headset];

export default function WhyMe() {
  const { t } = useLang();
  const app = t.why.app;

  const blockRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  // Parallax: el mockup sigue suavemente el mouse (giro leve, solo desktop)
  useEffect(() => {
    const block = blockRef.current;
    const tilt = tiltRef.current;
    if (!block || !tilt) return;
    if (!window.matchMedia('(pointer:fine)').matches || !window.matchMedia('(min-width:1024px)').matches) return;

    let curX = 0, curY = 0, tgtX = 0, tgtY = 0, raf = 0;
    const tick = () => {
      curY += (tgtY - curY) * 0.12;
      curX += (tgtX - curX) * 0.12;
      tilt.style.setProperty('--px', curY.toFixed(2) + 'deg');
      tilt.style.setProperty('--py', curX.toFixed(2) + 'deg');
      if (Math.abs(tgtY - curY) > 0.03 || Math.abs(tgtX - curX) > 0.03) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      const r = block.getBoundingClientRect();
      tgtY = ((e.clientX - r.left) / r.width - 0.5) * 6;
      tgtX = -((e.clientY - r.top) / r.height - 0.5) * 5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { tgtY = 0; tgtX = 0; if (!raf) raf = requestAnimationFrame(tick); };

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
        @keyframes ddtGlow { 0%,100%{opacity:.82} 50%{opacity:1} }

        /* Fondo decorativo (Universal) detrás del texto */
        .ddt-uni-bg { position:absolute; inset:0; z-index:0; pointer-events:none; opacity:.13;
          background-image:url('/images/decor/universal-bg.webp'); background-size:cover; background-position:left center;
          -webkit-mask-image:linear-gradient(90deg,#000 0%,#000 38%,transparent 80%);
                  mask-image:linear-gradient(90deg,#000 0%,#000 38%,transparent 80%); }

        /* Stage + glows */
        .ddt-stage { position:relative; display:flex; align-items:center; justify-content:center; width:100%; min-height:560px; }
        .ddt-glow { position:absolute; border-radius:50%; pointer-events:none; z-index:0; animation:ddtGlow 5.5s ease-in-out infinite; }
        .ddt-gHalo { width:90.2%; height:66.1%; top:16.9%; left:4.9%;  filter:blur(28px); background:radial-gradient(circle, rgba(196,78,146,.5), rgba(124,77,205,.28) 42%, transparent 68%); animation:none; }
        .ddt-gFu   { width:60.2%; height:44.1%; top:8%;    left:12%;   filter:blur(26px); background:radial-gradient(circle, rgba(196,78,146,.8), transparent 60%); }
        .ddt-gTe   { width:56.4%; height:41.3%; top:52.6%; left:35.5%; filter:blur(26px); background:radial-gradient(circle, rgba(66,194,194,.78), transparent 60%); animation-delay:1.2s; }
        .ddt-gVi   { width:43.2%; height:31.7%; top:36%;   left:34.7%; filter:blur(30px); background:radial-gradient(circle, rgba(124,77,205,.68), transparent 62%); animation-delay:.6s; }
        .ddt-gOr   { width:35.7%; height:26.2%; top:51.8%; left:16%;   filter:blur(26px); background:radial-gradient(circle, rgba(244,123,69,.55), transparent 62%); animation-delay:1.8s; }

        /* Float + parallax */
        .ddt-float { position:relative; animation:ddtFloaty 6s ease-in-out infinite; z-index:2; }
        .ddt-persp { perspective:1600px; }
        .ddt-parallax { transform:rotateX(var(--py,0deg)) rotateY(var(--px,0deg)); transform-style:preserve-3d; }

        /* Placeholder del mockup (provisional) */
        .ddt-ph { width:248px; aspect-ratio:9/19.3; border-radius:40px; border:1.5px dashed rgba(240,237,232,.18);
          background:rgba(255,255,255,.03); -webkit-backdrop-filter:blur(2px); backdrop-filter:blur(2px);
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; text-align:center; padding:28px;
          box-shadow:0 30px 70px -30px rgba(0,0,0,.6); }
        .ddt-ph span { font-size:14px; font-weight:600; color:rgba(240,237,232,.72); }
        .ddt-ph small { font-size:11px; color:rgba(240,237,232,.4); letter-spacing:.3px; }

        @media (max-width:640px){ .ddt-ph{ width:228px; } .ddt-stage{ min-height:500px; } }
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

        {/* Feature destacado: la app */}
        <div ref={blockRef} className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: '#0B1422' }}>
          <div className="ddt-uni-bg" aria-hidden="true" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12">
            {/* Texto */}
            <div className="flex flex-col items-start gap-5 order-2 lg:order-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white px-3 py-1 rounded-full" style={{ background: 'var(--grad-ddt)' }}>
                {app.badge}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#F0EDE8] leading-tight">{app.title}</h3>
              <p className="text-[#F0EDE8]/65 leading-relaxed max-w-md">{app.desc}</p>
              <ul className="flex flex-col gap-2.5 mt-1">
                {app.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#F0EDE8]/90">
                    <Check size={16} weight="bold" style={{ color: '#42C2C2' }} className="shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup (placeholder provisional) + glows */}
            <div className="order-1 lg:order-2 ddt-stage">
              <span className="ddt-glow ddt-gHalo" />
              <span className="ddt-glow ddt-gFu" />
              <span className="ddt-glow ddt-gTe" />
              <span className="ddt-glow ddt-gVi" />
              <span className="ddt-glow ddt-gOr" />

              <div className="ddt-float">
                <div className="ddt-persp">
                  <div ref={tiltRef} className="ddt-parallax">
                    <div className="ddt-ph">
                      <DeviceMobile size={42} weight="duotone" style={{ color: '#FF5B00' }} />
                      <span>{app.title}</span>
                      <small>Mockup en preparación</small>
                    </div>
                  </div>
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
