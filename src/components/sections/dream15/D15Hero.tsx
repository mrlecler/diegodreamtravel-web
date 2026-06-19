import { ChevronDown } from 'lucide-react';

export default function D15Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
      {/* Glow de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 25%, rgba(124,58,237,0.12) 0%, rgba(196,62,138,0.08) 50%, transparent 80%)',
        }}
      />
      {/* Destellos decorativos */}
      <div className="absolute top-32 left-[15%] w-1 h-1 rounded-full bg-[#F5C842] opacity-60 blur-[1px]" />
      <div className="absolute top-48 right-[18%] w-1.5 h-1.5 rounded-full bg-[#C43E8A] opacity-50 blur-[1px]" />
      <div className="absolute bottom-40 left-[22%] w-1 h-1 rounded-full bg-[#7C3AED] opacity-50 blur-[1px]" />
      <div className="absolute bottom-52 right-[12%] w-1 h-1 rounded-full bg-[#F5C842] opacity-40 blur-[1px]" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#F0EDE8]/70">
          Diego Dream Travel · Programa exclusivo
        </span>

        {/* Headline principal en SkatynGator */}
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold leading-none"
          style={{
            fontFamily: 'var(--font-skatyn), var(--font-jakarta), sans-serif',
            background: 'var(--grad-quince)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Dream 15
        </h1>

        {/* Sub-headline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#F0EDE8] max-w-xl leading-snug">
          El viaje de sus 15.{' '}
          <span
            style={{
              background: 'var(--grad-quince)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Diseñado para vos.
          </span>
        </h2>

        {/* Descripción */}
        <p className="text-lg text-[#F0EDE8]/60 max-w-lg leading-relaxed">
          Disney, Universal, cruceros y más — un itinerario a medida para que ese
          cumpleaños sea el recuerdo más mágico de su vida.
        </p>

        {/* CTA */}
        <a
          href="#cotizacion"
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(124,58,237,0.4)] mt-2"
          style={{ background: 'var(--grad-quince)' }}
        >
          Quiero saber más
        </a>

        {/* Scroll indicator */}
        <a
          href="#trust"
          className="mt-6 text-[#F0EDE8]/30 hover:text-[#F0EDE8]/60 transition-colors"
          aria-label="Seguir leyendo"
        >
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
