'use client';

import Link from 'next/link';
import { useLang } from '@/lib/language';
import { hayQuePedirPermiso, EVENTO_ABRIR_AVISO } from '@/lib/consentimiento';

/**
 * «Privacidad» y, solo si hay herramientas que piden permiso, «Cookies»
 * (que vuelve a abrir el aviso). Va en el pie de todas las páginas.
 *
 * `soloEspanol`: para las páginas que no tienen versión en inglés
 * (Dream 15, /15, /link).
 */
export default function EnlacesLegales({
  soloEspanol = false,
  className = '',
}: {
  soloEspanol?: boolean;
  className?: string;
}) {
  const { lang } = useLang();
  const en = !soloEspanol && lang === 'en';
  const estilo =
    'inline-flex items-center min-h-[44px] text-[13px] text-[#F0EDE8]/60 underline underline-offset-[3px] hover:text-[#F0EDE8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47B45] rounded-sm';
  return (
    <nav aria-label={en ? 'Legal' : 'Información legal'} className={`flex items-center justify-center gap-5 ${className}`}>
      <Link href="/privacidad" className={estilo}>
        {en ? 'Privacy' : 'Privacidad'}
      </Link>
      {hayQuePedirPermiso && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR_AVISO))}
          className={`${estilo} bg-transparent border-0 p-0 cursor-pointer`}
        >
          Cookies
        </button>
      )}
    </nav>
  );
}
