import { CheckCircle } from 'lucide-react';

const credentials = [
  'Agente certificado Disney Travel Agent',
  'Agente certificado Universal Parks & Resorts',
  'Más de 500 itinerarios diseñados',
  'Especialista en viajes a EE.UU., Europa y Caribe',
  'Atención personalizada en cada etapa del viaje',
];

export default function AboutDiego() {
  return (
    <section id="sobre-diego" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl border border-white/8 bg-white/3 p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8]">
              Hola, soy Diego.
            </h2>
            <p className="text-[#F0EDE8]/65 leading-relaxed">
              Soy agente de viajes especializado en experiencias de parques temáticos y destinos
              internacionales. Mi trabajo no es venderte un paquete — es entender qué querés vivir
              y diseñar el viaje exacto para vos.
            </p>
            <p className="text-[#F0EDE8]/65 leading-relaxed">
              Cada itinerario que armo es único. Me involucro desde la primera consulta hasta que
              volvés a casa con los mejores recuerdos de tu vida.
            </p>
            <ul className="flex flex-col gap-2.5 mt-2">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-[#F0EDE8]/70">
                  <CheckCircle size={16} className="shrink-0 mt-0.5 text-[#42C2C2]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Placeholder foto */}
          <div className="flex items-center justify-center">
            <div
              className="w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center text-6xl font-bold text-white"
              style={{ background: 'var(--grad-ddt)' }}
            >
              D
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
