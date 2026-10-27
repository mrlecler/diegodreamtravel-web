'use client';

import Link from 'next/link';
import { useLang } from '@/lib/language';

/** «Al enviar aceptas la Política de privacidad», abajo del botón de cada formulario. */
export default function AceptoPrivacidad({ soloEspanol = false }: { soloEspanol?: boolean }) {
  const { lang } = useLang();
  const en = !soloEspanol && lang === 'en';
  return (
    <p className="text-center text-[16px] sm:text-[13px] leading-snug text-[rgba(240,237,232,.55)]">
      {en ? 'By sending, you accept the ' : 'Al enviar aceptas la '}
      <Link
        href="/privacidad"
        className="text-[#F0EDE8] underline underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47B45] rounded-sm"
      >
        {en ? 'Privacy policy' : 'Política de privacidad'}
      </Link>
      .
    </p>
  );
}
