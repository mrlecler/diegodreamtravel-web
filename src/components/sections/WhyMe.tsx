import {
  SealCheck,
  UserCircle,
  DeviceMobile,
  CreditCard,
  Headset,
} from '@phosphor-icons/react/dist/ssr';

const cards = [
  {
    Icon: SealCheck,
    title: 'Certificación oficial verificable',
    desc: 'Authorized Vacation Planner (Disney) y Preferred Travel Agent (Universal). No autoproclamado: verificable.',
    badge: null,
  },
  {
    Icon: UserCircle,
    title: 'Una sola persona, siempre',
    desc: 'El mismo Diego antes, durante y después del viaje. Sin ser transferido a otro operador cuando más lo necesitás.',
    badge: null,
  },
  {
    Icon: DeviceMobile,
    title: 'Portal del pasajero propio',
    desc: 'Plataforma propia (PWA) donde ves tu itinerario, documentos y actualizaciones en tiempo real. Casi ningún agente lo ofrece.',
    badge: 'Exclusivo DDT',
  },
  {
    Icon: CreditCard,
    title: 'Cuotas o pago seguro en USA',
    desc: 'Financiación en cuotas para Argentina y Latam. Pago seguro con tarjeta en USA vía Square (Livi Travel).',
    badge: null,
  },
  {
    Icon: Headset,
    title: 'Asistencia antes, durante y después',
    desc: 'Si hay un retraso, un cambio o un problema, te aviso y lo resuelvo. El viaje no termina cuando se cierra el itinerario.',
    badge: null,
  },
];

export default function WhyMe() {
  return (
    <section
      id="por-que"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            03 · Por qué conmigo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1521] leading-tight">
            Tres cosas que casi{' '}
            <span className="text-grad-ddt">ningún agente</span>{' '}
            combina junto.
          </h2>
          <p className="text-[#475066] max-w-lg mx-auto leading-relaxed">
            Una cara real, certificación verificable y plataforma propia. No un call center.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ Icon, title, desc, badge }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border p-6 flex flex-col gap-4 relative"
              style={{
                borderColor: 'rgba(5,14,31,.07)',
                boxShadow: '0 2px 16px rgba(5,14,31,.06)',
              }}
            >
              {badge && (
                <span
                  className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: 'var(--grad-ddt)' }}
                >
                  {badge}
                </span>
              )}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--grad-ddt)' }}
              >
                <Icon size={20} weight="duotone" color="white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-[#0C1521] text-sm leading-snug">{title}</h3>
                <p className="text-xs text-[#475066] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
