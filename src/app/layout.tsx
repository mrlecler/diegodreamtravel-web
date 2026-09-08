import type { Metadata } from 'next';
import { plusJakartaSans, skatynGator } from '@/lib/fonts';
import { LanguageProvider } from '@/lib/language';
import './globals.css';

export const metadata: Metadata = {
  // Base para resolver las URLs relativas de canonical y Open Graph. Sin
  // esto Next no las arma bien. Es www, no el apex: el apex redirige 307
  // a www, y es el host que ya usan todos los openGraph.url del sitio, el
  // sitemap y el robots.txt.
  metadataBase: new URL('https://www.diegodreamtravel.com'),
  title: 'Diego Dream Travel — Agencia de viajes a medida',
  description:
    'Agente certificado Disney & Universal. Viajes a medida para ti. No vendo paquetes, construyo recuerdos que duran para siempre.',
  openGraph: {
    title: 'Diego Dream Travel',
    description: 'Agente certificado Disney & Universal. Viajes a medida para ti.',
    url: 'https://www.diegodreamtravel.com',
    siteName: 'Diego Dream Travel',
    locale: 'es',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Dream Travel',
    description: 'Agente certificado Disney & Universal. Viajes a medida para ti.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${plusJakartaSans.variable} ${skatynGator.variable}`}
    >
      <body className="bg-[#0C1521] min-h-screen text-[#F0EDE8] antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
