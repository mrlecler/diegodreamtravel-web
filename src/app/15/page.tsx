import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

const WA_URL = 'https://wa.me/5493624703040';

export const metadata: Metadata = {
  title: 'Quinceañeras — Diego Dream Travel',
  description:
    'Viajes de quince a medida. Agente certificado Disney & Universal.',
  // La página dice "Próximamente": todavía no hay producto que mostrar. Si
  // se indexa, lo que Google publica de nosotros es que algo nuestro no
  // existe. Sigue viva para quien llegue por un link directo — de ahí el
  // follow: true, que deja rastrear la salida a WhatsApp. Cuando haya
  // contenido real, sacar este bloque y agregar la ruta a src/app/sitemap.ts.
  robots: { index: false, follow: true },
};

export default function QuincePage() {
  return (
    <main className="min-h-screen bg-[#0C1521] flex flex-col items-center justify-center text-center px-6 gap-6">
      <p className="text-xs font-medium tracking-widest uppercase text-[#F0EDE8]/40">
        Diego Dream Travel
      </p>
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold"
        style={{
          background: 'var(--grad-quince)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Quinceañeras
      </h1>
      <p className="text-[#F0EDE8]/50 text-lg max-w-md">
        La experiencia más especial de su vida está siendo diseñada. Próximamente.
      </p>
      <GradientButton href={WA_URL} className="mt-2">
        <MessageCircle size={16} />
        Consultá ahora por WhatsApp
      </GradientButton>
    </main>
  );
}
