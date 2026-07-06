import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
