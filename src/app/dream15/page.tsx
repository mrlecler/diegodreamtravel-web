import type { Metadata } from 'next';
import NavIsland from '@/components/layout/NavIsland';
import Footer from '@/components/layout/Footer';
import D15Hero from '@/components/sections/dream15/D15Hero';
import D15TrustBar from '@/components/sections/dream15/D15TrustBar';
import D15Features from '@/components/sections/dream15/D15Features';
import D15FormSection from '@/components/sections/dream15/D15FormSection';
import D15Testimonials from '@/components/sections/dream15/D15Testimonials';
import D15CTAClose from '@/components/sections/dream15/D15CTAClose';

export const metadata: Metadata = {
  title: 'Dream 15 — El viaje de sus 15 | Diego Dream Travel',
  description:
    'Diseñamos el viaje de sus 15 a medida: Disney, Universal, cruceros y más. Agente certificado. Atención personalizada desde el primer mensaje.',
  openGraph: {
    title: 'Dream 15 — El viaje de sus 15 | Diego Dream Travel',
    description:
      'Diseñamos el viaje de sus 15 a medida: Disney, Universal, cruceros y más.',
    url: 'https://www.diegodreamtravel.com/dream15',
    siteName: 'Diego Dream Travel',
    locale: 'es_AR',
    type: 'website',
    // images: [{ url: '/og/dream15.jpg', width: 1200, height: 630 }], // Diego: agregar OG image
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dream 15 — El viaje de sus 15 | Diego Dream Travel',
    description:
      'Diseñamos el viaje de sus 15 a medida: Disney, Universal, cruceros y más.',
  },
};

export default function Dream15Page() {
  return (
    <>
      <NavIsland />
      <main>
        <D15Hero />
        <D15TrustBar />
        <D15Features />
        <D15FormSection />
        <D15Testimonials />
        <D15CTAClose />
      </main>
      <Footer />
    </>
  );
}
