'use client';

import { useLang } from '@/lib/language';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const { t } = useLang();
  const c = t.contact;

  return (
    <section
      id="contacto"
      className="relative overflow-hidden px-6"
      style={{ background: 'var(--navy)', padding: 'clamp(52px,7vw,88px) 24px' }}
    >
      {/* Glow naranja arriba */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(55% 45% at 50% 0%, rgba(255,91,0,.16), transparent 65%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-[1] mx-auto" style={{ maxWidth: 'min(660px, 100%)' }}>
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FF5B00]">
              {c.eyebrow}
            </p>
            <span className="rounded-full" style={{ width: 24, height: 2, backgroundColor: '#FF5B00' }} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#F0EDE8] leading-tight">
            {c.title}
          </h2>
          <p className="text-[15px] font-light text-[rgba(240,237,232,.65)] max-w-md leading-relaxed">
            {c.sub}
          </p>
        </div>

        {/* Card del formulario */}
        <div
          className="rounded-3xl p-7 sm:p-10"
          style={{
            background: 'rgba(240,237,232,.03)',
            border: '1px solid rgba(255,91,0,.18)',
            boxShadow: '0 30px 90px -30px rgba(255,91,0,.35)',
          }}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
