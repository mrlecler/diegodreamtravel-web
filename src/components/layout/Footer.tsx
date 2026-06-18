import { ExternalLink, Star } from 'lucide-react';
import SectionDivider from '@/components/ui/SectionDivider';

export default function Footer() {
  return (
    <footer className="bg-[#0C1521] pt-8 pb-10 px-6">
      <SectionDivider className="mb-8" />
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[#F0EDE8]/50 text-sm">
        <p>© {new Date().getFullYear()} Diego Dream Travel. Todos los derechos reservados.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com/diego.dreamtravel"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#F0EDE8] transition-colors"
          >
            <ExternalLink size={15} />
            @diego.dreamtravel
          </a>
          <a
            href="https://www.trustpilot.com/review/diegodreamtravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#F0EDE8] transition-colors"
          >
            <Star size={15} />
            Trustpilot
          </a>
        </div>
      </div>
    </footer>
  );
}
