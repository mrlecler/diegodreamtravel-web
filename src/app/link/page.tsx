import type { Metadata } from 'next';
import LinkBio from '@/components/sections/LinkBio';

export const metadata: Metadata = {
  title: 'Diego Dream Travel — Enlaces',
  description: 'Agente Disney & Universal | Orlando y el mundo | Team Livi Travel',
  // Página utilitaria de "link in bio": no aporta contenido para indexar,
  // así que no compite en buscadores con la home. Los enlaces igual son
  // rastreables (follow: true).
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Diego Dream Travel',
    description: 'Agente Disney & Universal | Orlando y el mundo',
    url: 'https://www.diegodreamtravel.com/link',
    siteName: 'Diego Dream Travel',
    locale: 'es_AR',
    type: 'website',
    // images: [{ url: '/og/link.jpg', width: 1200, height: 630 }], // Diego: agregar OG image si querés
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Dream Travel',
    description: 'Agente Disney & Universal | Orlando y el mundo',
  },
  icons: { icon: '/favicon.png' },
};

export default function LinkPage() {
  return <LinkBio />;
}
