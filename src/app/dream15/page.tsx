import type { Metadata } from 'next';
import D15Nav from '@/components/sections/dream15/D15Nav';
import D15Hero from '@/components/sections/dream15/D15Hero';
import D15Experiencia from '@/components/sections/dream15/D15Experiencia';
import D15Tribu from '@/components/sections/dream15/D15Tribu';
import D15Kit from '@/components/sections/dream15/D15Kit';
import D15Padres from '@/components/sections/dream15/D15Padres';
import D15Testimonials from '@/components/sections/dream15/D15Testimonials';
import D15Club from '@/components/sections/dream15/D15Club';
import D15FAQ from '@/components/sections/dream15/D15FAQ';
import D15FormSection from '@/components/sections/dream15/D15FormSection';
import D15CTAClose from '@/components/sections/dream15/D15CTAClose';
import D15Footer from '@/components/sections/dream15/D15Footer';

export const metadata: Metadata = {
  title: 'Dream 15 — El viaje de tus 15 | Diego Dream Travel',
  description:
    'El viaje grupal a Orlando para los que cumplen 15. Disney, Universal y tu grupo. Agente certificado. Pagá en cuotas. Atención personalizada desde el primer mensaje.',
  // Dream 15 todavía no está en producción: que no se indexe en buscadores.
  // Quitar este bloque (o cambiar DREAM15_LIVE a true no afecta esto) cuando se lance.
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Dream 15 — El viaje de tus 15 | Diego Dream Travel',
    description:
      'El viaje grupal a Orlando para los que cumplen 15. Disney, Universal y tu grupo.',
    url: 'https://www.diegodreamtravel.com/dream15',
    siteName: 'Diego Dream Travel',
    locale: 'es_AR',
    type: 'website',
    // images: [{ url: '/og/dream15.jpg', width: 1200, height: 630 }], // Diego: agregar OG image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream 15 — El viaje de tus 15 | Diego Dream Travel',
    description:
      'El viaje grupal a Orlando para los que cumplen 15. Disney, Universal y tu grupo.',
  },
  icons: { icon: '/favicon.png' },
};

export default function Dream15Page() {
  return (
    <div style={{ background: '#120818' }}>
      <D15Nav />
      <main>
        <D15Hero />
        <D15Experiencia />
        <D15Tribu />
        <D15Kit />
        <D15Padres />
        <D15Testimonials />
        <D15Club />
        <D15FAQ />
        <D15FormSection />
        <D15CTAClose />
      </main>
      <D15Footer />
    </div>
  );
}
