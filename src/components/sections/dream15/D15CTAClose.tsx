import { MessageCircle } from 'lucide-react';

const WA_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '5493624703040'}?text=${encodeURIComponent('Hola Diego, quiero saber más sobre Dream 15.')}`;

export default function D15CTAClose() {
  return (
    <section className="py-20 px-6">
      {/* Regla de hover para el glow WhatsApp */}
      <style>{`
        .btn-wa-glow {
          background: #25D366;
          box-shadow: 0 0 20px rgba(37,211,102,0.3);
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .btn-wa-glow:hover {
          box-shadow: 0 0 36px rgba(37,211,102,0.55);
          transform: scale(1.02);
        }
        .btn-wa-glow:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8]">
          ¿Tu quinceañera merece el{' '}
          <span
            style={{
              background: 'var(--grad-quince)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            viaje de su vida?
          </span>
        </h2>
        <p className="text-[#F0EDE8]/55 text-lg">
          Hablemos y lo hacemos realidad. Sin compromisos.
        </p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa-glow inline-flex items-center gap-2.5 rounded-full px-8 py-4 font-semibold text-white text-base"
        >
          <MessageCircle size={20} />
          Hablá con Diego por WhatsApp
        </a>
      </div>
    </section>
  );
}
