import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { permitir, ipCliente } from '@/lib/rate-limit';
import { texto, whatsappValido, DIEZ_MINUTOS } from '@/lib/servidor';

/**
 * Alta de lead desde el formulario de contacto del sitio institucional.
 *
 * Antes esta ruta insertaba DIRECTO en la tabla `leads` con la service
 * role key. Eso creaba un segundo camino de escritura, paralelo al del
 * CRM (`/api/leads` en app.diegodreamtravel.com), y ese segundo camino
 * no tenía nada de lo que el primero sí tiene:
 *
 *   - dedupe por whatsapp normalizado (el mismo interesado que consulta
 *     dos veces creaba dos filas, y encima con el whatsapp escrito de
 *     dos formas distintas, así que el dedupe del CRM tampoco las
 *     juntaba después)
 *   - alta automática de un seguimiento "lead nuevo"
 *   - rate limit
 *   - registro de que alguien volvió a consultar
 *
 * Ahora hay un solo camino: esta ruta reenvía al CRM. El mail directo
 * queda como red de contención para el caso de que el CRM no conteste,
 * porque perder un lead es peor que tenerlo sólo en el mail.
 */

/**
 * A qué SGI le pega, con el mismo criterio fail-closed que `src/lib/sgi.ts`:
 * sólo el dominio de producción escribe en la base de producción.
 *
 * `getSgiUrl()` de ese archivo no sirve acá porque mira
 * `window.location.hostname` y esta ruta corre en el servidor. Pero el
 * servidor sí sabe por qué host entró el request, así que se decide con
 * eso — que además es más confiable que el navegador.
 *
 * Importa de verdad: los tres dominios (www, el apex y dev) sirven el
 * MISMO deployment, así que entrar por dev.diegodreamtravel.com es la
 * única forma de probar el formulario sin ensuciar la base real. Antes
 * de esto, esta ruta insertaba directo con la service role del proyecto
 * y una prueba desde dev creaba un lead de verdad.
 */
const PROD_HOSTS = ['www.diegodreamtravel.com', 'diegodreamtravel.com'];
const CRM_PROD   = 'https://app.diegodreamtravel.com';
const CRM_DEV    = 'https://dev.app.diegodreamtravel.com';

function crmUrl(req: NextRequest): string {
  const override = process.env.CRM_BASE_URL;
  if (override) return override.replace(/\/$/, '');

  // El host real detrás de Vercel. `req.nextUrl.hostname` ya lo resuelve,
  // pero se chequea también la cabecera por si algún proxy la reescribe.
  const host = (req.headers.get('host') || req.nextUrl.hostname || '')
    .split(':')[0]
    .toLowerCase();

  return PROD_HOSTS.includes(host) ? CRM_PROD : CRM_DEV;
}

// Si el CRM tarda más que esto, se manda el mail y listo. El visitante
// no puede quedar mirando un spinner porque el CRM esté frío.
const TIMEOUT_MS = 8000;

// Freno para la red de contención: cuando el CRM está caído, cada request
// terminaría en un mail a info@. Con esto un loop no lo inunda (por IP) y
// tampoco uno distribuido (tope total). Si se pasa, el visitante ve el
// error de siempre, que lo manda a WhatsApp.
const MAIL_MAX_POR_IP = 3;
const MAIL_MAX_TOTAL = 30;

const MSG_WHATSAPP = 'Revisá el número de WhatsApp: tiene que tener entre 8 y 15 números, con característica.';

