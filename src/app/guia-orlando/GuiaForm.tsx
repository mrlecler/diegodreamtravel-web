'use client';

import { useState } from 'react';
import { CircleNotch, DownloadSimple, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { getSgiUrl, GUIA_PDF_PATH } from '@/lib/sgi';

const WA_URL = `https://wa.me/5493624703040?text=${encodeURIComponent(
  'Hola Diego! Bajé la guía de Orlando y me gustaría empezar a planear el viaje.'
)}`;

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function GuiaForm() {
  const [nombre, setNombre] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [mailEnviado, setMailEnviado] = useState(false);

  const listo = nombre.trim().length > 1 && whatsapp.replace(/\D/g, '').length >= 8;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!listo) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${getSgiUrl()}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_apellido: nombre.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim() || null,
          origen: 'guia-orlando',
        }),
      });

      if (!res.ok) {
        // Nada de fallos silenciosos: el error se ve y queda en consola.
        let detalle = `HTTP ${res.status}`;
        try {
          const data = await res.json();
          if (data?.error) detalle = data.error;
        } catch {
          /* respuesta sin JSON */
        }
        console.error('[guia-orlando] El SGI rechazó el lead:', detalle);
        throw new Error(
          res.status === 429
            ? 'Probaste varias veces seguidas. Esperá unos minutos y volvé a intentar.'
            : 'No pudimos guardar tus datos. Podés bajar la guía igual, o escribirme por WhatsApp.'
        );
      }

      // El mail es secundario: si falla, la descarga directa ya cumple.
      if (email.trim()) {
        try {
          const mailRes = await fetch('/api/guia-mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), nombre_apellido: nombre.trim() }),
          });
          const mailData = await mailRes.json();
          setMailEnviado(Boolean(mailData?.enviado));
        } catch (err) {
          console.error('[guia-orlando] No se pudo enviar el mail:', err);
        }
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Algo falló. Probá de nuevo.');
    }
  }

  const inputCls =
    'w-full rounded-xl px-4 py-3 text-sm text-[#F0EDE8] transition-all focus:outline-none focus:border-[rgba(255,91,0,.5)]';
  const inputStyle = {
    background: 'rgba(240,237,232,.05)',
    border: '1px solid rgba(240,237,232,.12)',
  } as const;
  const labelCls = 'block text-[12px] font-medium mb-1.5 text-[rgba(240,237,232,.65)]';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 py-6 text-center">
        <CheckCircle size={52} weight="duotone" color="#42C2C2" />
        <div>
          <p className="font-display text-[#F0EDE8] mb-2" style={{ fontSize: 30, lineHeight: 1.1 }}>
            Listo, es tuya
          </p>
          <p className="text-[rgba(240,237,232,.65)] text-[14px] font-light leading-relaxed max-w-sm">
            {mailEnviado
              ? 'También te la mandé por mail, así la tenés a mano cuando empieces a definir fechas.'
              : 'Bajala ahora y guardala: la vas a querer releer cuando empieces a definir fechas.'}
          </p>
        </div>

        <a
          href={GUIA_PDF_PATH}
          download
          className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold text-white text-[14px] no-underline transition-all hover:opacity-90"
          style={{ background: 'var(--grad-ddt)', boxShadow: '0 12px 30px -10px rgba(255,91,0,.5)' }}
        >
          <DownloadSimple size={18} weight="bold" />
          Descargar la guía
        </a>

        <div className="pt-2">
          <p className="text-[13px] text-[rgba(240,237,232,.5)] mb-3 max-w-xs">
            ¿Ya tenés fechas en la cabeza? Contame y te digo si conviene esa época.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white text-[13.5px] no-underline glow-wa"
            style={{ background: '#25D366' }}
          >
            {WA_ICON}
            Escribime por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="nombre_apellido" className={labelCls}>
          Nombre y apellido <span style={{ color: '#FF5B00' }}>*</span>
        </label>
        <input
          id="nombre_apellido"
          name="nombre_apellido"
          type="text"
          required
          autoComplete="name"
          placeholder="Como te llamás"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelCls}>
          WhatsApp <span style={{ color: '#FF5B00' }}>*</span>
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="Con característica, sin 0 ni 15"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Email <span className="text-[rgba(240,237,232,.4)]">(opcional)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Para tener la guía guardada en tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {status === 'error' && (
        <div role="alert" className="text-center">
          <p className="text-sm mb-2" style={{ color: '#FF5B00' }}>
            {errorMsg}
          </p>
          <a
            href={GUIA_PDF_PATH}
            download
            className="text-[13px] underline text-[rgba(240,237,232,.6)]"
          >
            Bajar la guía igual
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !listo}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-white text-[14px] transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: 'var(--grad-ddt)', boxShadow: '0 12px 30px -10px rgba(255,91,0,.5)' }}
      >
        {status === 'loading' ? (
          <>
            <CircleNotch size={16} weight="bold" className="animate-spin" />
            Un segundo...
          </>
        ) : (
          'Quiero la guía'
        )}
      </button>

      <p className="text-center text-[12px] text-[rgba(240,237,232,.35)]">
        Te escribo yo, no un robot. Sin spam.
      </p>
    </form>
  );
}
