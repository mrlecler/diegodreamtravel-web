import { MessageCircle } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

const WA_URL = 'https://wa.me/5493624703040';

export default function CTAClose() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F0EDE8]">
          ¿Listo para empezar a planear?
        </h2>
        <p className="text-[#F0EDE8]/55 text-lg">
          Contame a dónde querés ir y cuándo. En menos de 24 horas tenés una propuesta personalizada.
        </p>
        <GradientButton href={WA_URL} className="px-8 py-4 text-base">
          <MessageCircle size={18} />
          Hablemos por WhatsApp
        </GradientButton>
      </div>
    </section>
  );
}
