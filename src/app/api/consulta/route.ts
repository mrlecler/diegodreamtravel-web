import { NextRequest, NextResponse } from 'next/server';
import { isIP } from 'node:net';
import { Resend } from 'resend';
import { permitir, ipCliente } from '@/lib/rate-limit';
import { emailValido } from '@/lib/email';
import { esHostProd, origenPermitido, texto, whatsappValido, escapeHtml, DIEZ_MINUTOS } from '@/lib/servidor';

/**
 * Consultas de la web (formulario de contacto y guía de Orlando).
 *
 * Antes el navegador le pegaba a POST /api/leads del SGI v1. Ahora le pega
 * a esta ruta, que (servidor a servidor):
 *   1) valida y limita por visitante (rate limit persistente, intentos_publicos);
 *   2) avisa a info@diegodreamtravel.com por Resend;
 *   3) crea la solicitud en el Hub (HUB_SOLICITUDES_URL + HUB_WEB_SECRETO,
 *      header x-dct-web-secreto, x-dct-ip con la IP real del visitante).
 *
 * Si faltan HUB_SOLICITUDES_URL o HUB_WEB_SECRETO, queda solo el mail a info@.
 * Fuera del dominio de producción no se escribe en el Hub (mismo criterio
 * fail-closed que src/lib/sgi.ts): se manda el mail marcado [PRUEBA].
 * Si no sale ni el mail ni el alta, responde 502 y el formulario cae a
 * /api/lead (la red de contención). Nunca se loguean datos personales.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 8_000;
const MAX_POR_IP = 5;
const MAIL_MAX_TOTAL = 40;

type CodigoError = 'datos' | 'whatsapp' | 'rate_limit' | 'caida' | 'origen';
const responder = (code: CodigoError, error: string, status: number) =>
  NextResponse.json({ error, code }, { status, headers: { 'Cache-Control': 'no-store' } });

/** IP real del visitante tal cual la ve Vercel (v4 o v6 entera), para x-dct-ip. */
function ipCruda(headers: Headers): string | null {
  const primero = (headers.get('x-forwarded-for') || headers.get('x-real-ip') || '').split(',')[0].trim();
  return isIP(primero) ? primero : null;
}

type Datos = {
  nombre: string;
  whatsapp: string;
  mail: string;
  viaje: string;
  fecha_tentativa: string;
  origen: string;
};

async function avisarPorMail(d: Datos, esProd: boolean): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const filas: [string, string][] = [
    ['Nombre', d.nombre],
    ['WhatsApp', d.whatsapp],
    ['Email', d.mail || '—'],
    ['Qué viaje se imagina', d.viaje || '—'],
    ['Cuándo viajaría', d.fecha_tentativa || '—'],
    ['Vino de', d.origen],
  ];
  const cuerpo = `Nueva consulta web — ${d.nombre}\n\n` + filas.map(([k, v]) => `${k}: ${v}`).join('\n') +
    '\n\nLa consulta queda como solicitud en el Hub (Inicio › Solicitudes).';
  const html = `<p><strong>Nueva consulta web</strong></p><table cellpadding="4">` +
    filas.map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('') +
    `</table><p>La consulta queda como solicitud en el Hub (Inicio › Solicitudes).</p>`;
  try {
    const { error } = await new Resend(key).emails.send({
      from: 'web@diegodreamtravel.com',
      to: 'info@diegodreamtravel.com',
      replyTo: d.mail || 'info@diegodreamtravel.com',
      subject: (esProd ? '' : '[PRUEBA] ') + `Nueva consulta web — ${d.nombre}`,
      text: cuerpo,
      html,
    });
    if (error) {
      console.error('[consulta] Resend error:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('[consulta] Falló el mail:', e instanceof Error ? e.name : 'error');
    return false;
  }
}

async function altaEnHub(d: Datos, ip: string | null): Promise<boolean> {
  const url = process.env.HUB_SOLICITUDES_URL;
  const secreto = process.env.HUB_WEB_SECRETO;
  if (!url || !secreto) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-dct-web-secreto': secreto, ...(ip ? { 'x-dct-ip': ip } : {}) },
      body: JSON.stringify({
        fuente: 'web_ddt',
        nombre: d.nombre,
        whatsapp: d.whatsapp,
        mail: d.mail || undefined,
        viaje: d.viaje || undefined,
        fecha_tentativa: d.fecha_tentativa || undefined,
        origen: d.origen,
      }),
      signal: AbortSignal.timeout(6_000),
      cache: 'no-store',
    });
    if (!res.ok) console.error(`[consulta] El Hub no tomó la solicitud: respondió ${res.status}`);
    return res.ok;
  } catch (e) {
    console.error(`[consulta] No se pudo llegar al Hub: ${e instanceof Error ? e.name : 'error'}`);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!origenPermitido(req)) return responder('origen', 'Origen no permitido.', 403);
    if (!(req.headers.get('content-type') || '').includes('application/json')) {
      return responder('datos', 'La consulta tiene que llegar como JSON.', 415);
    }
    const crudo = await req.text();
    if (crudo.length > MAX_BYTES) return responder('datos', 'La consulta es demasiado larga.', 413);
    let b: Record<string, unknown> = {};
    try {
      const j = JSON.parse(crudo);
      if (j && typeof j === 'object' && !Array.isArray(j)) b = j;
    } catch {
      /* queda vacío: falla abajo por datos */
    }

    // Honeypot por si algún formulario lo suma: lleno = robot, se responde OK sin hacer nada.
    if (typeof b.sitio_web === 'string' && b.sitio_web.trim() !== '') return NextResponse.json({ ok: true });

    const email = texto(b.email ?? b.mail, 200);
    const d: Datos = {
      nombre: texto(b.nombre_apellido ?? b.nombre, 120),
      whatsapp: texto(b.whatsapp, 30),
      mail: email && emailValido(email) ? email.toLowerCase() : '',
      viaje: texto(b.viaje, 500),
      fecha_tentativa: texto(b.fecha_tentativa, 100),
      origen: texto(b.origen, 60) || 'Contacto',
    };
    if (!d.nombre || !d.whatsapp) return responder('datos', 'Nombre y WhatsApp son requeridos.', 400);
    if (!whatsappValido(d.whatsapp)) {
      return responder('whatsapp', 'Revisá el número de WhatsApp: tiene que tener entre 8 y 15 números, con característica.', 400);
    }

    const ip = ipCliente(req.headers);
    if (!(await permitir(ip && `web-consulta:${ip}`, MAX_POR_IP, DIEZ_MINUTOS))) {
      return responder('rate_limit', 'Demasiadas solicitudes. Probá de nuevo en unos minutos.', 429);
    }
    // Tope total de avisos: una ráfaga distribuida no inunda info@.
    if (!(await permitir('web-consulta:total', MAIL_MAX_TOTAL, DIEZ_MINUTOS))) {
      return responder('rate_limit', 'Demasiadas solicitudes. Probá de nuevo en unos minutos.', 429);
    }

    const esProd = esHostProd(req);
    const [mailOk, hubOk] = await Promise.all([
      avisarPorMail(d, esProd),
      esProd ? altaEnHub(d, ipCruda(req.headers)) : Promise.resolve(false),
    ]);
    if (mailOk || hubOk) return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
    return responder('caida', 'No pudimos procesar tu solicitud. Escribinos por WhatsApp.', 502);
  } catch (err) {
    console.error('Unexpected error in /api/consulta:', err instanceof Error ? err.message : 'error');
    return responder('caida', 'Error inesperado. Intentá de nuevo.', 500);
  }
}
