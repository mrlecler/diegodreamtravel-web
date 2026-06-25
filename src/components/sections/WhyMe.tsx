'use client';

import {
  SealCheck, UserCircle, CreditCard, Headset, Check,
  SignOut, CaretRight, House, Question, MapTrifold, Ticket, BookOpen, Heartbeat,
} from '@phosphor-icons/react';
import { useLang } from '@/lib/language';

const cardIcons = [SealCheck, UserCircle, CreditCard, Headset];
const rowIconMap: Record<string, React.ElementType> = {
  map: MapTrifold, ticket: Ticket, book: BookOpen, heart: Heartbeat,
};
const navIcons = [House, MapTrifold, Ticket, BookOpen, Question];

export default function WhyMe() {
  const { t } = useLang();
  const app = t.why.app;
  const ph = app.phone;

  return (
    <section id="por-que" className="py-20 px-6" style={{ backgroundColor: 'var(--warm)' }}>
      <style>{`
        @keyframes ddtFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes ddtPush {
          0%,5%    { transform: translateY(-160%); opacity: 0; }
          11%,44%  { transform: translateY(0);     opacity: 1; }
          52%,100% { transform: translateY(-160%); opacity: 0; }
        }
        @keyframes ddtGlow { 0%,100%{opacity:.85} 50%{opacity:1} }

        .ddt-stage { position:relative; display:flex; justify-content:center; align-items:center; min-height:540px; perspective:1700px; }
        .ddt-glow { position:absolute; border-radius:50%; pointer-events:none; z-index:0; animation:ddtGlow 5s ease-in-out infinite; }
        .ddt-g1 { width:340px; height:340px; top:4%;  left:-4%;  filter:blur(54px); background:radial-gradient(circle,rgba(196,78,146,.6),transparent 64%); }
        .ddt-g2 { width:300px; height:300px; bottom:2%; right:-6%; filter:blur(58px); background:radial-gradient(circle,rgba(66,194,194,.5),transparent 64%); animation-delay:1.2s; }
        .ddt-g3 { width:280px; height:280px; top:34%; left:34%;  filter:blur(66px); background:radial-gradient(circle,rgba(124,77,205,.55),transparent 64%); animation-delay:.6s; }
        .ddt-g4 { width:230px; height:210px; bottom:14%; left:4%; filter:blur(52px); background:radial-gradient(circle,rgba(244,123,69,.4),transparent 64%); animation-delay:1.8s; }

        .ddt-tilt { position:relative; z-index:2; transform:rotateY(-22deg) rotateX(6deg); transform-style:preserve-3d; }
        .ddt-phone { animation:ddtFloat 6s ease-in-out infinite; width:262px; }
        .ddt-frame { position:relative; border-radius:46px; padding:9px;
          background:linear-gradient(145deg,#262b3d 0%,#0a0d14 46%);
          box-shadow:0 44px 96px -30px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.05),
                     inset 0 1px 1px rgba(255,255,255,.22), inset 0 -2px 6px rgba(0,0,0,.5); }
        .ddt-island { position:absolute; top:19px; left:50%; transform:translateX(-50%); width:80px; height:22px; background:#05080f; border-radius:999px; z-index:6; }
        .ddt-screen { position:relative; border-radius:38px; overflow:hidden; background:#080c14; padding:40px 15px 0; min-height:496px; display:flex; flex-direction:column; }
        .ddt-sb { display:flex; justify-content:space-between; align-items:center; padding:0 8px 8px; }
        .ddt-sb time { font-family:ui-monospace,SFMono-Regular,monospace; font-size:11px; color:#F0EDE8; font-weight:600; }
        .ddt-batt { width:20px; height:10px; border-radius:3px; border:1px solid rgba(240,237,232,.5); position:relative; }
        .ddt-batt::after { content:''; position:absolute; inset:1.5px; right:6px; border-radius:1px; background:rgba(240,237,232,.85); }

        .ddt-head { display:flex; align-items:center; justify-content:space-between; padding:2px 4px 12px; border-bottom:1px solid rgba(255,255,255,.07); }
        .ddt-pax { font-size:15px; font-weight:700; color:#F0EDE8; }
        .ddt-trip { position:relative; border-radius:18px; padding:15px 16px 16px; margin-top:13px; overflow:hidden;
          background:linear-gradient(100deg,#F47B45 0%,#E63957 38%,#C44E92 68%,#42C2C2 100%); }
        .ddt-badge { display:inline-block; font-size:8px; font-weight:800; letter-spacing:1.2px; color:#fff; background:rgba(255,255,255,.22); padding:3px 9px; border-radius:999px; margin-bottom:9px; }
        .ddt-trip-name { font-size:18px; font-weight:800; color:#fff; line-height:1.05; }
        .ddt-trip-dest { font-size:12px; color:rgba(255,255,255,.85); margin-top:2px; }
        .ddt-dates { display:grid; grid-template-columns:1fr 1fr; gap:9px; margin-top:11px; }
        .ddt-date { border:1px solid rgba(255,255,255,.09); border-radius:13px; padding:11px 12px; text-align:center; }
        .ddt-date span { font-size:10px; color:rgba(240,237,232,.5); }
        .ddt-date b { display:block; font-size:15px; color:#F0EDE8; margin-top:3px; }
        .ddt-qt { font-size:10px; letter-spacing:1.5px; color:rgba(240,237,232,.45); font-weight:700; margin:15px 2px 9px; }
        .ddt-rows { display:flex; flex-direction:column; gap:8px; }
        .ddt-row { display:flex; align-items:center; gap:11px; padding:11px; border-radius:14px; border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.025); }
        .ddt-rico { width:34px; height:34px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:rgba(255,91,0,.14); }
        .ddt-rtxt { flex:1; min-width:0; }
        .ddt-rtxt b { display:block; font-size:13px; color:#F0EDE8; font-weight:600; }
        .ddt-rtxt small { font-size:10px; color:rgba(240,237,232,.5); }
        .ddt-nav { display:flex; justify-content:space-between; align-items:center; padding:12px 14px 14px; margin-top:14px; border-top:1px solid rgba(255,255,255,.07); }
        .ddt-nav span { display:flex; flex-direction:column; align-items:center; gap:3px; font-size:8px; color:rgba(240,237,232,.4); }
        .ddt-nav span.on { color:#FF5B00; }

        .ddt-push { position:absolute; top:14px; left:13px; right:13px; z-index:10; display:flex; gap:10px; align-items:flex-start;
          padding:10px 12px; border-radius:16px; background:rgba(22,30,44,.92); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.13); box-shadow:0 14px 34px -10px rgba(0,0,0,.7); animation:ddtPush 7.5s ease-in-out infinite; }
        .ddt-push-ico { width:30px; height:30px; border-radius:9px; flex-shrink:0; display:flex; align-items:center; justify-content:center;
          color:#fff; font-weight:800; font-size:14px; background:linear-gradient(135deg,#F47B45,#C44E92); }
        .ddt-push-txt { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .ddt-push-title { font-size:10px; font-weight:700; color:#F0EDE8; }
        .ddt-push-body { font-size:10px; line-height:1.35; color:rgba(240,237,232,.72); }

        @media (max-width:1024px){ .ddt-tilt{ transform:rotateY(-13deg) rotateX(4deg); } }
        @media (max-width:640px){ .ddt-tilt{ transform:none; } .ddt-phone{ width:240px; } .ddt-stage{ min-height:500px; } }
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
        <div className="relative rounded-3xl overflow-hidden" style={{ backgroundColor: '#070B12' }}>
          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12">
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

            {/* iPhone en perspectiva + glows */}
            <div className="order-1 lg:order-2 ddt-stage">
              <span className="ddt-glow ddt-g1" />
              <span className="ddt-glow ddt-g2" />
              <span className="ddt-glow ddt-g3" />
              <span className="ddt-glow ddt-g4" />

              <div className="ddt-tilt">
                <div className="ddt-phone">
                  <div className="ddt-frame">
                    <div className="ddt-island" />
                    <div className="ddt-screen">
                      <div className="ddt-sb"><time>9:41</time><span className="ddt-batt" /></div>
                      <div className="ddt-head">
                        <span className="ddt-pax">{ph.passenger}</span>
                        <SignOut size={17} style={{ color: 'rgba(240,237,232,.6)' }} />
                      </div>
                      <div className="ddt-trip">
                        <span className="ddt-badge">{ph.status}</span>
                        <div className="ddt-trip-name">{ph.tripName}</div>
                        <div className="ddt-trip-dest">{ph.tripDest}</div>
                      </div>
                      <div className="ddt-dates">
                        <div className="ddt-date"><span>{ph.depart}</span><b>—</b></div>
                        <div className="ddt-date"><span>{ph.ret}</span><b>—</b></div>
                      </div>
                      <div className="ddt-qt">{ph.quickTitle}</div>
                      <div className="ddt-rows">
                        {ph.rows.map((r) => {
                          const RIcon = rowIconMap[r.icon] ?? MapTrifold;
                          return (
                            <div className="ddt-row" key={r.title}>
                              <span className="ddt-rico"><RIcon size={18} weight="duotone" style={{ color: '#FF5B00' }} /></span>
                              <span className="ddt-rtxt"><b>{r.title}</b><small>{r.meta}</small></span>
                              <CaretRight size={14} style={{ color: 'rgba(240,237,232,.35)' }} />
                            </div>
                          );
                        })}
                      </div>
                      <div className="ddt-nav">
                        {ph.nav.map((label, i) => {
                          const NIcon = navIcons[i];
                          return (
                            <span key={label} className={i === 0 ? 'on' : ''}>
                              <NIcon size={18} weight={i === 0 ? 'fill' : 'regular'} />
                              {label}
                            </span>
                          );
                        })}
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
