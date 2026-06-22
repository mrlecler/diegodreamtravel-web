'use client';

import { useState } from 'react';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';

const WA_URL = `https://wa.me/5493624703040?text=${encodeURIComponent('Hola Diego! Completé el formulario Dream 15 y me gustaría saber más.')}`;

type FormData = {
  tipo: 'quinceanero' | 'familia' | '';
  nombre_apellido: string;
  whatsapp: string;
  edad: string;
  ciudad: string;
  fecha_tentativa: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

export default function D15Form() {
  const [form, setForm] = useState<FormData>({
    tipo: 'quinceanero',
    nombre_apellido: '',
    whatsapp: '',
    edad: '',
    ciudad: '',
    fecha_tentativa: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre_apellido.trim() || !form.whatsapp.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead-dream15', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error inesperado.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar. Intentá de nuevo.');
    }
  }

  const inputCls =
    'w-full rounded-xl px-4 py-3 text-sm text-[#F0EDE8] transition-all focus:outline-none';
  const inputStyle = {
    background: 'rgba(240,237,232,.05)',
    border: '1px solid rgba(240,237,232,.12)',
  };

  const labelCls = 'block text-[12px] font-medium mb-1.5' as const;

  // Success state
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          style={{ background: 'var(--grad-d15)' }}
        >
          ✓
        </div>
        <div>
          <p
            className="text-[#F0EDE8] mb-2"
            style={{
              fontFamily: 'var(--font-skatyn), serif',
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            ¡Listo! Ya casi.
          </p>
          <p className="text-[rgba(240,237,232,.65)] text-[14px] font-light leading-relaxed">
            Recibí tus datos. Para terminar más rápido, escribime por WhatsApp y arrancamos a
            planear el viaje ahora mismo.
          </p>
        </div>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white text-[13.5px] no-underline glow-wa"
          style={{ background: '#25D366' }}
        >
          {WA_ICON}
          Seguir por WhatsApp
        </a>
        <button
          onClick={() => setStatus('idle')}
          className="text-[13px] text-[rgba(240,237,232,.45)] cursor-pointer underline"
        >
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Quién completa */}
      <fieldset>
        <legend className={`${labelCls} text-[rgba(240,237,232,.65)]`}>¿Quién completa?</legend>
        <div
          className="relative flex rounded-xl p-1"
          style={{ background: 'rgba(240,237,232,.06)', border: '1px solid rgba(240,237,232,.1)' }}
        >
          {/* Thumb animado */}
          <div
            className="absolute top-1 bottom-1 rounded-lg transition-all duration-200"
            style={{
              width: 'calc(50% - 2px)',
              left: form.tipo === 'familia' ? 'calc(50% + 2px)' : '4px',
              background: form.tipo === '' ? 'transparent' : 'rgba(232,67,147,.25)',
              border: form.tipo === '' ? 'none' : '1px solid rgba(232,67,147,.4)',
            }}
          />
          {[
            { value: 'quinceanero', label: 'Soy quien cumple 15' },
            { value: 'familia', label: 'Soy mamá o papá' },
          ].map((opt) => (
            <label
              key={opt.value}
              className="relative z-[1] flex-1 flex items-center justify-center text-center leading-tight py-2.5 text-[13px] cursor-pointer rounded-lg transition-colors"
              style={{
                color:
                  form.tipo === opt.value ? '#FFFFFF' : 'rgba(240,237,232,.55)',
                fontWeight: form.tipo === opt.value ? 600 : 400,
              }}
            >
              <input
                type="radio"
                name="tipo"
                value={opt.value}
                checked={form.tipo === opt.value}
                onChange={handleChange}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Nombre */}
      <div>
        <label htmlFor="nombre_apellido" className={`${labelCls} text-[rgba(240,237,232,.65)]`}>
          Nombre y apellido <span style={{ color: '#E84393' }}>*</span>
        </label>
        <input
          id="nombre_apellido"
          name="nombre_apellido"
          type="text"
          required
          autoComplete="name"
          placeholder="Ejemplo: María González"
          value={form.nombre_apellido}
          onChange={handleChange}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className={`${labelCls} text-[rgba(240,237,232,.65)]`}>
          WhatsApp <span style={{ color: '#E84393' }}>*</span>
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+54 9 362 470-3040"
          value={form.whatsapp}
          onChange={handleChange}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* Edad + Ciudad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="edad" className={`${labelCls} text-[rgba(240,237,232,.65)]`}>
            Edad de quien cumple 15
          </label>
          <input
            id="edad"
            name="edad"
            type="text"
            placeholder="Ej: 14"
            value={form.edad}
            onChange={handleChange}
            className={inputCls}
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="ciudad" className={`${labelCls} text-[rgba(240,237,232,.65)]`}>
            Ciudad
          </label>
          <input
            id="ciudad"
            name="ciudad"
            type="text"
            placeholder="Ej: Corrientes"
            value={form.ciudad}
            onChange={handleChange}
            className={inputCls}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Fecha tentativa — select */}
      <div>
        <label htmlFor="fecha_tentativa" className={`${labelCls} text-[rgba(240,237,232,.65)]`}>
          Fecha tentativa
        </label>
        <select
          id="fecha_tentativa"
          name="fecha_tentativa"
          value={form.fecha_tentativa}
          onChange={handleChange}
          className={inputCls}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
        >
          <option value="">Cuándo viajarían</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="no se">Todavía no sé</option>
        </select>
      </div>

      {/* Error */}
      {status === 'error' && (
        <p role="alert" className="text-sm text-center" style={{ color: '#E84393' }}>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || !form.nombre_apellido.trim() || !form.whatsapp.trim()}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-white text-[14px] transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: 'var(--grad-d15)',
          boxShadow: '0 12px 30px -10px rgba(196,62,138,.65)',
        }}
      >
        {status === 'loading' ? (
          <>
            <CircleNotch size={16} weight="bold" className="animate-spin" />
            Enviando...
          </>
        ) : (
          'Quiero más info'
        )}
      </button>
      <p className="text-center text-[12px] text-[rgba(240,237,232,.35)]">
        Te respondo personalmente. Diego.
      </p>
    </form>
  );
}
