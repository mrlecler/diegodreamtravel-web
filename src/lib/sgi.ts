/**
 * URL base del SGI (app.diegodreamtravel.com), que es quien recibe los leads.
 *
 * La landing NO escribe en Supabase: le pega al endpoint del SGI, que es el
 * único que sabe deduplicar por whatsapp, crear el seguimiento y avisar por
 * mail. Ver POST /api/leads en el repo diego-dream-travel.
 *
 * Criterio fail-closed, igual que el de Resend: solo el dominio de producción
 * escribe en la base de producción. Cualquier otro entorno (dev, preview de
 * Vercel, localhost) va contra el SGI de dev, que usa la base de prueba.
 * Así una prueba desde dev nunca crea un lead real ni dispara un mail real.
 */

const PROD_HOSTS = ['www.diegodreamtravel.com', 'diegodreamtravel.com'];

const SGI_PROD = 'https://app.diegodreamtravel.com';
const SGI_DEV = 'https://dev.app.diegodreamtravel.com';

export function getSgiUrl(): string {
  const override = process.env.NEXT_PUBLIC_SGI_URL;
  if (override) return override.replace(/\/$/, '');

  if (typeof window !== 'undefined' && PROD_HOSTS.includes(window.location.hostname)) {
    return SGI_PROD;
  }

  // En el servidor no hay hostname disponible acá; este valor solo se usa
  // como fallback, el fetch real ocurre en el navegador.
  return typeof window === 'undefined' ? SGI_PROD : SGI_DEV;
}

/** URL pública del PDF de la guía. Siempre producción: este link sale por mail. */
export const GUIA_PDF_URL = 'https://www.diegodreamtravel.com/guia-primer-viaje-orlando.pdf';

/** Ruta local del PDF, para la descarga directa desde la propia landing. */
export const GUIA_PDF_PATH = '/guia-primer-viaje-orlando.pdf';
