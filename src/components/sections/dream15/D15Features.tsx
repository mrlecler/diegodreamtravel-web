import { Wand2, Castle, Heart } from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'Itinerario a medida',
    desc: 'Cada día diseñado según sus sueños, ritmo y presupuesto. No hay dos Dream 15 iguales.',
  },
  {
    icon: Castle,
    title: 'Disney & Universal',
    desc: 'Acceso optimizado a los parques, FastPass, shows y experiencias VIP que no encontrás en ningún paquete.',
  },
  {
    icon: Heart,
    title: 'Atención personalizada',
    desc: 'Diego acompaña el proceso entero — desde la primera consulta hasta que vuelvan con los mejores recuerdos.',
  },
];

export default function D15Features() {
  return (
    <section id="que-es" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8] mb-3">
            ¿Qué es Dream 15?
          </h2>
          <p className="text-[#F0EDE8]/55 text-lg max-w-xl mx-auto">
            Un programa exclusivo para que los 15 sean el viaje más mágico de su vida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-white/8 bg-white/3 p-6 hover:border-white/15 hover:bg-white/5 transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: 'var(--grad-quince)' }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold text-[#F0EDE8] mb-2">{f.title}</h3>
                <p className="text-sm text-[#F0EDE8]/55 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
