const KIT_ITEMS = ['Mochila DDT', 'Remera del viaje', 'Botella recargable', 'Regalos sorpresa'];

const EYEBROW_LINE = <span className="block w-7 h-[1.5px]" style={{ background: '#E84393' }} />;

export default function D15Kit() {
  return (
    <section
      style={{ background: '#120818', padding: 'clamp(56px,8vw,100px) 0' }}
    >
      <div
        className="mx-auto px-6"
        style={{ maxWidth: 'min(1080px, calc(100% - 48px))' }}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Kit visual */}
          <div
            className="relative rounded-3xl overflow-hidden p-10 flex flex-col gap-6"
            style={{
              background: 'linear-gradient(135deg, rgba(232,67,147,.18) 0%, rgba(245,200,66,.12) 100%), #1C0B1A',
              border: '1px solid rgba(232,67,147,.25)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-skatyn), serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                color: 'rgba(240,237,232,.15)',
                lineHeight: 1,
                position: 'absolute',
                top: 16,
                right: 24,
              }}
            >
              DDT
            </p>
            <div className="flex flex-wrap gap-3">
              {KIT_ITEMS.map((item) => (
                <span
                  key={item}
                  className="text-[13px] font-semibold px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(232,67,147,.15)',
                    border: '1px solid rgba(232,67,147,.35)',
                    color: '#F472B6',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className="text-[13px] font-light text-[rgba(240,237,232,.55)]">
              El kit es tuyo desde antes de subir al avión.
            </p>
          </div>

          {/* Copy */}
          <div>
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
                fontSize: 'clamp(32px, 4.8vw, 58px)',
                lineHeight: 0.96,
                letterSpacing: '.5px',
              }}
            >
              Arrancás con{' '}
              <em
                style={{
                  fontStyle: 'normal',
                  background: 'var(--grad-d15-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                todo puesto
              </em>
              .
            </h2>

            <p
              className="text-[rgba(240,237,232,.82)] font-light"
              style={{ marginTop: 20, fontSize: 16, lineHeight: 1.75 }}
            >
              Desde el primer día tenés tu kit DDT. Y un regalo premium que elegís vos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
