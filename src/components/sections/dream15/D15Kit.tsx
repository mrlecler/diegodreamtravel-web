import { Backpack, TShirt, Drop, Gift } from '@phosphor-icons/react/dist/ssr';
import IconBadge from '@/components/ui/IconBadge';

const KIT_ITEMS = [
  { Icon: Backpack, label: 'Mochila DDT' },
  { Icon: TShirt,    label: 'Remera del viaje' },
  { Icon: Drop, label: 'Botella recargable' },
  { Icon: Gift,     label: 'Regalos sorpresa' },
];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Kit() {
  return (
    <section
      style={{ background: '#120818', padding: 'clamp(48px,6vw,80px) 0' }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: 'min(1080px, calc(100% - 48px))' }}
      >
        {/* Eyebrow + título izquierda */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            {EYEBROW_LINE}
            <span
              className="text-[11px] font-semibold tracking-[3px] uppercase"
              style={{ color: '#E07AC4' }}
            >
              Tu kit de viaje
            </span>
          </div>

          <h2
            className="text-[#F0EDE8]"
            style={{
              fontFamily: 'var(--font-skatyn), serif',
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.8vw, 62px)',
              lineHeight: 0.96,
              letterSpacing: '.5px',
            }}
          >
            Arrancás con todo{' '}
            <em className="d15-accent" style={{ fontStyle: 'normal' }}>puesto</em>.
          </h2>

          <p
            className="text-[rgba(240,237,232,.72)] font-light mt-4"
            style={{ maxWidth: 440, fontSize: 15, lineHeight: 1.7 }}
          >
            Desde el primer día tenés tu kit DDT. Y un regalo premium que elegís vos.
          </p>
        </div>

        {/* Tarjetas ícono en fila */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {KIT_ITEMS.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-start gap-4 rounded-2xl py-8 px-6 transition-all duration-[250ms] hover:-translate-y-1"
              style={{
                background: 'linear-gradient(145deg, rgba(232,67,147,.12) 0%, rgba(245,200,66,.06) 100%), #1C0B1A',
                border: '1px solid rgba(232,67,147,.2)',
              }}
            >
              <IconBadge
                Icon={Icon}
                ring="linear-gradient(135deg, #E84393, #F5C842)"
                iconColor="#F49ACB"
                glow="rgba(245,200,66,.4)"
                size={56}
                iconSize={27}
                radius={16}
              />
              <span className="text-[14px] font-semibold text-[#F0EDE8] leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Nota inferior */}
        <p
          className="text-[13px] font-light mt-6"
          style={{ color: 'rgba(240,237,232,.4)' }}
        >
          El kit es tuyo desde antes de subir al avión.
        </p>
      </div>
    </section>
  );
}
