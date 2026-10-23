import type { NextConfig } from 'next';

// Headers de seguridad para todo el sitio. HSTS ya lo pone Vercel.
// No hay CSP de script-src a propósito: sin probarla a fondo rompe cosas.
// frame-ancestors/X-Frame-Options: ninguna página se embebe en otro sitio,
// y los formularios no tienen que poder meterse en un iframe ajeno.
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        // La bio de Instagram y otros lugares ya comparten /link.html.
        // Lo mandamos a la página nueva (/link) sin que Diego tenga que
        // cambiar el link en ningún lado.
        source: '/link.html',
        destination: '/link',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.diegodreamtravel.com',
      },
    ],
  },
};

export default nextConfig;
