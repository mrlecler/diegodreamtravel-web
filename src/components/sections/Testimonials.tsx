const testimonials = [
  {
    initials: 'MV',
    name: 'María Virginia Munaretto',
    text: 'Diego organizó nuestro viaje a Disney World con un nivel de detalle que no esperaba. Hoteles, reservas de restaurantes dentro del parque, entradas. Cuando nuestro vuelo sufrió un retraso, él nos avisó antes que la propia aerolínea.',
  },
  {
    initials: 'HM',
    name: 'Hugo Martínez',
    text: 'Primera vez en Universal Studios y no perdimos ni una atracción. Diego coordinó hotel, Express Pass, traslados. El servicio no tiene costo y eso se nota en el compromiso. Resolvió cualquier consulta en menos de una hora.',
  },
  {
    initials: 'ME',
    name: 'María Eugenia Munaretto',
    text: 'El viaje de 15 de mi hija fue perfecto. Diego manejó todo: el grupo, los vuelos, el hotel en Disney, cada experiencia especial. Nos acompañó desde el primer mensaje hasta que volvimos. No hay palabras para describir lo que vivieron.',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            04 · Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1521] leading-tight">
            Lo que dicen quienes{' '}
            <span className="text-grad-ddt">viajaron.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border p-6 flex flex-col gap-5"
              style={{
                borderColor: 'rgba(5,14,31,.07)',
                boxShadow: '0 2px 16px rgba(5,14,31,.06)',
              }}
            >
              <div className="flex gap-0.5 text-[#FF5B00] text-sm">★★★★★</div>
              <p className="text-[#475066] text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'rgba(5,14,31,.06)' }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: 'var(--grad-ddt)' }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[#0C1521] font-semibold text-xs">{t.name}</p>
                  <p className="text-[#475066]/60 text-[10px]">Reseña verificada · Trustpilot</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot footer */}
        <div className="text-center flex flex-col gap-2">
          <p className="text-sm text-[#475066]">★★★★★ Excelente · Trustpilot · Reseñas verificadas</p>
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#475066]/60 underline underline-offset-2 hover:text-[#0C1521] transition-colors"
          >
            Ver todas las reseñas
          </a>
        </div>
      </div>
    </section>
  );
}
