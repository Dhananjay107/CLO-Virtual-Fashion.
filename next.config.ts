import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'closetfrontrecruiting.blob.core.windows.net',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'storagefiles.clo-set.com',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;
