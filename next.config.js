/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.postimg.cc',
      'images.pexels.com',
      'i.pinimg.com',
      'majestic-halva-16882d.netlify.app',
      'vindof.com',
      'cdn.shopify.com',
      'packaged-media.redd.it',
      'encrypted-tbn0.gstatic.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ads.txt',
        destination: '/api/ads',
      },
    ];
  },
}

module.exports = nextConfig