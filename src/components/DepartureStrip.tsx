'use client';

import { useState, useEffect, useRef } from 'react';
import { AirplaneTakeoff } from '@phosphor-icons/react';

const DESTINOS = [
  { name: 'WALT DISNEY WORLD',   meta: 'ORLANDO · FL' },
  { name: 'UNIVERSAL ORLANDO',   meta: 'ORLANDO · FL' },
  { name: 'DISNEYLAND',          meta: 'LOS ÁNGELES · CA' },
  { name: 'UNIVERSAL HOLLYWOOD', meta: 'LOS ÁNGELES · CA' },
  { name: 'UNIVERSAL KIDS',      meta: 'TEXAS · NUEVO' },
  { name: 'NEW YORK',            meta: 'NUEVA YORK · NY' },
  { name: 'LAS VEGAS',           meta: 'NEVADA · NV' },
];

const PAD_LEN = 19; // 'UNIVERSAL HOLLYWOOD' es 19 chars → el más largo
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ·';

// ─── Tablilla individual ───────────────────────────────────────────────────
function Flap({
  target,
  colIndex,
  reduce,
}: {
  target: string;
  colIndex: number;
  reduce: boolean;
}) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    if (prevRef.current === target) return;
    prevRef.current = target;

    if (reduce) {
      setDisplay(target);
      return;
    }

    const delay = colIndex * 45;       // barrido izquierda → derecha
    const scrambleDuration = 380;      // cuánto tiempo cicla antes de fijarse
    const frameMs = 55;

    let t1: ReturnType<typeof setTimeout>;
    let iv: ReturnType<typeof setInterval>;
    let t2: ReturnType<typeof setTimeout>;

    t1 = setTimeout(() => {
      iv = setInterval(() => {
        setDisplay(GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }, frameMs);

      t2 = setTimeout(() => {
        clearInterval(iv);
        setDisplay(target);
      }, scrambleDuration);
    }, delay);

    return () => {
      clearTimeout(t1);
      clearInterval(iv!);
      clearTimeout(t2!);
    };
  }, [target, colIndex, reduce]);

  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center font-mono font-semibold rounded-sm select-none"
      style={{
        width: '1ch',
        height: '1.45em',
        fontSize: 'inherit',
        color: '#F0EDE8',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {display === ' ' ? ' ' : display}
    </span>
  );
}

// ─── Panel principal ───────────────────────────────────────────────────────
export default function DepartureStrip() {
  const [idx, setIdx]       = useState(0);
  const reduce = false; // animaciones siempre activas (no frenar por prefers-reduced-motion)

  // loop de destinos
  // 4 000ms normal: ~1 235ms de animación + 2 400ms de hold + buffer
  // 2 700ms reduce: fade 300ms + hold 2 400ms
  useEffect(() => {
    const ms = reduce ? 2700 : 4000;
    const id = setInterval(() => setIdx((p) => (p + 1) % DESTINOS.length), ms);
    return () => clearInterval(id);
  }, [reduce]);

  const dest        = DESTINOS[idx];
  const paddedName  = dest.name.padEnd(PAD_LEN, ' ');
  const isNew       = dest.meta.includes('NUEVO');
  const metaDisplay = isNew ? dest.meta.replace('· NUEVO', '').trim() : dest.meta;

  return (
    <div
      role="region"
      aria-label="Destinos donde soy especialista"
      className="max-w-3xl mx-auto"
    >
      <style>{`
        @keyframes metaFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#0C1521',
          boxShadow: '0 4px 24px rgba(5,14,31,.20)',
        }}
      >
        {/* Línea superior gradiente de marca */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 2,
            background: 'linear-gradient(90deg,#F47B45,#E63957,#C44E92,#42C2C2)',
          }}
        />

        <div className="px-6 py-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          {/* Rótulo fijo */}
          <div className="flex items-center gap-2 shrink-0">
            <AirplaneTakeoff size={18} weight="duotone" color="#F0EDE8" />
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'rgba(240,237,232,0.60)' }}
            >
              TE LLEVO A
            </span>
          </div>

          {/* Tablillas — ancho fijo (PAD_LEN chars en font-mono) */}
          <div
            aria-hidden
            className="flex items-center gap-[2px] text-lg sm:text-xl"
          >
            {paddedName.split('').map((char, i) => (
              <Flap key={i} target={char} colIndex={i} reduce={reduce} />
            ))}
          </div>

          {/* Meta — fade simple */}
          <div className="flex items-center gap-1.5">
            <span
              key={`${idx}-meta`}
              className="font-mono text-xs tracking-widest"
              style={{
                color: 'rgba(240,237,232,0.50)',
                animation: reduce ? 'none' : 'metaFadeIn 300ms ease forwards',
              }}
            >
              {metaDisplay}
            </span>
            {isNew && (
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: '#FF5B00' }}
                title="Destino nuevo"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
