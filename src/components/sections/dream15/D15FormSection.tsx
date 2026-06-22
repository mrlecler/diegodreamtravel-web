import D15Form from './D15Form';

export default function D15FormSection() {
  return (
    <section
      id="form"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(52px,7vw,88px) 0' }}
    >
      {/* Glow arriba */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(55% 45% at 50% 0%, rgba(232,67,147,.18), transparent 65%)',
          zIndex: 0,
        }}
      />
      <div
        className="relative z-[1] mx-auto px-6"
        style={{ maxWidth: 'min(660px, calc(100% - 48px))' }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-[11px] font-semibold tracking-[3px] uppercase mb-4"
            style={{ color: '#E07AC4' }}
          >
            Sumate
          </p>
          <h2
            className="text-[#F0EDE8] mb-4"
            style={{
              fontFamily: 'var(--font-skatyn), serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 5vw, 54px)',
              lineHeight: 0.96,
            }}
          >
            Dejanos tus datos y te contamos todo.
          </h2>
          <p className="text-[15px] font-light text-[rgba(240,237,232,.65)] max-w-md mx-auto leading-relaxed">
            Sin compromiso. Te escribo por WhatsApp, te paso fechas, grupos y cómo arrancar. Lo demás
            lo charlamos.
          </p>
        </div>

        {/* Formulario */}
        <div
          className="rounded-3xl p-7 sm:p-10"
          style={{
            background: '#1C0B1A',
            border: '1px solid rgba(232,67,147,.2)',
            boxShadow: '0 30px 90px -30px rgba(232,67,147,.45)',
          }}
        >
          <D15Form />
        </div>
      </div>
    </section>
  );
}
