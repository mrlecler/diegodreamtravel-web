import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { GUIA_PDF_URL } from '@/lib/sgi';
import { permitir, ipCliente } from '@/lib/rate-limit';
import { origenPermitido, escapeHtml, texto, buzonNormalizado, DIEZ_MINUTOS } from '@/lib/servidor';
import { emailValido } from '@/lib/email';

// Un nombre de pila "normal": letras (con tildes), apóstrofo, punto o
// guion. Cualquier otra cosa no entra al mail: se saluda con "Hola,".
// Con RegExp() y no literal porque el target de TS es ES2017.
const NOMBRE_OK = new RegExp("^[\\p{L}\\p{M}'’.-]{1,40}$", 'u');

// Esta ruta manda un mail a la dirección que le pasen, desde el dominio
// de Diego. Sin freno es un relay: se limita por IP, por buzón (con los
// alias +tag y los puntos de Gmail juntos) y con un tope total, igual que
// la red de contención de /api/lead, para que rotar IPs no lo destape.
// Ventanas de 1 h o menos: el barrido de intentos_publicos borra lo más
// viejo (RETENCION_MS en src/lib/rate-limit.ts).
const MAX_POR_IP = 3;
const MAX_POR_EMAIL = 1;
const MAX_TOTAL = 30;

function saludoPara(nombreApellido: unknown): string {
  const primero = texto(nombreApellido, 200).split(/\s+/)[0] || '';
  return NOMBRE_OK.test(primero) ? `Hola ${escapeHtml(primero)},` : 'Hola,';
}

/**
 * Manda la guía por mail a quien dejó su dirección en /guia-orlando.
 *
 * Es best-effort y secundario: la descarga directa desde la pantalla de
 * gracias es el canal principal. Si esto falla, la persona ya tiene el PDF.
 * Por eso nunca devuelve un error que bloquee el flujo del formulario.
 *
 * Va el LINK, no el adjunto: son 2 MB y muchos servidores los rebotan.
 */
export async function POST(req: NextRequest) {
  try {
    if (!origenPermitido(req)) {
      return NextResponse.json({ ok: false, enviado: false }, { status: 403 });
    }

    const { email, nombre_apellido } = await req.json();

    // Sólo una dirección simple: con '<>', comillas o un nombre visible
    // la misma casilla se podría escribir de infinitas formas y el límite
    // por buzón dejaría de valer (src/lib/email.ts).
    const destino = texto(email, 254);
    if (!destino || !emailValido(destino)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const ip = ipCliente(req.headers);
    const okIp = await permitir(ip && `web-guia-mail:ip:${ip}`, MAX_POR_IP, DIEZ_MINUTOS);
    const okEmail = okIp &&
      await permitir(`web-guia-mail:to:${buzonNormalizado(destino)}`, MAX_POR_EMAIL, DIEZ_MINUTOS);
    // El total va último: sólo gasta cupo un intento que ya pasó los otros.
    const okTotal = okEmail &&
      await permitir('web-guia-mail:total', MAX_TOTAL, DIEZ_MINUTOS);
    if (!okIp || !okEmail || !okTotal) {
      return NextResponse.json({ ok: false, enviado: false }, { status: 429 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('[guia-mail] Falta RESEND_API_KEY: no se envió el mail');
      return NextResponse.json({ ok: false, enviado: false }, { status: 200 });
    }

    const saludo = saludoPara(nombre_apellido);

    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: 'Diego Dream Travel <web@diegodreamtravel.com>',
      to: destino,
      replyTo: 'info@diegodreamtravel.com',
      subject: 'Tu guía: Mi primer viaje a Orlando',
      html: `
<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px 12px;background:#F0EDE8;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#0C1521;color:#F0EDE8;border-radius:18px;overflow:hidden;">
    <div style="height:6px;background:linear-gradient(90deg,#F47B45 0%,#E63957 33%,#C44E92 66%,#42C2C2 100%);"></div>
    <div style="padding:32px 30px;">
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">${saludo}</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.6;">
        Acá tenés tu guía para planificar el primer viaje a Orlando. Guardala,
        que la vas a querer releer cuando empieces a definir fechas.
      </p>
      <a href="${GUIA_PDF_URL}"
         style="display:inline-block;margin:8px 0 22px;background:#FF5B00;color:#fff;padding:13px 26px;border-radius:999px;text-decoration:none;font-weight:700;font-size:14px;">
        Descargar la guía
      </a>
      <p style="margin:0 0 6px;font-size:15px;line-height:1.6;">
        Cualquier duda que te surja mientras la leés, escribime por WhatsApp y la charlamos.
      </p>
      <p style="margin:22px 0 0;font-size:15px;line-height:1.6;">
        Diego<br>
        <span style="color:rgba(240,237,232,.55);font-size:13px;">Diego Dream Travel · Authorized Disney Vacation Planner</span>
      </p>
    </div>
  </div>
</body></html>
      `,
    });

    if (error) {
      console.error('[guia-mail] Resend error:', error);
      return NextResponse.json({ ok: false, enviado: false }, { status: 200 });
    }

    return NextResponse.json({ ok: true, enviado: true });
  } catch (err) {
    console.error('[guia-mail] Error inesperado:', err);
    return NextResponse.json({ ok: false, enviado: false }, { status: 200 });
  }
}
