import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Politica from './Politica';

export const metadata: Metadata = {
  title: 'Política de privacidad | Diego Dream Travel',
  description:
    'Qué datos te pedimos en diegodreamtravel.com, para qué los usamos, dónde se guardan y cómo pedir que los corrijamos o borremos.',
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <>
      <header className="px-6 pt-8">
        <div className="mx-auto" style={{ maxWidth: 'min(760px, calc(100% - 0px))' }}>
          <Link href="/" aria-label="Diego Dream Travel, ir al inicio" className="inline-flex min-h-[44px] items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-ddt-20.svg" alt="Diego Dream Travel" style={{ height: 44, width: 'auto' }} />
          </Link>
        </div>
      </header>
      <main className="px-6 pt-8 pb-20">
        <div className="mx-auto" style={{ maxWidth: 'min(760px, calc(100% - 0px))' }}>
          <Politica />
        </div>
      </main>
      <Footer />
    </>
  );
}
