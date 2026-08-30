import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

const CRM_URL =
  process.env.CRM_BASE_URL || 'https://app.diegodreamtravel.com';

// Si el CRM tarda más que esto, se manda el mail y listo. El visitante
// no puede quedar mirando un spinner porque el CRM esté frío.
const TIMEOUT_MS = 8000;

async function avisarPorMail(datos: Record<string, string | null>) {
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
    subject: `Nuevo lead web (sin cargar) — ${datos.nombre_apellido}`,
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
    const body = await req.json();
    const { nombre_apellido, whatsapp, email, viaje, fecha_tentativa } = body;

    if (!nombre_apellido?.trim() || !whatsapp?.trim()) {
      return NextResponse.json(
        { error: 'Nombre y WhatsApp son requeridos.' },
        { status: 400 }
      );
    }

    const datos = {
      nombre_apellido: String(nombre_apellido).trim(),
      whatsapp: String(whatsapp).trim(),
      email: email?.trim() || null,
      viaje: viaje?.trim() || null,
      fecha_tentativa: fecha_tentativa?.trim() || null,
      origen: 'web',
    };

    // 1) El CRM es el único que escribe en `leads`.
    try {
      const res = await fetch(`${CRM_URL}/api/leads`, {
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

      console.error('[lead] el CRM respondió', res.status, await res.text().catch(() => ''));
    } catch (e) {
      console.error('[lead] no se pudo llegar al CRM:', e);
    }

    // 2) Red de contención: el CRM no contestó, pero el lead no se pierde.
    if (await avisarPorMail(datos)) {
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
