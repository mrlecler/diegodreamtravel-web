'use client';

import { SealCheck, UserCircle, CreditCard, Headset, Check } from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const cardIcons = [SealCheck, UserCircle, CreditCard, Headset];

export default function WhyMe() {
  const { t } = useLang();
  const app = t.why.app;
  const ph = app.phone;

  return (
    <section id="por-que" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <style>{`
        @keyframes ddtFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes ddtPush {
          0%,5%    { transform: translateY(-150%); opacity: 0; }
          11%,44%  { transform: translateY(0);     opacity: 1; }
          52%,100% { transform: translateY(-150%); opacity: 0; }
        }
        @keyframes ddtLive { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes ddtBar  { 0%{width:0} 100%{width:62%} }

        .ddt-phone { animation: ddtFloat 6s ease-in-out infinite; width: 248px; max-width: 78vw; }
        .ddt-frame { position:relative; border-radius:46px; background:#05080f; padding:10px;
          box-shadow:0 34px 80px -24px rgba(0,0,0,.75), inset 0 0 0 2px rgba(255,255,255,.06); }
        .ddt-island { position:absolute; top:20px; left:50%; transform:translateX(-50%); width:78px; height:22px; background:#05080f; border-radius:999px; z-index:6; }
        .ddt-screen { position:relative; border-radius:38px; overflow:hidden;
          background:linear-gradient(160deg,#0e1a2c 0%,#0a1018 100%); padding:42px 15px 18px;
          min-height:478px; display:flex; flex-direction:column; gap:11px; }
        .ddt-sb { display:flex; justify-content:space-between; align-items:center; padding:0 6px; }
        .ddt-sb time { font-family:ui-monospace,SFMono-Regular,monospace; font-size:11px; color:rgba(240,237,232,.85); font-weight:600; }
        .ddt-batt { width:20px; height:10px; border-radius:3px; border:1px solid rgba(240,237,232,.5); position:relative; }
        .ddt-batt::after { content:''; position:absolute; inset:1.5px; right:6px; border-radius:1px; background:rgba(240,237,232,.8); }
        .ddt-eyebrow { font-family:ui-monospace,SFMono-Regular,monospace; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:rgba(240,237,232,.5); padding:0 2px; }
        .ddt-trip { border-radius:18px; padding:15px 16px; border:1px solid rgba(255,255,255,.1);
          background:linear-gradient(135deg,rgba(196,78,146,.28),rgba(66,194,194,.16)); }
        .ddt-trip-name { font-size:17px; font-weight:700; color:#F0EDE8; line-height:1.1; }
        .ddt-count { display:flex; align-items:center; gap:9px; margin-top:9px; font-size:11px; color:rgba(240,237,232,.78); }
        .ddt-live { display:inline-flex; align-items:center; gap:4px; font-family:ui-monospace,SFMono-Regular,monospace; font-size:8px; letter-spacing:1px; color:#FF5B00; }
        .ddt-live i { width:5px; height:5px; border-radius:999px; background:#FF5B00; animation:ddtLive 1.4s ease-in-out infinite; }
        .ddt-bar { height:5px; border-radius:999px; background:rgba(255,255,255,.12); margin-top:11px; overflow:hidden; }
        .ddt-bar-fill { height:100%; border-radius:999px; width:62%;
          background:linear-gradient(90deg,#F47B45,#E63957,#C44E92); animation:ddtBar 1.6s ease forwards; }
        .ddt-itin { display:flex; flex-direction:column; gap:3px; margin-top:2px; }
        .ddt-row { display:flex; align-items:center; gap:10px; padding:9px 11px; border-radius:12px; background:rgba(255,255,255,.04); }
        .ddt-rdot { width:7px; height:7px; border-radius:999px; background:#42C2C2; flex-shrink:0; }
        .ddt-time { font-family:ui-monospace,SFMono-Regular,monospace; font-size:10px; color:rgba(240,237,232,.55); width:34px; flex-shrink:0; }
        .ddt-label { font-size:11.5px; color:#F0EDE8; }
        .ddt-push { position:absolute; top:15px; left:13px; right:13px; z-index:10; display:flex; gap:10px; align-items:flex-start;
          padding:10px 12px; border-radius:16px; background:rgba(22,30,44,.9); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.13); box-shadow:0 14px 34px -10px rgba(0,0,0,.65); animation:ddtPush 7s ease-in-out infinite; }
        .ddt-push-ico { width:30px; height:30px; border-radius:9px; flex-shrink:0; display:flex; align-items:center; justify-content:center;
          color:#fff; font-weight:800; font-size:14px; background:linear-gradient(135deg,#F47B45,#C44E92); }
        .ddt-push-txt { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .ddt-push-title { font-size:10px; font-weight:700; color:#F0EDE8; }
        .ddt-push-body { font-size:10px; line-height:1.35; color:rgba(240,237,232,.72); }
        @media (prefers-reduced-motion: reduce){
          .ddt-phone,.ddt-bar-fill,.ddt-live i { animation:none; }
          .ddt-push { animation:none; transform:translateY(-150%); opacity:0; }
          .ddt-bar-fill { width:62%; }
        }
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
        <div className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: '#0C1521' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 60% at 78% 40%, rgba(196,78,146,.30), transparent 70%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 95% 90%, rgba(66,194,194,.22), transparent 70%)' }} />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12">
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

            {/* iPhone mockup animado */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="ddt-phone">
                <div className="ddt-frame">
                  <div className="ddt-island" />
                  <div className="ddt-screen">
                    <div className="ddt-sb">
                      <time>9:41</time>
                      <span className="ddt-batt" />
                    </div>
                    <span className="ddt-eyebrow">{ph.greeting}</span>
                    <div className="ddt-trip">
                      <div className="ddt-trip-name">{ph.tripName}</div>
                      <div className="ddt-count">
                        <span className="ddt-live"><i />{ph.live}</span>
                        {ph.countdown}
                      </div>
                      <div className="ddt-bar"><div className="ddt-bar-fill" /></div>
                    </div>
                    <div className="ddt-itin">
                      {ph.items.map((it) => (
                        <div className="ddt-row" key={it.time}>
                          <span className="ddt-rdot" />
                          <span className="ddt-time">{it.time}</span>
                          <span className="ddt-label">{it.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Notificación push */}
                  <div className="ddt-push">
                    <span className="ddt-push-ico">D</span>
                    <span className="ddt-push-txt">
                      <span className="ddt-push-title">{ph.pushTitle}</span>
                      <span className="ddt-push-body">{ph.pushBody}</span>
                    </span>
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
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-[#0C1521]/8 p-6 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_12px_30px_-12px_rgba(5,14,31,.18)]"
              >
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
