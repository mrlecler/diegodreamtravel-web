const WA_URL = `https://wa.me/5493624703040?text=${encodeURIComponent('Hola Diego! Quiero info del viaje de quince.')}`;

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

export default function D15CTAClose() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(55% 50% at 50% 50%, rgba(232,67,147,.2), transparent 70%),
          #120818
        `,
        padding: 'clamp(80px,12vw,140px) 0',
      }}
    >
      <style>{`
        .btn-wa-d15 {
          background: #25D366;
          transition: box-shadow .2s ease, transform .18s ease;
        }
        .btn-wa-d15:hover {
          box-shadow: 0 0 36px rgba(37,211,102,.6);
          transform: translateY(-2px);
        }
        .btn-wa-d15:active { transform: scale(.97); }
      `}</style>

      <div className="mx-auto px-6 text-center" style={{ maxWidth: 'min(680px, calc(100% - 48px))' }}>
        <h2
          className="text-[#F0EDE8]"
          style={{
            fontFamily: 'var(--font-skatyn), serif',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5.8vw, 72px)',
            lineHeight: 0.96,
            letterSpacing: '.5px',
          }}
        >
          No vendo paquetes. Construyo{' '}
          <em style={{ fontStyle: 'normal', color: '#E84393' }}>recuerdos</em>{' '}
          que duran para siempre.
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="#form"
            className="d15-cta inline-flex items-center gap-2 rounded-full text-white font-bold no-underline"
            style={{
              fontSize: 14,
              padding: '16px 32px',
              background: 'var(--grad-d15)',
              boxShadow: '0 14px 34px -10px rgba(196,62,138,.8)',
            }}
          >
            Quiero sumarme
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa-d15 inline-flex items-center gap-2 rounded-full font-bold text-white no-underline"
            style={{ fontSize: 14, padding: '16px 32px' }}
          >
            {WA_ICON}
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
