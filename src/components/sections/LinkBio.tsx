import {
  WhatsappLogo,
  EnvelopeSimple,
  InstagramLogo,
  Globe,
  Star,
  SealCheck,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

// Página "link in bio" para Instagram/TikTok. Server component: sin estado,
// solo CSS (fade-up escalonado) — no necesita 'use client'.

const LINKS = [
  {
    href: 'https://wa.me/5493624703040',
    label: 'Cotizá gratis por WhatsApp',
    primary: true,
    icon: <WhatsappLogo size={22} weight="fill" />,
  },
  {
    href: 'https://www.paxassistance.com/es-ar/cobertura-de-viaje/diegolecler/cotizar-plan-step-1',
    label: 'Asistencia al Viajero',
    logo: '/images/logos-pax.png',
  },
  {
    href: 'https://www.civitatis.com/es?aid=108272',
    label: 'Actividades, Entradas, Tours...',
    logo: '/images/logos-civitatis.png',
  },
  {
    // Reseñas nuevas → Google Business (perfil verificado, código de tienda
    // 09820016873060583845). Hay un perfil duplicado dando vueltas: este es
    // el bueno. La estrella va en el naranja de marca (--orange); el logo de
    // Google no se usa, tiene reglas de uso de marca. Las reseñas de
    // Trustpilot que ya existen se siguen mostrando (TrustpilotWidget,
    // Testimonials, D15Testimonials): esto solo cambia a dónde mandamos a
    // quien quiere dejar una nueva.
    href: 'https://g.page/r/CXu_uXsuATpkEAI/review',
    label: '¿Cómo fue tu experiencia con mis servicios?',
    icon: <Star size={20} weight="duotone" style={{ color: '#FF5B00' }} />,
  },
  {
    href: 'mailto:info@diegodreamtravel.com',
    label: 'Escribime por mail',
    icon: <EnvelopeSimple size={20} weight="duotone" />,
  },
  {
    href: 'https://instagram.com/diego.dreamtravel',
    label: 'Seguime en Instagram',
    icon: <InstagramLogo size={20} weight="duotone" style={{ color: '#C44E92' }} />,
  },
  {
    href: 'https://www.diegodreamtravel.com',
    label: 'Website',
    icon: <Globe size={20} weight="duotone" style={{ color: '#42C2C2' }} />,
  },
];

export default function LinkBio() {
  return (
    <div className="lb-page">
      <style>{`
        .lb-page{
          position:relative; min-height:100svh; display:flex; flex-direction:column;
          align-items:center; padding:0 20px 48px; background:var(--navy);
          background-image:url('/images/link-bg.jpg'); background-size:cover;
          background-position:center; background-repeat:no-repeat;
        }
        .lb-scrim{
          position:fixed; inset:0; z-index:0; pointer-events:none;
          background:
            radial-gradient(680px 520px at -10% -10%, rgba(196,78,146,.24), transparent 62%),
            radial-gradient(620px 520px at 110% 15%, rgba(66,194,194,.18), transparent 62%),
            linear-gradient(to top, rgba(5,14,31,.94) 0%, rgba(5,14,31,.68) 32%, rgba(5,14,31,.25) 68%, rgba(5,14,31,.08) 100%);
        }
        .lb-wrap{ position:relative; z-index:1; width:100%; max-width:420px; display:flex; flex-direction:column; align-items:center; }

        .lb-header{
          width:100%; padding:40px 0 26px; text-align:center;
          display:flex; flex-direction:column; align-items:center; gap:14px;
        }
        .lb-logo{ height:40px; width:auto; opacity:0; transform:translateY(-10px); animation:lbUp .55s cubic-bezier(.22,.88,.36,1) .1s forwards; }
        .lb-tag{ font-size:13px; color:rgba(240,237,232,.62); font-weight:500; letter-spacing:.01em;
          opacity:0; transform:translateY(-8px); animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .22s forwards; }

        .lb-links{ width:100%; display:flex; flex-direction:column; gap:10px; margin-bottom:30px; }

        .lb-btn{
          display:flex; align-items:center; gap:14px; width:100%; padding:15px 18px;
          border-radius:16px; font-size:14.5px; font-weight:600; text-decoration:none;
          color:#F0EDE8; border:1px solid rgba(240,237,232,.10);
          background:rgba(12,21,33,.58); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
          transition:transform .18s ease, box-shadow .18s ease; opacity:0; transform:translateY(16px);
        }
        .lb-btn:hover{ transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,0,0,.35); }
        .lb-btn:active{ transform:translateY(0); }
        .lb-btn.primary{ background:var(--grad-ddt); border:none; box-shadow:0 4px 28px rgba(196,78,146,.4); }
        .lb-btn.primary:hover{ box-shadow:0 8px 44px rgba(196,78,146,.55); }

        .lb-ic{ width:22px; height:22px; flex:none; display:flex; align-items:center; justify-content:center; }
        .lb-ic.logo{ width:72px; justify-content:flex-start; }
        .lb-ic img{ height:18px; width:auto; max-width:72px; object-fit:contain; object-position:left center; filter:brightness(0) invert(1); opacity:.92; }
        .lb-label{ flex:1; line-height:1.25; }
        .lb-arrow{ flex:none; opacity:.5; transition:transform .18s, opacity .18s; }
        .lb-btn:hover .lb-arrow{ transform:translateX(3px); opacity:.9; }

        .lb-links .lb-btn:nth-child(1){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .32s forwards; }
        .lb-links .lb-btn:nth-child(2){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .40s forwards; }
        .lb-links .lb-btn:nth-child(3){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .48s forwards; }
        .lb-links .lb-btn:nth-child(4){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .56s forwards; }
        .lb-links .lb-btn:nth-child(5){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .64s forwards; }
        .lb-links .lb-btn:nth-child(6){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .72s forwards; }
        .lb-links .lb-btn:nth-child(7){ animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .80s forwards; }

        .lb-badges{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:28px;
          opacity:0; animation:lbUp .5s cubic-bezier(.22,.88,.36,1) .95s forwards; }
        .lb-badge{ display:inline-flex; align-items:center; gap:6px; background:rgba(12,21,33,.55);
          backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border:1px solid rgba(240,237,232,.10);
          border-radius:999px; padding:6px 13px; font-size:11px; color:rgba(240,237,232,.68); font-weight:500; white-space:nowrap; }

        .lb-footer{ margin-top:auto; text-align:center; padding-top:8px; opacity:0;
          animation:lbUp .5s cubic-bezier(.22,.88,.36,1) 1.05s forwards; }
        .lb-footer img{ height:24px; width:auto; filter:brightness(0) invert(1); opacity:.75; transition:opacity .2s; }
        .lb-footer a:hover img{ opacity:1; }
        .lb-footer p{ margin-top:6px; font-size:11px; letter-spacing:.03em; color:rgba(240,237,232,.45); }

        @keyframes lbUp{ to{ opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="lb-scrim" aria-hidden="true" />

      <div className="lb-wrap">
        <div className="lb-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lb-logo" src="/logo-ddt-20.svg" alt="Diego Dream Travel" />
          <p className="lb-tag">Agente Disney &amp; Universal · Orlando y el mundo</p>
        </div>

        <div className="lb-links">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className={`lb-btn${link.primary ? ' primary' : ''}`}
            >
              <span className={`lb-ic${link.logo ? ' logo' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {link.logo ? <img src={link.logo} alt="" /> : link.icon}
              </span>
              <span className="lb-label">{link.label}</span>
              <ArrowRight size={16} weight="bold" className="lb-arrow" />
            </a>
          ))}
        </div>

        <div className="lb-badges">
          <span className="lb-badge">
            <SealCheck size={14} weight="duotone" style={{ color: '#42C2C2' }} />
            Authorized Disney Vacation Planner
          </span>
          <span className="lb-badge">
            <SealCheck size={14} weight="duotone" style={{ color: '#42C2C2' }} />
            Universal Preferred Travel Agent
          </span>
        </div>

        <footer className="lb-footer">
          <a href="https://livitravel.com/es/" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Logo_LT.webp" alt="Livi Travel" />
          </a>
          <p>diegodreamtravel.com</p>
        </footer>
      </div>
    </div>
  );
}
