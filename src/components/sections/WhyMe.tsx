'use client';

import {
  SealCheck, UserCircle, CreditCard, Headset, Check,
  SignOut, CaretRight, House, Question, MapTrifold, Ticket, BookOpen, Heartbeat,
} from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
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

  const blockRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  // Parallax: el teléfono sigue suavemente el mouse (suma un giro leve sobre la pose 3D)
  useEffect(() => {
    const block = blockRef.current;
    const tilt = tiltRef.current;
    if (!block || !tilt) return;
    if (!window.matchMedia('(pointer:fine)').matches || !window.matchMedia('(min-width:1024px)').matches) return;

    let curX = 0, curY = 0, tgtX = 0, tgtY = 0, raf = 0;
    const tick = () => {
      curY += (tgtY - curY) * 0.12;
      curX += (tgtX - curX) * 0.12;
      tilt.style.setProperty('--px', curY.toFixed(2) + 'deg'); // rotateY
      tilt.style.setProperty('--py', curX.toFixed(2) + 'deg'); // rotateX
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
        @keyframes ddtPush {
          0%,5%{ transform:translateY(170%); opacity:0; }
          11%,44%{ transform:translateY(0); opacity:1; }
          52%,100%{ transform:translateY(170%); opacity:0; }
        }
        @keyframes ddtGlow { 0%,100%{opacity:.82} 50%{opacity:1} }

        /* ===== Stage + glows (valores tomados del render 3D) ===== */
        .ddt-stage { position:relative; display:flex; align-items:center; justify-content:center; width:100%; min-height:660px; }
        .ddt-glow { position:absolute; border-radius:50%; pointer-events:none; z-index:0; animation:ddtGlow 5.5s ease-in-out infinite; }
        .ddt-gHalo { width:90.2%; height:66.1%; top:16.9%; left:4.9%;  filter:blur(28px); background:radial-gradient(circle, rgba(196,78,146,.5), rgba(124,77,205,.28) 42%, transparent 68%); animation:none; }
        .ddt-gFu   { width:60.2%; height:44.1%; top:8%;    left:12%;   filter:blur(26px); background:radial-gradient(circle, rgba(196,78,146,.85), transparent 60%); }
        .ddt-gTe   { width:56.4%; height:41.3%; top:52.6%; left:35.5%; filter:blur(26px); background:radial-gradient(circle, rgba(66,194,194,.8), transparent 60%); animation-delay:1.2s; }
        .ddt-gVi   { width:43.2%; height:31.7%; top:36%;   left:34.7%; filter:blur(30px); background:radial-gradient(circle, rgba(124,77,205,.7), transparent 62%); animation-delay:.6s; }
        .ddt-gOr   { width:35.7%; height:26.2%; top:51.8%; left:16%;   filter:blur(26px); background:radial-gradient(circle, rgba(244,123,69,.6), transparent 62%); animation-delay:1.8s; }
        .ddt-gShad { width:37.6%; height:5%;    top:84%;   left:31.2%; filter:blur(26px); background:radial-gradient(ellipse at center, rgba(0,0,0,.55), transparent 70%); animation:none; }

        /* ===== Perspectiva + parallax + float + pose ===== */
        .ddt-float { position:relative; animation:ddtFloaty 6s ease-in-out infinite; z-index:2; }
        .ddt-persp { perspective:1900px; }
        .ddt-parallax { transform:rotateX(var(--py,0deg)) rotateY(var(--px,0deg)); transform-style:preserve-3d; }
        .ddt-pose { transform:none; transform-style:preserve-3d; }

        /* ===== iPhone ===== */
        .ddt-frame { position:relative; width:272px; border-radius:58px; padding:3px;
          background:linear-gradient(116deg,#D7DADE 0%,#6B6F74 6%,#F1F3F5 15%,#7E8389 26%,#3C4045 37%,#BCC0C5 51%,#585C62 63%,#E6E9EC 77%,#4E5257 89%,#A6AAAF 100%);
          box-shadow:0 1px 2px rgba(255,255,255,.5), 0 26px 50px -18px rgba(0,0,0,.75), 0 50px 90px -30px rgba(0,0,0,.55); }
        .ddt-btn { position:absolute; border-radius:2px 3px 3px 2px; z-index:1;
          background:linear-gradient(180deg,#A3A8AE,#565A60 16%,#3A3E43 50%,#565A60 84%,#A3A8AE); }
        .ddt-btn.pw  { width:3px; height:11%; top:40%; right:-3px; border-radius:3px 2px 2px 3px; }
        .ddt-btn.ac  { width:3px; height:3.6%; top:26%; left:-3px; }
        .ddt-btn.vu  { width:3px; height:6.7%; top:36%; left:-3px; }
        .ddt-btn.vd  { width:3px; height:6.7%; top:46%; left:-3px; }
        .ddt-bezel { position:relative; border-radius:54px; padding:9px; background:#05070b;
          box-shadow:inset 0 0 0 2px #090b10, inset 0 0 0 3px rgba(255,255,255,.12), inset 0 0 7px 0 #000; }
        .ddt-island { position:absolute; top:13px; left:50%; transform:translateX(-50%); width:96px; height:27px; background:#000; border-radius:999px; z-index:10; }
        .ddt-screen { position:relative; border-radius:42px; overflow:hidden; background:#080c14; padding:40px 14px 0; min-height:540px; display:flex; flex-direction:column; }

        .ddt-sb { display:flex; justify-content:space-between; align-items:center; padding:0 8px 8px; }
        .ddt-sb time { font-family:ui-monospace,SFMono-Regular,monospace; font-size:11px; color:#F0EDE8; font-weight:600; }
        .ddt-batt { width:20px; height:10px; border-radius:3px; border:1px solid rgba(240,237,232,.5); position:relative; }
        .ddt-batt::after { content:''; position:absolute; inset:1.5px; right:6px; border-radius:1px; background:rgba(240,237,232,.85); }

        .ddt-head { display:flex; align-items:center; justify-content:space-between; padding:2px 4px 12px; border-bottom:1px solid rgba(255,255,255,.07); }
        .ddt-pax { font-size:15px; font-weight:700; color:#F0EDE8; }
        .ddt-trip { position:relative; border-radius:18px; padding:15px 16px 16px; margin-top:13px; overflow:hidden;
          background:linear-gradient(105deg,#FF5B00 0%,#E63957 38%,#C44E92 68%,#42C2C2 100%); box-shadow:0 14px 30px -12px rgba(196,78,146,.5); }
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
        .ddt-nav { display:flex; justify-content:space-between; align-items:center; padding:12px 10px 14px; margin-top:14px; border-top:1px solid rgba(255,255,255,.07); }
        .ddt-nav span { display:flex; flex-direction:column; align-items:center; gap:3px; font-size:8px; color:rgba(240,237,232,.4); }
        .ddt-nav span.on { color:#FF5B00; }

        .ddt-push { position:absolute; bottom:72px; left:12px; right:12px; z-index:20; display:flex; gap:10px; align-items:flex-start;
          padding:10px 12px; border-radius:16px; background:rgba(18,24,36,.96); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.13); box-shadow:0 14px 34px -10px rgba(0,0,0,.7); animation:ddtPush 7.5s ease-in-out infinite; }
        .ddt-push-ico { width:30px; height:30px; border-radius:9px; flex-shrink:0; display:flex; align-items:center; justify-content:center;
          color:#fff; font-weight:800; font-size:14px; background:linear-gradient(135deg,#F47B45,#C44E92); }
        .ddt-push-txt { display:flex; flex-direction:column; gap:2px; min-width:0; }
        .ddt-push-title { font-size:10px; font-weight:700; color:#F0EDE8; }
        .ddt-push-body { font-size:10px; line-height:1.35; color:rgba(240,237,232,.72); }

        @media (max-width:640px){ .ddt-frame{ width:248px; } .ddt-stage{ min-height:560px; } }
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

            {/* iPhone 3D + glows */}
            <div className="order-1 lg:order-2 ddt-stage">
              <span className="ddt-glow ddt-gHalo" />
              <span className="ddt-glow ddt-gFu" />
              <span className="ddt-glow ddt-gTe" />
              <span className="ddt-glow ddt-gVi" />
              <span className="ddt-glow ddt-gOr" />
              <span className="ddt-glow ddt-gShad" />

              <div className="ddt-float">
                <div className="ddt-persp">
                  <div ref={tiltRef} className="ddt-parallax">
                    <div className="ddt-pose">
                      <div className="ddt-frame">
                        <span className="ddt-btn ac" /><span className="ddt-btn vu" /><span className="ddt-btn vd" /><span className="ddt-btn pw" />
                        <div className="ddt-bezel">
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
