import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr';

const WA_URL = 'https://wa.me/5493624703040';

const stats = [
  { value: '$0', label: 'Costo del servicio' },
  { value: '24 hs', label: 'Cotización sin cargo' },
  { value: '2', label: 'Certificaciones oficiales' },
  { value: '100%', label: 'Coordinación incluida' },
];

const certs = [
  {
    title: 'Authorized Vacation Planner',
    sub: 'College of Disney Knowledge · Walt Disney Company',
  },
  {
    title: 'Preferred Travel Agent',
    sub: 'Universal Parks & Resorts · Certificación oficial',
  },
  {
    title: 'Team Livi Travel',
    sub: 'Agencia autorizada · Florida, USA · Respaldo operativo en EEUU',
  },
];

export default function AboutDiego() {
  return (
    <section
      id="quien-soy"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#0C1521]">{s.value}</p>
              <p className="text-sm text-[#475066] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
              Sobre mí
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1521] leading-tight">
              Hola, soy{' '}
              <span className="text-grad-ddt">Diego.</span>
            </h2>
            <p className="text-[#475066] leading-relaxed">
              Certificado por Disney y Universal bajo Team Livi Travel (Florida, USA). El
              servicio no tiene costo extra: las operadoras me pagan cuando confirmás el
              viaje. Cada viaje empieza con una conversación, no con un formulario — me
              contás qué quieren vivir y yo diseño cada detalle.
            </p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF5B00' }}
            >
              <WhatsappLogo size={16} weight="fill" />
              Contame de tu viaje
            </a>

            {/* Partners placeholder */}
            <div className="pt-4">
              <p className="text-xs text-[#475066]/70 mb-3">Trabajo junto a</p>
              <div className="flex items-center gap-4">
                {/* TODO: reemplazar por logos reales en /public */}
                {['Disney', 'Universal', 'Livi Travel'].map((p) => (
                  <span
                    key={p}
                    className="text-xs font-medium text-[#0C1521]/40 border border-[#0C1521]/10 rounded-full px-3 py-1"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cert cards */}
          <div className="flex flex-col gap-3">
            {certs.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl border p-5"
                style={{ borderColor: 'rgba(5,14,31,.07)', boxShadow: '0 2px 12px rgba(5,14,31,.06)' }}
              >
                <p className="font-semibold text-[#0C1521] text-sm">{c.title}</p>
                <p className="text-xs text-[#475066] mt-1 leading-relaxed">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
