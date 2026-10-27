'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/language';
import {
  HERRAMIENTAS_CON_PERMISO,
  hayQuePedirPermiso,
  leerEleccion,
  guardarEleccion,
  cargarHerramientas,
  EVENTO_ABRIR_AVISO,
  type Eleccion,
} from '@/lib/consentimiento';

/**
 * Aviso de cookies. Hoy no se muestra: solo aparece si hay alguna
 * herramienta en HERRAMIENTAS_CON_PERMISO (src/lib/consentimiento.ts).
 *
 * - Abajo de lado a lado en el celular; tarjeta abajo a la izquierda en la compu.
 * - «Rechazar» y «Aceptar» del mismo tamaño (48 px de alto).
 * - La elección queda en una cookie propia por 180 días.
 * - Se vuelve a abrir desde el link «Cookies» del pie.
 */
const TEXTOS = {
  es: { usamos: 'Usamos cookies de', para: 'para', solo: 'Solo se activan si las aceptas.', mas: 'Más información', rechazar: 'Rechazar', aceptar: 'Aceptar', titulo: 'Cookies' },
  en: { usamos: 'We use cookies from', para: 'to', solo: 'They only turn on if you accept them.', mas: 'Learn more', rechazar: 'Reject', aceptar: 'Accept', titulo: 'Cookies' },
};

function lista(nombres: string[], y: string) {
  if (nombres.length < 2) return nombres.join('');
  return `${nombres.slice(0, -1).join(', ')} ${y} ${nombres[nombres.length - 1]}`;
}

export default function AvisoCookies() {
  const { lang } = useLang();
  const [abierto, setAbierto] = useState(false);
  const primerBoton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hayQuePedirPermiso) return;
    const previa = leerEleccion();
    if (previa === 'aceptado') cargarHerramientas();
    // Se abre si la persona todavía no eligió. Es el estado inicial del
    // aviso leído de la cookie, que solo existe en el navegador.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!previa) setAbierto(true);
    function reabrir() {
      setAbierto(true);
      setTimeout(() => primerBoton.current?.focus(), 0);
    }
    window.addEventListener(EVENTO_ABRIR_AVISO, reabrir);
    return () => window.removeEventListener(EVENTO_ABRIR_AVISO, reabrir);
  }, []);

  if (!hayQuePedirPermiso || !abierto) return null;

  const t = TEXTOS[lang] || TEXTOS.es;
  const nombres = HERRAMIENTAS_CON_PERMISO.map((h) => h.nombre);
  const usos = HERRAMIENTAS_CON_PERMISO.map((h) => h.para[lang] || h.para.es);

  function elegir(e: Eleccion) {
    guardarEleccion(e);
    if (e === 'aceptado') cargarHerramientas();
    // Rechazar después de haber aceptado deja de cargar desde la próxima
    // página: lo ya cargado en esta visita no se puede descargar.
    setAbierto(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="aviso-cookies-texto"
      className="fixed z-[9999] inset-x-0 bottom-0 border-t border-[rgba(240,237,232,.14)] bg-[#0b1626] px-4 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))] shadow-[0_-18px_40px_-20px_rgba(0,0,0,.8)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-[440px] sm:rounded-[20px] sm:border sm:p-5"
      onKeyDown={(e) => { if (e.key === 'Escape') setAbierto(false); }}
    >
      <p id="aviso-cookies-texto" className="m-0 mb-3.5 text-[16px] sm:text-[15px] leading-relaxed text-[#F0EDE8]">
        {t.usamos} {lista(nombres, lang === 'en' ? 'and' : 'y')} {t.para} {lista(usos, lang === 'en' ? 'and' : 'y')}. {t.solo}{' '}
        <Link href="/privacidad#cookies" className="text-[#F0EDE8] underline underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47B45]">
          {t.mas}
        </Link>
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        <button
          ref={primerBoton}
          type="button"
          onClick={() => elegir('rechazado')}
          className="min-h-[48px] rounded-full border border-[rgba(240,237,232,.35)] bg-transparent text-[16px] sm:text-[15px] font-bold text-[#F0EDE8] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47B45]"
        >
          {t.rechazar}
        </button>
        <button
          type="button"
          onClick={() => elegir('aceptado')}
          className="min-h-[48px] rounded-full border-0 text-[16px] sm:text-[15px] font-bold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47B45]"
          style={{ background: 'var(--grad-ddt)' }}
        >
          {t.aceptar}
        </button>
      </div>
    </div>
  );
}
