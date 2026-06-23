import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

const WA_BASE = 'https://wa.me/5493624703040';

const worlds = [
  {
    num: '01',
    color: '#42C2C2',
    gradFrom: '#0e3030',
    gradTo: '#42C2C2',
    category: 'Parques',
    title: 'Disney & Universal',
    desc: 'En familia, sin perder un detalle. Parques, hoteles, dining y experiencias VIP.',
    cta: { label: 'Consultar por WhatsApp', href: `${WA_BASE}?text=Hola%20Diego,%20quiero%20consultar%20por%20Disney%20y%20Universal`, external: true },
  },
  {
    num: '02',
    color: '#C44E92',
    gradFrom: '#2a0a20',
    gradTo: '#C44E92',
    category: 'Quinceañeras',
    title: 'Dream 15',
    desc: 'El viaje de sus 15, premium. Grupo reducido y curado, no el modelo masivo.',
    cta: { label: 'Conocé el programa', href: '/dream15', external: false },
  },
  {
    num: '03',
    color: '#F47B45',
    gradFrom: '#3a1800',
    gradTo: '#F47B45',
    category: 'Grupos & amigos',
    title: 'En grupo',
    desc: 'Caribe, Cancún, Europa, Vegas. Vos elegís el destino, yo armo el itinerario.',
    cta: { label: 'Consultar por WhatsApp', href: `${WA_BASE}?text=Hola%20Diego,%20quiero%20consultar%20por%20un%20viaje%20en%20grupo`, external: true },
  },
  {
    num: '04',
    color: '#E63957',
    gradFrom: '#2a0010',
    gradTo: '#E63957',
    category: 'Conciertos & eventos',
    title: 'En vivo',
    desc: 'The Sphere, shows y deportes. El evento de tu vida con el viaje armado alrededor.',
    cta: { label: 'Consultar por WhatsApp', href: `${WA_BASE}?text=Hola%20Diego,%20quiero%20consultar%20por%20un%20concierto%20o%20evento`, external: true },
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="py-20 px-6"
      style={{ backgroundColor: 'var(--warm)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-[#475066] uppercase">
            02 · Qué hago
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0C1521] leading-tight">
            Lo imaginás vos.{' '}
            <span className="text-grad-ddt">Lo armo yo.</span>
          </h2>
          <p className="text-[#475066] max-w-lg mx-auto leading-relaxed">
            Cuatro formas de viajar, una sola persona que las arma. Elegí tu mundo y desde
            ahí lo construimos juntos.
          </p>
          <p className="text-xs text-[#475066]/50 mt-1">Pasá el cursor por cada uno.</p>
        </div>

        {/* World cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {worlds.map((w) => (
            <div
              key={w.num}
              className="group relative rounded-3xl overflow-hidden min-h-[280px] flex flex-col justify-end cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{
                /* TODO: reemplazar por foto real en /public */
                background: `linear-gradient(135deg, ${w.gradFrom} 0%, ${w.color} 100%)`,
              }}
            >
              {/* Dark overlay — se aclara en hover */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10 p-7 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white/50 tracking-widest">{w.num}</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${w.color}33`, color: w.color }}
                  >
                    {w.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{w.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{w.desc}</p>

                {w.cta.external ? (
                  <a
                    href={w.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#FF5B00' }}
                  >
                    <WhatsappLogo size={14} weight="fill" />
                    {w.cta.label}
                  </a>
                ) : (
                  <Link
                    href={w.cta.href}
                    className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full px-4 py-2 text-xs font-semibold text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    {w.cta.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <p className="text-center text-sm text-[#475066]/60">
          Todo a medida · sin costo extra · una sola persona de principio a fin
        </p>
      </div>
    </section>
  );
}
