import D15Form from './D15Form';

export default function D15FormSection() {
  return (
    <section
      id="form"
      style={{ background: '#120818', padding: 'clamp(72px,10vw,128px) 0' }}
    >
      <div
        className="mx-auto px-6 max-w-xl"
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
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: '#1C0B1A',
            border: '1px solid rgba(240,237,232,.08)',
          }}
        >
          <D15Form />
        </div>
      </div>
    </section>
  );
}
