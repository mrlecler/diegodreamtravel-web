'use client';

import { useState } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';

const WA_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '5493624703040'}?text=${encodeURIComponent('Hola Diego, completé el formulario Dream 15 y me gustaría saber más.')}`;

type FormData = {
  tipo: 'quinceanero' | 'familia' | '';
  nombre_apellido: string;
  whatsapp: string;
  edad: string;
  ciudad: string;
  fecha_tentativa: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function D15Form() {
  const [form, setForm] = useState<FormData>({
    tipo: '',
    nombre_apellido: '',
    whatsapp: '',
    edad: '',
    ciudad: '',
    fecha_tentativa: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
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

  const inputClass =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-[#F0EDE8] placeholder-[#F0EDE8]/30 focus:outline-none focus:border-[#C43E8A]/60 focus:bg-white/8 transition-all';

  const labelClass = 'block text-xs font-medium text-[#F0EDE8]/60 mb-1.5';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl"
          style={{ background: 'var(--grad-quince)' }}
        >
          ✓
        </div>
        <div>
          <p className="text-xl font-bold text-[#F0EDE8] mb-1">
            ¡Gracias! Te escribo por WhatsApp.
          </p>
          <p className="text-[#F0EDE8]/55 text-sm">
            Diego recibió tu consulta y se va a contactar muy pronto.
          </p>
        </div>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_28px_rgba(37,211,102,0.5)]"
          style={{ background: '#25D366' }}
        >
          <MessageCircle size={16} />
          Escribirle por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* ¿Para quién es? */}
      <fieldset>
        <legend className={labelClass}>¿Para quién es el viaje?</legend>
        <div className="flex gap-3">
          {[
            { value: 'quinceanero', label: 'Para la quinceañera' },
            { value: 'familia', label: 'Soy familiar / organizador' },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-all duration-150 ${
                form.tipo === opt.value
                  ? 'border-[#C43E8A]/60 bg-[#C43E8A]/10 text-[#F0EDE8]'
                  : 'border-white/10 bg-white/3 text-[#F0EDE8]/60 hover:border-white/20'
              }`}
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
        <label htmlFor="nombre_apellido" className={labelClass}>
          Nombre y apellido <span className="text-[#C43E8A]">*</span>
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
          className={inputClass}
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className={labelClass}>
          WhatsApp <span className="text-[#C43E8A]">*</span>
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
          className={inputClass}
        />
      </div>

      {/* Edad + Ciudad en fila */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="edad" className={labelClass}>
            Edad de la quinceañera
          </label>
          <input
            id="edad"
            name="edad"
            type="text"
            placeholder="Ej: 14"
            value={form.edad}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ciudad" className={labelClass}>
            Ciudad
          </label>
          <input
            id="ciudad"
            name="ciudad"
            type="text"
            placeholder="Ej: Corrientes"
            value={form.ciudad}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Fecha tentativa */}
      <div>
        <label htmlFor="fecha_tentativa" className={labelClass}>
          Fecha tentativa del viaje
        </label>
        <input
          id="fecha_tentativa"
          name="fecha_tentativa"
          type="text"
          placeholder="Ej: Enero 2026, en sus 15 (marzo 2026)"
          value={form.fecha_tentativa}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <p role="alert" className="text-sm text-[#E63957] text-center">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || !form.nombre_apellido.trim() || !form.whatsapp.trim()}
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-[0_0_24px_rgba(124,58,237,0.35)]"
        style={{ background: 'var(--grad-quince)' }}
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Quiero mi cotización gratuita
          </>
        )}
      </button>
    </form>
  );
}
