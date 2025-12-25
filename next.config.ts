import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL;

    if (!demoUrl) return [];

    return [
      {
        source: '/demo',
        destination: demoUrl, 
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
