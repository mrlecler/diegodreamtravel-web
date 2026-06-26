'use client';

import { useState } from 'react';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { useLang } from '@/lib/language';

const WA_URL = `https://wa.me/5493624703040?text=${encodeURIComponent('Hola Diego! Dejé mis datos en la web y me gustaría empezar a planear mi viaje.')}`;

type FormData = {
  nombre_apellido: string;
  whatsapp: string;
  email: string;
  viaje: string;
  fecha_tentativa: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

export default function ContactForm() {
  const { t } = useLang();
  const c = t.contact;

  const [form, setForm] = useState<FormData>({
    nombre_apellido: '',
    whatsapp: '',
    email: '',
    viaje: '',
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
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || c.errorGeneric);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : c.errorGeneric);
    }
  }

  const inputCls =
    'w-full rounded-xl px-4 py-3 text-sm text-[#F0EDE8] transition-all focus:outline-none focus:border-[rgba(255,91,0,.5)]';
  const inputStyle = {
    background: 'rgba(240,237,232,.05)',
    border: '1px solid rgba(240,237,232,.12)',
  } as const;
  const labelCls = 'block text-[12px] font-medium mb-1.5 text-[rgba(240,237,232,.65)]' as const;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          style={{ background: 'var(--grad-ddt)' }}
        >
          ✓
        </div>
        <div>
          <p className="font-display text-[#F0EDE8] mb-2" style={{ fontSize: 26, lineHeight: 1.1 }}>
            {c.successTitle}
          </p>
          <p className="text-[rgba(240,237,232,.65)] text-[14px] font-light leading-relaxed max-w-sm">
            {c.successBody}
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
          {c.successCta}
        </a>
        <button
          onClick={() => setStatus('idle')}
          className="text-[13px] text-[rgba(240,237,232,.45)] cursor-pointer underline"
        >
          {c.successBack}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Nombre */}
      <div>
        <label htmlFor="nombre_apellido" className={labelCls}>
          {c.nameLabel} <span style={{ color: '#FF5B00' }}>*</span>
        </label>
        <input
          id="nombre_apellido"
          name="nombre_apellido"
          type="text"
          required
          autoComplete="name"
          placeholder={c.namePlaceholder}
          value={form.nombre_apellido}
          onChange={handleChange}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className={labelCls}>
          {c.whatsappLabel} <span style={{ color: '#FF5B00' }}>*</span>
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          autoComplete="tel"
          placeholder={c.whatsappPlaceholder}
          value={form.whatsapp}
          onChange={handleChange}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelCls}>
          {c.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={c.emailPlaceholder}
          value={form.email}
          onChange={handleChange}
          className={inputCls}
          style={inputStyle}
        />
      </div>

      {/* Viaje + Fecha */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="viaje" className={labelCls}>
            {c.viajeLabel}
          </label>
          <select
            id="viaje"
            name="viaje"
            value={form.viaje}
            onChange={handleChange}
            className={inputCls}
            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          >
            <option value="">{c.viajePlaceholder}</option>
            {c.viajeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fecha_tentativa" className={labelCls}>
            {c.fechaLabel}
          </label>
          <select
            id="fecha_tentativa"
            name="fecha_tentativa"
            value={form.fecha_tentativa}
            onChange={handleChange}
            className={inputCls}
            style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          >
            <option value="">{c.fechaPlaceholder}</option>
            {c.fechaOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-center" style={{ color: '#FF5B00' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !form.nombre_apellido.trim() || !form.whatsapp.trim()}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-bold text-white text-[14px] transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: 'var(--grad-ddt)',
          boxShadow: '0 12px 30px -10px rgba(255,91,0,.5)',
        }}
      >
        {status === 'loading' ? (
          <>
            <CircleNotch size={16} weight="bold" className="animate-spin" />
            {c.sending}
          </>
        ) : (
          c.submit
        )}
      </button>
      <p className="text-center text-[12px] text-[rgba(240,237,232,.35)]">{c.footnote}</p>
    </form>
  );
}
