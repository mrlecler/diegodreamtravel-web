import { MessageCircle } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

const WA_URL = 'https://wa.me/5493624703040';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Glow de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(244,123,69,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#F0EDE8]/70">
          Agente certificado Disney & Universal
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F0EDE8] leading-tight">
          No vendo paquetes.{' '}
          <span className="text-grad-ddt">
            Construyo recuerdos que duran para siempre.
          </span>
        </h1>

        {/* Sub-tagline */}
        <p className="text-lg sm:text-xl text-[#F0EDE8]/60 max-w-xl">
          Viajes a medida para vos. Diseño cada itinerario con atención personalizada desde el primer mensaje.
        </p>

        {/* CTA */}
        <GradientButton href={WA_URL} className="mt-2 px-8 py-4 text-base">
          <MessageCircle size={18} />
          Hablemos por WhatsApp
        </GradientButton>

        {/* Social proof */}
        <div className="flex items-center gap-6 text-sm text-[#F0EDE8]/40 mt-2">
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F0EDE8]/70 transition-colors"
          >
            ★★★★★ en Trustpilot
          </a>
          <span className="w-px h-4 bg-white/10" />
          <a
            href="https://instagram.com/diego.dreamtravel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F0EDE8]/70 transition-colors"
          >
            @diego.dreamtravel
          </a>
        </div>
      </div>
    </section>
  );
}
