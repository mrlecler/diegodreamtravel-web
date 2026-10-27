/**
 * Permiso para cookies y herramientas de terceros.
 *
 * Hoy la web NO usa nada que necesite permiso:
 *  - Vercel Web Analytics cuenta visitas sin cookies.
 *  - El idioma se guarda en localStorage porque hace falta para mostrar la
 *    web como la persona eligió.
 * Por eso la lista de abajo está vacía, y mientras esté vacía el aviso de
 * cookies (components/AvisoCookies.tsx) y el link «Cookies» del pie NO se
 * muestran. Pedir permiso por algo que no lo necesita solo molesta.
 *
 * El día que se sume el píxel de Meta, Google Analytics o cualquier cosa
 * que deje cookies o mande datos a un tercero, se agrega acá y listo: el
 * aviso aparece solo, y la herramienta se carga ÚNICAMENTE después de que
 * la persona toca «Aceptar». Con «Rechazar» no se carga nada de terceros.
 * Acordate de sumarla también a la política (/privacidad).
 */

export type Herramienta = {
  /** Identificador interno, sin espacios: 'meta-pixel', 'ga4'… */
  id: string;
  /** Cómo se la nombra en el aviso: 'Meta', 'Google Analytics'… */
  nombre: string;
  /** Para qué se usa, en minúscula, completa la frase «Usamos cookies de X para …» */
  para: { es: string; en: string };
  /** Carga el script. Solo se llama después de «Aceptar». */
  cargar: () => void;
};

/* ═══════════════════════════════════════════════════════════════════
   ACÁ SE AGREGA UNA HERRAMIENTA QUE NECESITE PERMISO.

   Ejemplo (NO activar sin actualizar la política de privacidad):

   {
     id: 'meta-pixel',
     nombre: 'Meta',
     para: { es: 'saber qué publicidad funciona', en: 'measure which ads work' },
     cargar: () => {
       const s = document.createElement('script');
       s.async = true;
       s.src = 'https://connect.facebook.net/en_US/fbevents.js';
       document.head.appendChild(s);
       // …y la inicialización que pida la herramienta.
     },
   },
   ═══════════════════════════════════════════════════════════════════ */
export const HERRAMIENTAS_CON_PERMISO: Herramienta[] = [];

export const hayQuePedirPermiso = HERRAMIENTAS_CON_PERMISO.length > 0;

export type Eleccion = 'aceptado' | 'rechazado';

/** Cookie propia donde queda la elección, 180 días. */
export const COOKIE_CONSENTIMIENTO = 'ddt_consentimiento';
const DIAS = 180;

/** Evento para volver a abrir el aviso desde el link «Cookies» del pie. */
export const EVENTO_ABRIR_AVISO = 'ddt:abrir-aviso-cookies';

export function leerEleccion(): Eleccion | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENTIMIENTO}=([^;]*)`));
  const v = m ? decodeURIComponent(m[1]) : null;
  return v === 'aceptado' || v === 'rechazado' ? v : null;
}

export function guardarEleccion(e: Eleccion) {
  const segura = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_CONSENTIMIENTO}=${e}; Max-Age=${DIAS * 24 * 60 * 60}; Path=/; SameSite=Lax${segura}`;
}

let cargadas = false;
/** Carga las herramientas una sola vez por visita. */
export function cargarHerramientas() {
  if (cargadas) return;
  cargadas = true;
  for (const h of HERRAMIENTAS_CON_PERMISO) {
    try {
      h.cargar();
    } catch (err) {
      console.error(`[cookies] no se pudo cargar ${h.id}:`, err);
    }
  }
}
