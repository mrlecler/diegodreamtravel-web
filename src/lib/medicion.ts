/**
 * Eventos propios de Vercel Web Analytics.
 *
 * Cada evento lleva UNA sola propiedad, `pagina` (la ruta donde pasó).
 * Nunca se manda nada que la persona escribió: ni nombre, ni email, ni
 * WhatsApp, ni edad. Web Analytics no usa cookies.
 */
import { track } from '@vercel/analytics';

function pagina(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}

/** Tocó un botón o link que va a wa.me (lo dispara components/Medicion.tsx). */
export function eventoWhatsApp() {
  track('WhatsApp', { pagina: pagina() });
}

/** Un formulario se envió bien. Llamar SOLO cuando el envío funcionó. */
export function eventoFormularioEnviado() {
  track('Formulario enviado', { pagina: pagina() });
}
