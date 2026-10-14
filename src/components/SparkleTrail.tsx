'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   Estela de estrellitas que sigue al mouse.

   - Sobre las secciones oscuras (las marcadas con data-nav-dark, la misma
     marca que usa el nav) las estrellitas son claras y brillan. Para algo
     oscuro DENTRO de una sección clara (ej. las tarjetas con foto de
     Servicios) se usa data-sparkle-dark, que no afecta al nav.
   - Sobre las secciones claras (crema) usan los colores de marca, más
     saturados, para que se vean.
   - Solo con mouse: en celulares y tablets no se monta (no hay cursor).
   - Respeta "reducir movimiento" del sistema: si está activo, no hace nada.
   - El canvas no captura clicks (pointer-events: none) y el loop de
     animación se apaga solo cuando no quedan estrellitas en pantalla.
   ───────────────────────────────────────────────────────────────────── */

type Tema = 'oscuro' | 'claro';

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number; // radio en px CSS
  rot: number;
  giro: number;
  nace: number; // ms
  vida: number; // ms
  color: string;
  estrella: boolean; // true = estrella de 4 puntas, false = punto
  tema: Tema;
};

// Fondo oscuro: blancos cálidos con toques de dorado, celeste y rosa.
const PALETA_OSCURO = ['#FFFFFF', '#FFFFFF', '#F0EDE8', '#F5C842', '#A8E6E6', '#F7B2C4'];
// Fondo claro (crema #F0EDE8): colores DDT, que contrastan con el crema.
const PALETA_CLARO = ['#FF5B00', '#E63957', '#C44E92', '#2BA3A3', '#E0A400'];

const MAX_PARTICULAS = 140;
const PX_POR_PARTICULA = 9; // una estrellita cada ~9 px de recorrido

function azar(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function elegir<T>(lista: T[]): T {
  return lista[Math.floor(Math.random() * lista.length)];
}

// Estrella de 4 puntas con las caras curvas hacia adentro (tipo "destello").
function dibujarEstrella(ctx: CanvasRenderingContext2D, r: number) {
  const k = r * 0.18;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.quadraticCurveTo(k, -k, r, 0);
  ctx.quadraticCurveTo(k, k, 0, r);
  ctx.quadraticCurveTo(-k, k, -r, 0);
  ctx.quadraticCurveTo(-k, -k, 0, -r);
  ctx.closePath();
  ctx.fill();
}

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Solo dispositivos con mouse real y sin "reducir movimiento".
    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)');
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!conMouse.matches || quieto.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ancho = 0;
    let alto = 0;
    let dpr = 1;
    const ajustar = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      canvas.style.width = `${ancho}px`;
      canvas.style.height = `${alto}px`;
    };
    ajustar();

    const particulas: Particula[] = [];
    let raf = 0;
    let ultimo: { x: number; y: number } | null = null;
    let resto = 0; // recorrido acumulado que todavía no generó estrellita

    // ¿El cursor está sobre una sección oscura? Se cachea por elemento para
    // no recorrer el DOM en cada movimiento.
    let ultimoEl: Element | null = null;
    let ultimoTema: Tema = 'oscuro';
    const temaEn = (x: number, y: number): Tema => {
      const el = document.elementFromPoint(x, y);
      if (el && el === ultimoEl) return ultimoTema;
      ultimoEl = el;
      ultimoTema = el && el.closest('[data-nav-dark], [data-sparkle-dark]') ? 'oscuro' : 'claro';
      return ultimoTema;
    };

    const crear = (x: number, y: number, tema: Tema, ahora: number) => {
      if (particulas.length >= MAX_PARTICULAS) particulas.shift();
      const estrella = Math.random() < 0.6;
      particulas.push({
        x: x + azar(-6, 6),
        y: y + azar(-6, 6),
        vx: azar(-0.25, 0.25),
        vy: azar(-0.1, 0.45), // caen apenas, como polvo
        r: estrella ? azar(3, 7.5) : azar(1, 2.2),
        rot: azar(0, Math.PI),
        giro: azar(-0.004, 0.004),
        nace: ahora,
        vida: azar(550, 1000),
        color: elegir(tema === 'oscuro' ? PALETA_OSCURO : PALETA_CLARO),
        estrella,
        tema,
      });
    };

    const frame = (ahora: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, ancho, alto);

      for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];
        const t = (ahora - p.nace) / p.vida;
        if (t >= 1) {
          particulas.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.giro * 16;

        // Aparece rápido, se apaga despacio; además titila un poco.
        const entrada = Math.min(1, t / 0.12);
        const salida = Math.pow(1 - t, 1.6);
        const titila = 0.8 + 0.2 * Math.sin((ahora - p.nace) / 55 + p.rot * 3);
        const alfa = entrada * salida * titila;
        const escala = 0.55 + 0.45 * (1 - t);
        const r = p.r * escala;

        ctx.save();
        ctx.translate(p.x, p.y);

        // Halo suave. En oscuro suma luz; en claro es una sombra de color tenue.
        const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 3.2);
        halo.addColorStop(0, p.color);
        halo.addColorStop(1, `${p.color}00`); // mismo color, transparente (sin ensuciar de gris)
        ctx.globalCompositeOperation = p.tema === 'oscuro' ? 'lighter' : 'source-over';
        ctx.globalAlpha = alfa * (p.tema === 'oscuro' ? 0.28 : 0.14);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(0, 0, r * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = alfa;
        ctx.fillStyle = p.color;
        if (p.estrella) {
          ctx.rotate(p.rot);
          dibujarEstrella(ctx, r);
          // Centro blanco en oscuro para que "destelle"
          if (p.tema === 'oscuro') {
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = alfa * 0.9;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(0.6, r * 0.18), 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      raf = particulas.length ? requestAnimationFrame(frame) : 0;
    };

    const arrancar = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const mover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const x = e.clientX;
      const y = e.clientY;
      const ahora = performance.now();
      if (!ultimo) {
        ultimo = { x, y };
        return;
      }
      const dx = x - ultimo.x;
      const dy = y - ultimo.y;
      const dist = Math.hypot(dx, dy);
      ultimo = { x, y };
      if (dist < 1) return;

      resto += dist;
      const n = Math.min(4, Math.floor(resto / PX_POR_PARTICULA));
      if (!n) return;
      resto -= n * PX_POR_PARTICULA;

      const tema = temaEn(x, y);
      for (let i = 0; i < n; i++) {
        // Repartidas a lo largo del tramo recorrido, no amontonadas en el cursor.
        const f = (i + 1) / n;
        crear(x - dx * (1 - f), y - dy * (1 - f), tema, ahora);
      }
      arrancar();
    };

    const salir = () => {
      ultimo = null;
      resto = 0;
    };

    // Si el scroll mueve una sección distinta bajo el cursor, recalcular tema.
    const alScroll = () => {
      ultimoEl = null;
    };

    window.addEventListener('pointermove', mover, { passive: true });
    document.addEventListener('pointerleave', salir);
    window.addEventListener('blur', salir);
    window.addEventListener('scroll', alScroll, { passive: true });
    window.addEventListener('resize', ajustar);

    return () => {
      window.removeEventListener('pointermove', mover);
      document.removeEventListener('pointerleave', salir);
      window.removeEventListener('blur', salir);
      window.removeEventListener('scroll', alScroll);
      window.removeEventListener('resize', ajustar);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 150 }}
    />
  );
}
