'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '¿Qué incluye el viaje?',
    a: 'Todo lo importante, ya resuelto: vuelos, hoteles, entradas a los parques de Disney y a Universal con Park to Park, Memory Maker, comidas, traslados, días de compras, 2 noches en Miami, una cena especial de bienvenida, tu kit de viaje, seguimiento diario, asistencia al viajero y regalos sorpresa. Salís de casa y el resto ya está pensado.',
  },
  {
    q: '¿Cuánto dura el viaje?',
    a: '15 días viviéndolo a pleno, entre Orlando y Miami.',
  },
  {
    q: '¿Qué edad tienen que tener?',
    a: 'Es para chicos y chicas de 14 a 16 años que cumplen (o cumplieron) sus 15.',
  },
  {
    q: '¿Quiénes acompañan al grupo?',
    a: 'Un coordinador y una coordinadora cada 10 chicos y chicas (grupos más chicos que el promedio), las 24 horas, con respaldo médico en destino. Atención de verdad, de la mañana a la noche.',
  },
  {
    q: '¿Mi hijo o hija no conoce a nadie, va a estar bien?',
    a: 'Sí. Antes de viajar hacemos encuentros virtuales de integración (una videollamada de bienvenida y un grupo de WhatsApp del viaje) para que el grupo se conozca. Nadie llega sin conocer a nadie.',
  },
  {
    q: '¿Cómo cuidan la salud y la seguridad?',
    a: 'En capas: asistencia al viajero PAX con cobertura internacional, respaldo médico en destino, una ficha médica de cada viajero que completás antes de salir, y coordinación las 24 horas con grupos reducidos. La tranquilidad es parte del viaje.',
  },
  {
    q: '¿Necesitan visa para Estados Unidos?',
    a: 'Sí. Y no te ocupás solo: te asistimos con el trámite de visa o ESTA y con el permiso de viaje para menores. Te guiamos en toda la documentación migratoria.',
  },
  {
    q: '¿Puedo pagar en cuotas?',
    a: 'Sí. Reservás con una seña y el resto lo pagás en cuotas a tu medida, mes a mes, hasta el viaje. Pagar tu viaje al exterior en cuotas es algo que casi nadie te ofrece.',
  },
  {
    q: '¿Y si reservo y después no puedo viajar?',
    a: 'Te explicamos todas las condiciones de reserva y cancelación con claridad y por escrito antes de que firmes nada. Sin letra chica.',
  },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15FAQ() {
  const [open, setOpen] = useState(-1);

  return (
    <section
      style={{ background: '#120818', padding: 'clamp(52px,7vw,88px) 0' }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: 'min(1080px, calc(100% - 48px))' }}
      >
        <div className="flex items-center gap-3 mb-5">
          {EYEBROW_LINE}
          <span
            className="text-[11px] font-semibold tracking-[3px] uppercase"
            style={{ color: '#E07AC4' }}
          >
            Preguntas frecuentes
          </span>
        </div>

        <h2
          className="text-[#F0EDE8] mb-10"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4.8vw, 56px)',
            lineHeight: 0.96,
            letterSpacing: '.5px',
          }}
        >
          Lo que más nos{' '}
          <em
            className="d15-accent"
            style={{ fontStyle: 'normal' }}
          >
            preguntan
          </em>
          .
        </h2>

        <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(240,237,232,.08)' }}>
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="text-[15px] font-semibold text-[#F0EDE8]">{faq.q}</span>
                <span
                  className="flex-shrink-0 text-[18px] font-light transition-transform duration-200"
                  style={{
                    color: '#E84393',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p
                  className="text-[14.5px] font-light text-[rgba(240,237,232,.75)] leading-[1.72] pb-5"
                  style={{ maxWidth: '72ch' }}
                >
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
