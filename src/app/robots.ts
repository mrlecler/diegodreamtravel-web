/* robots.txt de diegodreamtravel.com — la web de marketing.
 *
 * Acá sí queremos que entren: es el sitio público. Permitimos todo y
 * declaramos el sitemap.
 *
 * El bloqueo página por página lo hace el `robots: { index: false }` de
 * cada page.tsx (/15, /dream15, /link), no este archivo. Un Disallow
 * acá sería contraproducente: impediría el rastreo, y una página que no
 * se rastrea es una página cuyo noindex Google nunca llega a leer.
 *
 * El canónico es www, no el apex: el apex redirige 307 a www y todos
 * los openGraph.url del sitio ya usan www. Mismo host en el sitemap y
 * en el metadataBase de layout.tsx.
 *
 * Ojo: este es el proyecto diegodreamtravel-web. El SGI
 * (app.diegodreamtravel.com) es otro repo y otro proyecto de Vercel, y
 * ahí el robots.txt es al revés: Disallow total salvo /link.
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://www.diegodreamtravel.com/sitemap.xml',
  }
}
