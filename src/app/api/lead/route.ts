import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre_apellido, whatsapp, email, viaje, fecha_tentativa } = body;

    if (!nombre_apellido?.trim() || !whatsapp?.trim()) {
      return NextResponse.json({ error: 'Nombre y WhatsApp son requeridos.' }, { status: 400 });
    }

    let leadGuardado = false;
    let emailEnviado = false;

    // 1) Guardar en Supabase (best-effort — NO bloquea el email)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (url && key) {
        const supabase = createClient(url, key);
        const { error: dbError } = await supabase.from('leads').insert([
          {
            nombre_apellido,
            whatsapp,
            email: email || null,
            viaje: viaje || null,
            fecha_tentativa: fecha_tentativa || null,
          },
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
      if (resendKey) {
        const resend = new Resend(resendKey);
        const emailBody = `Nuevo lead web — ${nombre_apellido}

Nombre: ${nombre_apellido}
WhatsApp: ${whatsapp}
Email: ${email || '—'}
Qué viaje se imagina: ${viaje || '—'}
Cuándo viajaría: ${fecha_tentativa || '—'}`;

        const { error: emailError } = await resend.emails.send({
          from: 'web@diegodreamtravel.com',
          to: 'info@diegodreamtravel.com',
          replyTo: 'info@diegodreamtravel.com',
          subject: `Nuevo lead web — ${nombre_apellido}`,
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
    return NextResponse.json(
      { error: 'No pudimos procesar tu solicitud. Escribinos por WhatsApp.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Unexpected error in /api/lead:', err);
    return NextResponse.json({ error: 'Error inesperado. Intentá de nuevo.' }, { status: 500 });
  }
}
