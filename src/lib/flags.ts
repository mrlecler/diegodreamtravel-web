// Feature flags del sitio DDT.
//
// DREAM15_LIVE: controla si Dream 15 está disponible al público.
//   false  -> todos los accesos a Dream 15 quedan BLOQUEADOS y se muestra el
//             sello "Próximamente" (nav, hero, services y footer). La landing
//             /dream15 sigue accesible por URL directa (para tu preview) pero
//             queda con noindex para que no aparezca en Google todavía.
//   true   -> reactiva todos los enlaces y oculta el sello, de una sola vez.
//
// Cuando tengas programa, costos y fechas, cambiá esto a true y listo.
export const DREAM15_LIVE = false;
