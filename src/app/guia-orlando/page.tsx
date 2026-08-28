import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  IdentificationCard,
  MagicWand,
  FilmSlate,
  CalendarCheck,
  Coins,
  Clock,
} from '@phosphor-icons/react/dist/ssr';
import Footer from '@/components/layout/Footer';
import GuiaForm from './GuiaForm';

export const metadata: Metadata = {
  title: 'Guía gratis: Mi primer viaje a Orlando | Diego Dream Travel',
  description:
    'Todo lo que necesitás saber antes de tu primer viaje a Orlando: requisitos de ingreso, Disney, Universal, mejores fechas y cómo ahorrar. Guía gratuita de un Authorized Disney Vacation Planner.',
  openGraph: {
    title: 'Guía gratis: Mi primer viaje a Orlando',
    description:
      'Requisitos de ingreso, Disney, Universal y las mejores fechas para viajar. Escrita por un Authorized Disney Vacation Planner.',
    url: 'https://www.diegodreamtravel.com/guia-orlando',
    siteName: 'Diego Dream Travel',
    locale: 'es',
    type: 'website',
    images: [{ url: 'https://www.diegodreamtravel.com/guia-orlando-portada.webp' }],
  },
};

const CONTENIDO = [
  {
    Icon: IdentificationCard,
    titulo: 'Requisitos de ingreso',
    texto: 'Visa o ESTA: cuál te corresponde y cuánto tarda cada una. Lo primero, antes de soñar con parques.',
  },
  {
    Icon: MagicWand,
    titulo: 'Disney por dentro',
    texto: 'Cuatro parques temáticos, dos acuáticos y más de 26 hoteles. Cuántas noches necesitás para no correr.',
  },
  {
    Icon: FilmSlate,
    titulo: 'Universal y Epic Universe',
    texto: 'Los cuatro parques, los once hoteles y qué cambió con la apertura del parque más nuevo.',
  },
  {
    Icon: CalendarCheck,
    titulo: 'Las mejores fechas',
    texto: 'Cuándo está más barato, cuándo hay menos gente y qué meses conviene esquivar.',
  },
  {
    Icon: Coins,
    titulo: 'Cómo pagarlo en cuotas',
    texto: 'La forma de reservar hotel y entradas sin abonar todo de golpe.',
  },
  {
    Icon: Clock,
    titulo: 'Acceso anticipado',
    texto: 'Por qué alojarte adentro te hace entrar una hora antes que el resto.',
  },
];

export default function GuiaOrlandoPage() {
  return (
    <>
      <main style={{ backgroundColor: 'var(--navy)' }} className="min-h-screen">
      {/* Franja de marca */}
      <div style={{ height: 5, background: 'var(--grad-ddt)' }} />

      {/* Encabezado mínimo: sin nav, sin salidas. Es una landing de captura. */}
      <header className="mx-auto max-w-6xl px-6 pt-7">
        <Link href="/" className="inline-block no-underline">
          <Image
            src="/logo-ddt-20.svg"
            alt="Diego Dream Travel"
            width={132}
            height={38}
            priority
          />
        </Link>
      </header>

      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 items-start">
          {/* Columna izquierda: promesa + portada */}
          <div>
            <p
              className="text-[12.5px] font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--teal)' }}
            >
              Guía gratuita
            </p>

            <h1
              className="font-display leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(42px, 7vw, 76px)', color: 'var(--warm)' }}
            >
              Mi primer viaje
              <br />a <span className="text-grad-ddt">Orlando</span>
            </h1>

            <p className="text-[17px] leading-relaxed font-light max-w-xl text-[rgba(240,237,232,.72)]">
              Ocho páginas con lo que de verdad necesitás saber antes de reservar nada:
              qué autorización te hace falta para entrar, cómo se organizan Disney y
              Universal, cuántas noches conviene quedarse y en qué meses vas a pagar
              menos y hacer menos fila.
            </p>

            <div className="mt-10 max-w-[400px]">
              <Image
                src="/guia-orlando-portada.webp"
                alt="Portada de la guía Mi primer viaje a Orlando"
                width={760}
                height={1351}
                className="w-full h-auto rounded-2xl"
                style={{ boxShadow: '0 30px 70px -25px rgba(0,0,0,.75)' }}
                priority
              />
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div
            className="rounded-3xl p-7 lg:sticky lg:top-8"
            style={{
              background: 'rgba(240,237,232,.04)',
              border: '1px solid rgba(240,237,232,.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p
              className="font-display mb-2"
              style={{ fontSize: 27, lineHeight: 1.1, color: 'var(--warm)' }}
            >
              Descargala gratis
            </p>
            <p className="text-[13.5px] leading-relaxed mb-6 text-[rgba(240,237,232,.6)]">
              Dejame tu nombre y tu WhatsApp y la bajás en el acto.
            </p>
            <GuiaForm />
          </div>
        </div>
      </section>

      {/* ─── Qué hay adentro ─── */}
      <section
        className="py-20"
        style={{ borderTop: '1px solid rgba(240,237,232,.08)' }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2
            className="font-display mb-12"
            style={{ fontSize: 'clamp(30px, 4vw, 44px)', color: 'var(--warm)' }}
          >
            Qué vas a encontrar adentro
          </h2>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {CONTENIDO.map(({ Icon, titulo, texto }) => (
              <div key={titulo}>
                <Icon size={30} weight="duotone" color="#FF5B00" />
                <h3
                  className="mt-4 mb-2 text-[16px] font-bold"
                  style={{ color: 'var(--warm)' }}
                >
                  {titulo}
                </h3>
                <p className="text-[14px] leading-relaxed font-light text-[rgba(240,237,232,.6)]">
                  {texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quién la escribió ─── */}
      <section
        className="py-20"
        style={{
          borderTop: '1px solid rgba(240,237,232,.08)',
          background: 'rgba(240,237,232,.02)',
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(26px, 3.4vw, 36px)', color: 'var(--warm)' }}
          >
            Quién la escribió
          </h2>
          <p className="text-[16px] leading-relaxed font-light text-[rgba(240,237,232,.7)]">
            Soy Diego, agente de viajes certificado por Disney y por Universal. Armo
            viajes a Orlando todo el año para familias de Argentina y de toda
            Latinoamérica. Esta guía es lo mismo que le explico a cada cliente en la
            primera charla, puesto por escrito.
          </p>

          <div className="mt-10 flex items-center justify-center gap-10 flex-wrap">
            <Image
              src="/cert-disney-avp.png"
              alt="Authorized Disney Vacation Planner"
              width={128}
              height={64}
              className="h-14 w-auto opacity-85"
            />
            <Image
              src="/cert-universal-pta.png"
              alt="Universal Preferred Travel Agent"
              width={128}
              height={64}
              className="h-14 w-auto opacity-85"
            />
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
