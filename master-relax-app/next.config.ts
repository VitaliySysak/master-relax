import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
      },
    ];
  },
};

export default nextConfig;
