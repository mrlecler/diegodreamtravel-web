'use client';

/**
 * Divisor de secciones con identidad de viaje: línea punteada que se desvanece
 * en los extremos y un avión (PNG de marca) que la recorre, lento, con estela.
 * Pensado para ir ENTRE secciones (sobre fondo crema o blanco).
 */
export default function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`ddt-div ${className}`} aria-hidden="true">
      <style>{`
        .ddt-div { position:relative; width:100%; max-width:1080px; margin:0 auto; height:56px; padding:0 24px; }
        .ddt-div-line { position:absolute; top:50%; left:24px; right:24px; height:0;
          border-top:2px dotted rgba(12,21,33,.18);
          -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 14%,#000 86%,transparent 100%);
                  mask-image:linear-gradient(90deg,transparent 0,#000 14%,#000 86%,transparent 100%); }
        .ddt-div-plane { position:absolute; top:50%; transform:translate(-50%,-50%);
          animation:ddtFly 60s linear infinite; }
        .ddt-div-plane .glow { position:absolute; top:50%; left:50%; width:62px; height:62px;
          transform:translate(-50%,-50%); border-radius:50%;
          background:radial-gradient(circle, rgba(255,91,0,.22), transparent 68%); }
        .ddt-div-plane .trail { position:absolute; top:50%; right:52%; transform:translateY(-50%);
          width:62px; height:3px; border-radius:3px;
          background:linear-gradient(90deg, transparent, rgba(255,91,0,.5)); }
        .ddt-div-plane img { position:relative; display:block; width:52px; height:auto;
          filter:drop-shadow(0 3px 6px rgba(255,91,0,.35)); }
        @keyframes ddtFly {
          0%   { left:24px; opacity:0; }
          5%   { opacity:1; }
          95%  { opacity:1; }
          100% { left:calc(100% - 24px); opacity:0; }
        }
      `}</style>
      <span className="ddt-div-line" />
      <span className="ddt-div-plane">
        <span className="glow" />
        <span className="trail" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/decor/plane.png" alt="" />
      </span>
    </div>
  );
}
