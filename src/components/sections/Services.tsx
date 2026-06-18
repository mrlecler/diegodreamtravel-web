import { Plane, Castle, PartyPopper, Users, Map, Star } from 'lucide-react';

const services = [
  {
    icon: Castle,
    title: 'Disney & Universal',
    desc: 'Planificación completa de parques temáticos con optimización de colas, FastPass y reservas de shows.',
  },
  {
    icon: Plane,
    title: 'Vuelos internacionales',
    desc: 'Búsqueda de las mejores tarifas con conexiones optimizadas para Argentina.',
  },
  {
    icon: Map,
    title: 'Itinerarios a medida',
    desc: 'Cada día de tu viaje diseñado según tus intereses, ritmo y presupuesto.',
  },
  {
    icon: PartyPopper,
    title: 'Quinceañeras',
    desc: 'El viaje más especial de su vida, con atención personalizada y magia garantizada.',
  },
  {
    icon: Users,
    title: 'Viajes grupales',
    desc: 'Coordinación completa para grupos familiares, amigos o empresas.',
  },
  {
    icon: Star,
    title: 'Experiencias VIP',
    desc: 'Acceso a experiencias exclusivas, upgrades y sorpresas que no encontrás en ningún paquete.',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8] mb-3">
            ¿En qué puedo ayudarte?
          </h2>
          <p className="text-[#F0EDE8]/50 text-lg max-w-xl mx-auto">
            Cada viaje es único. Estos son los tipos de experiencias que diseño.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-white/8 bg-white/3 p-6 hover:border-white/15 hover:bg-white/5 transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: 'var(--grad-ddt)' }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-[#F0EDE8] mb-2">{service.title}</h3>
                <p className="text-sm text-[#F0EDE8]/55 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
