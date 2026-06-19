import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Instanciar dentro del handler para que no falle en build sin env vars
function getClients() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Faltan variables de entorno de Supabase.');
  }

  return {
    supabase: createClient(supabaseUrl, supabaseKey),
    resend: resendKey ? new Resend(resendKey) : null,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tipo, nombre_apellido, whatsapp, edad, ciudad, fecha_tentativa } = body;

    if (!nombre_apellido?.trim() || !whatsapp?.trim()) {
      return NextResponse.json(
        { error: 'Nombre y WhatsApp son requeridos.' },
        { status: 400 }
      );
    }

    const { supabase, resend } = getClients();

    const { error: dbError } = await supabase.from('leads_dream15').insert([
      { tipo, nombre_apellido, whatsapp, edad, ciudad, fecha_tentativa },
    ]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Error al guardar el lead.' }, { status: 500 });
    }

    if (resend) {
      const tipoLabel =
        tipo === 'quinceanero' ? 'La quinceañera' : 'Familiar / organizador';
      const emailBody = `
Nuevo lead Dream 15 — ${nombre_apellido}

Tipo: ${tipoLabel}
Nombre: ${nombre_apellido}
WhatsApp: ${whatsapp}
Edad: ${edad || '—'}
Ciudad: ${ciudad || '—'}
Fecha tentativa: ${fecha_tentativa || '—'}
      `.trim();

      const { error: emailError } = await resend.emails.send({
        from: 'web@diegodreamtravel.com',
        to: 'info@diegodreamtravel.com',
        replyTo: 'info@diegodreamtravel.com',
        subject: `Nuevo lead Dream 15 — ${nombre_apellido}`,
        text: emailBody,
      });

      if (emailError) {
        // Lead ya guardado — el email es secundario
        console.error('Resend email error:', emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Unexpected error in /api/lead-dream15:', err);
    return NextResponse.json(
      { error: 'Error inesperado. Intentá de nuevo.' },
      { status: 500 }
    );
  }
}
