'use client';

import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { eventoWhatsApp } from '@/lib/medicion';

/**
 * Vercel Web Analytics (visitas, sin cookies) + el evento «WhatsApp».
 *
 * En vez de tocar cada botón de WhatsApp (Hero, NavIsland, Footer,
 * Services, AboutDiego, CTAClose, LinkBio, /dream15…), un solo escucha en
 * todo el documento detecta cualquier toque a un link de wa.me. Así
 * también quedan medidos los que se agreguen después.
 */
export default function Medicion() {
  useEffect(() => {
    function alTocar(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (/^https?:\/\/(api\.)?wa\.me\//i.test(href) || /^https?:\/\/(api|web)\.whatsapp\.com\//i.test(href)) {
        eventoWhatsApp();
      }
    }
    // Fase de captura: se registra aunque otro manejador corte la propagación.
    document.addEventListener('click', alTocar, true);
    return () => document.removeEventListener('click', alTocar, true);
  }, []);

  return <Analytics />;
}
