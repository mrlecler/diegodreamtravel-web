import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { permitir, reservarIntento, ipCliente } from '@/lib/rate-limit';
import { esHostProd, origenPermitido, texto, whatsappValido, DIEZ_MINUTOS } from '@/lib/servidor';

// Mismo cupo que POST /api/leads del SGI: 5 cada 10 minutos por IP.
const MAX_POR_IP = 5;
// Tope total del MAIL a info@ (como la red de contención de /api/lead):
// rotar IPs no puede convertirse en una inundación de la casilla. No
// frena el alta: si no, cualquiera con 6 IPs llena el cupo y los leads
// reales de esos 10 minutos se pierden con un 429. La fila la acota el
// límite por visitante.
const MAX_TOTAL = 30;
const TIPOS = ['quinceanero', 'familia'];

export async function POST(req: NextRequest) {
  try {
    // Que otro sitio no pueda usar el navegador (y la IP) de sus visitantes
    // para cargar leads: req.json() parsea aunque venga como text/plain sin
    // preflight.
    if (!origenPermitido(req)) {
      return NextResponse.json({ error: 'Origen no permitido.' }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Nombre y WhatsApp son requeridos.' }, { status: 400 });
    }

    const nombre_apellido = texto(body.nombre_apellido, 120);
    const whatsapp        = texto(body.whatsapp, 30);
    const edad            = texto(body.edad, 10);
    const ciudad          = texto(body.ciudad, 80);
    const fecha_tentativa = texto(body.fecha_tentativa, 60);
    const tipo            = TIPOS.includes(body.tipo) ? (body.tipo as string) : null;

    if (!nombre_apellido || !whatsapp) {
      return NextResponse.json({ error: 'Nombre y WhatsApp son requeridos.' }, { status: 400 });
    }
    if (!whatsappValido(whatsapp)) {
      return NextResponse.json(
        { error: 'Revisá el WhatsApp: tiene que tener entre 8 y 15 números, con característica.' },
        { status: 400 }
      );
    }

    const ip = ipCliente(req.headers);
    const demasiadas = () => NextResponse.json(
      { error: 'Demasiadas solicitudes. Probá de nuevo en unos minutos.' },
      { status: 429 }
    );
    if (!(await permitir(ip && `web-dream15:${ip}`, MAX_POR_IP, DIEZ_MINUTOS))) {
      return demasiadas();
    }
    // Sólo decide si sale el mail; la fila se guarda igual (ver MAX_TOTAL).
    const mailPermitido = await permitir('web-dream15:total', MAX_TOTAL, DIEZ_MINUTOS);

    // Mismo criterio fail-closed que /api/lead: www, el apex y dev sirven
    // el MISMO deployment, así que sólo el dominio de producción escribe
    // en la tabla real. Una prueba desde dev (o localhost, o un preview)
    // no inserta y el mail sale marcado como [PRUEBA].
    const esProd = esHostProd(req);

    let leadGuardado = false;
    let emailEnviado = false;

    // 1) Guardar en Supabase (best-effort — NO bloquea el email)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!esProd) {
        console.log('[lead-dream15] no es producción: no se guarda en leads_dream15');
      } else if (url && key) {
        const supabase = createClient(url, key);
        const { error: dbError } = await supabase.from('leads_dream15').insert([
          { tipo, nombre_apellido, whatsapp, edad, ciudad, fecha_tentativa },
        ]);
        if (dbError) console.error('Supabase insert error:', dbError);
        else leadGuardado = true;
      }
    } catch (e) {
      console.error('Supabase exception:', e);
    }

    // 2) Enviar el email (PRIORIDAD)
    try {
      const resendKey = process.env.RESEND_API_KEY;
      if (!mailPermitido) {
        console.warn('[lead-dream15] tope total de mails alcanzado: el lead queda sólo en leads_dream15');
        // leads_dream15 no la lee ninguna pantalla del SGI: sin este aviso
        // Diego no se entera de que hay leads que no le llegaron por mail.
        // Uno solo por ventana, así la casilla no se inunda.
        // Si el aviso falla se devuelve el cupo y lo intenta el próximo lead.
        const aviso = leadGuardado && resendKey
          ? await reservarIntento('web-dream15:aviso-tope', 1, DIEZ_MINUTOS)
          : null;
        if (aviso?.pasa && resendKey) {
          const { error: avisoError } = await new Resend(resendKey).emails.send({
            from: 'web@diegodreamtravel.com',
            to: 'info@diegodreamtravel.com',
            subject: 'Dream 15: se llenó el tope de mails, revisá leads_dream15',
            text: `Se llenó el tope de mails de leads de Dream 15 (${MAX_TOTAL} cada 10 minutos).

Los leads que entren mientras dure el tope se guardan en la tabla leads_dream15 de Supabase pero NO te llegan por mail. Revisalos ahí (ordenados por fecha): puede haber leads reales mezclados con basura de alguien que esté abusando del formulario.

Este aviso sale como mucho una vez cada 10 minutos.`,
          }).catch(async (err: unknown) => {
            await aviso.liberar();
            throw err;
          });
          if (avisoError) {
            await aviso.liberar();
            console.error('Resend aviso-tope error:', avisoError);
          }
        }
      } else if (resendKey) {
        const resend = new Resend(resendKey);
        const tipoLabel =
          tipo === 'quinceanero' ? 'La quinceañera'
          : tipo === 'familia' ? 'Familiar / organizador'
          : 'Sin especificar';
        const emailBody = `Nuevo lead Dream 15 — ${nombre_apellido}

Tipo: ${tipoLabel}
Nombre: ${nombre_apellido}
WhatsApp: ${whatsapp}
Edad: ${edad || '—'}
Ciudad: ${ciudad || '—'}
Fecha tentativa: ${fecha_tentativa || '—'}`;

        const { error: emailError } = await resend.emails.send({
          from: 'web@diegodreamtravel.com',
          to: 'info@diegodreamtravel.com',
          replyTo: 'info@diegodreamtravel.com',
          subject: (esProd ? '' : '[PRUEBA] ') + `Nuevo lead Dream 15 — ${nombre_apellido}`,
          text: emailBody,
        });
        if (emailError) console.error('Resend email error:', emailError);
        else emailEnviado = true;
      }
    } catch (e) {
      console.error('Resend exception:', e);
    }

    // 3) Éxito si AL MENOS una vía funcionó — el lead no se pierde
    if (emailEnviado || leadGuardado) {
      return NextResponse.json({ ok: true });
    }
    // Sin mail por el tope y sin fila (fuera de producción o la base
    // falló): que la persona reintente, como antes.
    if (!mailPermitido) return demasiadas();
    return NextResponse.json(
      { error: 'No pudimos procesar tu solicitud. Escribinos por WhatsApp.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Unexpected error in /api/lead-dream15:', err);
    return NextResponse.json({ error: 'Error inesperado. Intentá de nuevo.' }, { status: 500 });
  }
}