async function avisarPorMail(datos: Record<string, string | null>, esProd: boolean) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return false;

  const resend = new Resend(resendKey);
  const emailBody = `Nuevo lead web — ${datos.nombre_apellido}

Nombre: ${datos.nombre_apellido}
WhatsApp: ${datos.whatsapp}
Email: ${datos.email || '—'}
Qué viaje se imagina: ${datos.viaje || '—'}
Cuándo viajaría: ${datos.fecha_tentativa || '—'}

(El CRM no respondió, así que este lead NO quedó cargado — hay que
cargarlo a mano en app.diegodreamtravel.com/app/leads/)`;

  const { error } = await resend.emails.send({
    from: 'web@diegodreamtravel.com',
    to: 'info@diegodreamtravel.com',
    replyTo: 'info@diegodreamtravel.com',
    subject: (esProd ? '' : '[PRUEBA] ') +
      `Nuevo lead web (sin cargar) — ${datos.nombre_apellido}`,
    text: emailBody,
  });
  if (error) {
    console.error('Resend email error:', error);
    return false;
  }
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const b = body && typeof body === 'object' ? body : {};

    // Todo pasa por texto(): sólo strings/números, recortados y con largo
    // máximo (antes un body de 4 MB entraba entero al mail y al subject).
    const datos = {
      nombre_apellido: texto(b.nombre_apellido, 120),
      whatsapp: texto(b.whatsapp, 30),
      email: texto(b.email, 200) || null,
      viaje: texto(b.viaje, 500) || null,
      fecha_tentativa: texto(b.fecha_tentativa, 100) || null,
      origen: 'web',
    };

    if (!datos.nombre_apellido || !datos.whatsapp) {
      return NextResponse.json(
        { error: 'Nombre y WhatsApp son requeridos.' },
        { status: 400 }
      );
    }

    // Mismo criterio que el SGI. Si no, el CRM lo rechaza con 400 y el
    // visitante nunca se entera de que tiene que corregir el número.
    if (!whatsappValido(datos.whatsapp)) {
      return NextResponse.json({ error: MSG_WHATSAPP }, { status: 400 });
    }

    const esProd = crmUrl(req) === CRM_PROD;

    // 1) El CRM es el único que escribe en `leads`.
    try {
      const res = await fetch(`${crmUrl(req)}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (res.ok) {
        // El CRM ya guardó el lead, mandó el mail de aviso y creó el
        // seguimiento. No hay nada más que hacer acá.
        return NextResponse.json({ ok: true });
      }

      // 429 = rate limit del CRM. Al visitante se le dice lo que pasa,
      // y NO se manda mail: es la ráfaga que se quiso frenar.
      if (res.status === 429) {
        return NextResponse.json(
          { error: 'Demasiadas solicitudes. Probá de nuevo en unos minutos.' },
          { status: 429 }
        );
      }

      const detalle = await res.text().catch(() => '');
      console.error('[lead] el CRM respondió', res.status, detalle);

      // 400/422 = el CRM contestó y rechazó los DATOS. No es una caída:
      // no se manda el mail de contención (que diría "el CRM no respondió")
      // y se le pide al visitante que corrija.
      if (res.status === 400 || res.status === 422) {
        return NextResponse.json(
          {
            error: /whatsapp/i.test(detalle)
              ? MSG_WHATSAPP
              : 'Revisá los datos del formulario y probá de nuevo.',
          },
          { status: 400 }
        );
      }
    } catch (e) {
      console.error('[lead] no se pudo llegar al CRM:', e);
    }

    // 2) Red de contención: el CRM no contestó (5xx, timeout, red), pero el
    //    lead no se pierde. Con freno, para que una caída del CRM no se
    //    convierta en un mail por request.
    const ip = ipCliente(req.headers);
    const mailPermitido =
      (await permitir(ip && `web-lead-mail:${ip}`, MAIL_MAX_POR_IP, DIEZ_MINUTOS)) &&
      (await permitir('web-lead-mail:total', MAIL_MAX_TOTAL, DIEZ_MINUTOS));

    if (!mailPermitido) {
      console.error('[lead] red de contención limitada: no se manda el mail');
    } else if (await avisarPorMail(datos, esProd)) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: 'No pudimos procesar tu solicitud. Escribinos por WhatsApp.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Unexpected error in /api/lead:', err);
    return NextResponse.json(
      { error: 'Error inesperado. Intentá de nuevo.' },
      { status: 500 }
    );
  }
}
