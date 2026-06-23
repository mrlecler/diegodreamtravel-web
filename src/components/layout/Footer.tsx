import Link from 'next/link';

const secciones = [
  { label: 'Quién soy', href: '#quien-soy' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Por qué conmigo', href: '#por-que' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Dream 15 · Viaje de 15', href: '/dream15' },
];

const contacto = [
  { label: 'WhatsApp +54 9 362 470-3040', href: 'https://wa.me/5493624703040' },
  { label: '@diego.dreamtravel', href: 'https://instagram.com/diego.dreamtravel' },
  { label: 'info@diegodreamtravel.com', href: 'mailto:info@diegodreamtravel.com' },
];

const certs = [
  'Authorized Vacation Planner',
  'Preferred Travel Agent',
  'Team Livi Travel · Florida, USA',
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#07101c' }} className="px-6 pt-14 pb-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-full shrink-0"
                style={{ background: 'var(--grad-ddt)' }}
              />
              <span className="text-[#F0EDE8] font-semibold text-sm">Diego Dream Travel</span>
            </div>
            <p className="text-[#F0EDE8]/40 text-xs leading-relaxed">
              No vendo paquetes. Construyo recuerdos que duran para siempre.
            </p>
            <div className="flex flex-col gap-1 text-xs text-[#F0EDE8]/40">
              <span>+54 9 362 470-3040</span>
              <span>@diego.dreamtravel</span>
            </div>
          </div>

          {/* Secciones */}
          <div className="flex flex-col gap-3">
            <p className="text-[#F0EDE8]/30 text-[10px] font-semibold tracking-widest uppercase">
              Secciones
            </p>
            <ul className="flex flex-col gap-2">
              {secciones.map((s) => (
                <li key={s.label}>
                  {s.href.startsWith('/') ? (
                    <Link
                      href={s.href}
                      className="text-xs text-[#F0EDE8]/55 hover:text-[#F0EDE8] transition-colors"
                    >
                      {s.label}
                    </Link>
                  ) : (
                    <a
                      href={s.href}
                      className="text-xs text-[#F0EDE8]/55 hover:text-[#F0EDE8] transition-colors"
                    >
                      {s.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-3">
            <p className="text-[#F0EDE8]/30 text-[10px] font-semibold tracking-widest uppercase">
              Contacto
            </p>
            <ul className="flex flex-col gap-2">
              {contacto.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#F0EDE8]/55 hover:text-[#F0EDE8] transition-colors"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificaciones */}
          <div className="flex flex-col gap-3">
            <p className="text-[#F0EDE8]/30 text-[10px] font-semibold tracking-widest uppercase">
              Certificaciones
            </p>
            <ul className="flex flex-col gap-2">
              {certs.map((c) => (
                <li key={c} className="text-xs text-[#F0EDE8]/55">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#F0EDE8]/25">
          <span>© 2026 Diego Dream Travel · Livi Travel Agency</span>
          <span>Argentina · Latam · USA</span>
        </div>
      </div>
    </footer>
  );
}
