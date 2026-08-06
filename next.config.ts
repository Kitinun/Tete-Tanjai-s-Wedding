import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tetetanjaiwedding.my.canva.site',
      },
    ],
  },
};

export default nextConfig;
