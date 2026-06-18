const testimonials = [
  {
    name: 'Laura M.',
    location: 'Buenos Aires',
    text: 'Diego organizó nuestro viaje a Disney con dos nenas y fue perfecto. Cada detalle estaba pensado. Nunca esperamos más de 10 minutos en ninguna atracción.',
  },
  {
    name: 'Martín R.',
    location: 'Corrientes',
    text: 'Primera vez en Europa y fue una experiencia increíble. Diego armó un itinerario que incluía cosas que nunca hubiéramos encontrado solos. Lo recomiendo sin dudas.',
  },
  {
    name: 'Familia González',
    location: 'Rosario',
    text: 'El viaje de quince de nuestra hija fue mágico. Diego se ocupó de absolutamente todo. Ella todavía habla de ese viaje como el mejor de su vida.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8] mb-3">
            Lo que dicen mis clientes
          </h2>
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F0EDE8]/40 text-sm hover:text-[#F0EDE8]/70 transition-colors"
          >
            Ver todas las reseñas en Trustpilot →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 flex flex-col gap-4"
            >
              <p className="text-[#F0EDE8]/75 text-sm leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="text-[#F0EDE8] font-semibold text-sm">{t.name}</p>
                <p className="text-[#F0EDE8]/40 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
