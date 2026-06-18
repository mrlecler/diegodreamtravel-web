import type { Metadata } from 'next';
import { plusJakartaSans, skatynGator } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Diego Dream Travel — Agencia de viajes a medida',
  description:
    'Agente certificado Disney & Universal. Viajes a medida para vos. No vendo paquetes, construyo recuerdos que duran para siempre.',
  openGraph: {
    title: 'Diego Dream Travel',
    description: 'Agente certificado Disney & Universal. Viajes a medida para vos.',
    url: 'https://www.diegodreamtravel.com',
    siteName: 'Diego Dream Travel',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Dream Travel',
    description: 'Agente certificado Disney & Universal. Viajes a medida para vos.',
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
        {children}
      </body>
    </html>
  );
}
