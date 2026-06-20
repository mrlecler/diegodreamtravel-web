import { Award, Users, ShieldCheck, Eye, ClipboardList, Phone, FileCheck } from 'lucide-react';

const CARDS = [
  {
    Icon: Award,
    title: 'Agente certificado',
    desc: 'Certificación oficial Disney (College of Disney Knowledge) y Universal (Preferred Travel Agent), bajo Team Livi Travel. Real y verificable.',
  },
  {
    Icon: Users,
    title: 'Grupo reducido y acompañado',
    desc: 'Un coordinador y una coordinadora cada 10 chicos y chicas, las 24 horas. Grupos más chicos que el promedio: atención real, no masa.',
  },
  {
    Icon: ShieldCheck,
    title: 'Seguridad médica en capas',
    desc: 'Asistencia al viajero PAX con cobertura internacional, respaldo médico en destino y ficha médica de cada viajero. La salud, cubierta de punta a punta.',
  },
  {
    Icon: Eye,
    title: 'Seguimiento diario',
    desc: 'Fotos y video del grupo todos los días. Ves a tu hijo o hija disfrutando en cada jornada del viaje.',
  },
  {
    Icon: ClipboardList,
    title: 'Todo organizado',
    desc: 'Vuelos, hotel, traslados, entradas y cada detalle, resueltos y por escrito. Nada librado al azar.',
  },
  {
    Icon: Phone,
    title: 'Siempre disponible',
    desc: 'Una persona real del otro lado. Antes, durante y después del viaje. Comunicación directa con las familias.',
  },
  {
    Icon: FileCheck,
    title: 'Visa y documentación',
    desc: 'Te asistimos con el trámite de visa o ESTA y con el permiso de viaje para menores. La documentación migratoria, acompañada de principio a fin.',
  },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

const CARD_STYLE = {
  background: '#1C0B1A',
  border: '1px solid rgba(240,237,232,.08)',
};

function Card({ Icon, title, desc }: { Icon: typeof Award; title: string; desc: string }) {
  return (
    <div
      className="rounded-[18px] p-[26px_22px] transition-all duration-[250ms] hover:-translate-y-1"
      style={CARD_STYLE}
    >
      <div
        className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(232,67,147,.3), rgba(232,67,147,.18))',
          color: '#E07AC4',
        }}
      >
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <h3 className="text-[15px] font-bold text-[#F0EDE8] mb-1.5">{title}</h3>
      <p className="text-[13px] font-light leading-[1.6] text-[rgba(240,237,232,.75)]">{desc}</p>
    </div>
  );
}

export default function D15Padres() {
  return (
    <section
      id="padres"
      className="relative overflow-hidden"
      style={{ background: '#120818', padding: 'clamp(72px,10vw,128px) 0' }}
    >
      {/* Glow fondo */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-5%', width: '55%', height: '65%', zIndex: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(232,67,147,.12), transparent 65%)',
        }}
      />

      <div
        className="relative z-[1] mx-auto px-6"
        style={{ maxWidth: 'min(1080px, calc(100% - 48px))' }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          {EYEBROW_LINE}
          <span
            className="text-[11px] font-semibold tracking-[3px] uppercase"
            style={{ color: '#E07AC4' }}
          >
            Para mamá y papá
          </span>
        </div>

        {/* Título */}
        <h2
          className="text-[#F0EDE8]"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5.2vw, 68px)',
            lineHeight: 0.96,
            letterSpacing: '.5px',
            maxWidth: '22ch',
          }}
        >
          Ellos viven la aventura. Vos te quedás{' '}
          <em style={{ fontStyle: 'normal', color: '#E84393' }}>tranquilo</em>.
        </h2>

        <p
          className="text-[rgba(240,237,232,.82)] font-light"
          style={{ marginTop: 24, maxWidth: 620, fontSize: 16, lineHeight: 1.75 }}
        >
          Detrás de la magia hay un agente de viajes certificado y una operación seria. No es un
          grupo improvisado: es un viaje organizado de principio a fin, con alguien del otro lado
          disponible antes, durante y después.
        </p>

        {/* Cards: 4 arriba + 3 centradas abajo */}
        <div className="mt-12 flex flex-col gap-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {CARDS.slice(0, 4).map(({ Icon, title, desc }) => (
              <Card key={title} Icon={Icon} title={title} desc={desc} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 md:max-w-[75%] md:mx-auto w-full">
            {CARDS.slice(4).map(({ Icon, title, desc }) => (
              <Card key={title} Icon={Icon} title={title} desc={desc} />
            ))}
          </div>
        </div>

        {/* Trabajo junto a */}
        <div className="mt-10 flex items-center gap-4 flex-wrap">
          <span className="text-[11.5px] font-semibold text-[rgba(240,237,232,.35)] uppercase tracking-[2.5px]">
            Trabajo junto a
          </span>
          <div className="flex gap-8 md:gap-10 flex-wrap items-center">
            <img src="/disney-wdw.png" alt="Walt Disney World" style={{ height: 36, width: 'auto', opacity: .8, filter: 'brightness(0) invert(1)' }} />
            <img src="/universal-orlando.png" alt="Universal Orlando" style={{ height: 32, width: 'auto', opacity: .8, filter: 'brightness(0) invert(1)' }} />
            <img src="/pax.png" alt="PAX Asistencia al viajero" style={{ height: 28, width: 'auto', opacity: .8, filter: 'brightness(0) invert(1)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
