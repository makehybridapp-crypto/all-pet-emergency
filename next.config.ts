import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'twilight-shape-6c41.appaipet.workers.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
