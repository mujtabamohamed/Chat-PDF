import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
