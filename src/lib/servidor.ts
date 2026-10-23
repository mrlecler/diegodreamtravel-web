/**
 * Utilidades chicas para las rutas /api de la landing (sólo servidor).
 */
import type { NextRequest } from 'next/server';

/** Dominios de producción. Mismo criterio fail-closed que `src/lib/sgi.ts`. */
export const PROD_HOSTS = ['www.diegodreamtravel.com', 'diegodreamtravel.com'];

/** Orígenes desde los que la landing se sirve de verdad. */
const ORIGENES_PROPIOS = [
  'https://www.diegodreamtravel.com',
  'https://diegodreamtravel.com',
  'https://dev.diegodreamtravel.com',
];

/** Host por el que entró el request, sin puerto y en minúsculas. */
export function hostDe(req: NextRequest): string {
  return (req.headers.get('host') || req.nextUrl.hostname || '').split(':')[0].toLowerCase();
}

/** ¿El request entró por el dominio de producción? */
export function esHostProd(req: NextRequest): boolean {
  return PROD_HOSTS.includes(hostDe(req));
}

/**
 * Si el navegador mandó Origin, tiene que ser la propia landing (o el
 * mismo host del request, que cubre localhost y previews). Sin Origin
 * (curl, server-to-server) pasa: eso lo frena el rate limit, no esto.
 * Esto corta que otro sitio use la ruta desde el navegador de sus
 * visitantes.
 */
export function origenPermitido(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  if (ORIGENES_PROPIOS.includes(origin)) return true;
  try {
    return new URL(origin).host.toLowerCase() === (req.headers.get('host') || '').toLowerCase();
  } catch {
    return false;
  }
}

/**
 * Normaliza un campo del body: sólo strings o números, recortado y con
 * largo máximo. Cualquier otra cosa (objeto, array, null) queda ''.
 */
export function texto(valor: unknown, max: number): string {
  if (typeof valor !== 'string' && typeof valor !== 'number') return '';
  return String(valor).trim().slice(0, max);
}

/** Mismo criterio que el SGI (`isValidWhatsapp`): 8 a 15 dígitos. */
export function whatsappValido(valor: string): boolean {
  const digitos = valor.replace(/\D/g, '');
  return digitos.length >= 8 && digitos.length <= 15;
}

/** Escapa texto para meterlo en HTML de un mail. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const DIEZ_MINUTOS = 10 * 60 * 1000;
