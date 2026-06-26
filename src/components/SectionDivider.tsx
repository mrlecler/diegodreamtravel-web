'use client';

import { AirplaneTilt } from '@phosphor-icons/react';

/**
 * Divisor de secciones con identidad de viaje: línea punteada que se desvanece
 * en los extremos y un avión que la recorre en loop dejando una estela.
 * Pensado para ir ENTRE secciones (sobre fondo crema o blanco).
 */
export default function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`ddt-div ${className}`} aria-hidden="true">
      <style>{`
        .ddt-div { position:relative; width:100%; max-width:1080px; margin:0 auto; height:44px; padding:0 24px; }
        .ddt-div-line { position:absolute; top:50%; left:24px; right:24px; height:0;
          border-top:2px dotted rgba(12,21,33,.18);
          -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 14%,#000 86%,transparent 100%);
                  mask-image:linear-gradient(90deg,transparent 0,#000 14%,#000 86%,transparent 100%); }
        .ddt-div-plane { position:absolute; top:50%; transform:translate(-50%,-50%);
          animation:ddtFly 9s linear infinite; }
        .ddt-div-plane .glow { position:absolute; top:50%; left:50%; width:56px; height:56px;
          transform:translate(-50%,-50%); border-radius:50%;
          background:radial-gradient(circle, rgba(255,91,0,.30), transparent 68%); }
        .ddt-div-plane .trail { position:absolute; top:50%; right:62%; transform:translateY(-50%);
          width:48px; height:3px; border-radius:3px;
          background:linear-gradient(90deg, transparent, rgba(255,91,0,.6)); }
        .ddt-div-plane svg { position:relative; display:block; color:#FF5B00;
          filter:drop-shadow(0 2px 5px rgba(255,91,0,.45)); }
        @keyframes ddtFly {
          0%   { left:24px; opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { left:calc(100% - 24px); opacity:0; }
        }
      `}</style>
      <span className="ddt-div-line" />
      <span className="ddt-div-plane">
        <span className="glow" />
        <span className="trail" />
        <AirplaneTilt size={26} weight="fill" />
      </span>
    </div>
  );
}
