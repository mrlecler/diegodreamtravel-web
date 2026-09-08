/* Sitemap de diegodreamtravel.com.
 *
 * SOLO las páginas indexables. Hoy son dos: la home y /guia-orlando.
 *
 * Faltan a propósito /15, /dream15 y /link: las tres declaran
 * `robots: { index: false }` en su metadata. Listar en el sitemap algo
 * marcado noindex es una contradicción — le estás pidiendo a Google que
 * indexe una página que le dijiste que no indexe — y Search Console lo
 * reporta como error ("Página incluida en el sitemap pero bloqueada").
 * Si alguna vez una de esas tres pasa a ser indexable, sacale el
 * index:false y recién ahí agregala acá.
 *
 * Host: www, el mismo que el metadataBase de layout.tsx y el sitemap
 * declarado en robots.ts. El apex redirige 307 a www, así que listar el
 * apex mandaría a Google a un redirect en cada URL.
 */

import type { MetadataRoute } from 'next'

const BASE = 'https://www.diegodreamtravel.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/guia-orlando`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
