import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/auth/[kindeAuth]",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://case-cobra-official.vercel.app", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "next-router-prefetch",
          },
        ],
      },
    ];
  },
	images: {
		domains: ["ufs.sh", "utfs.io", 'f83u96zfqk.ufs.sh'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	},
	reactStrictMode: false,
	typescript: {
		// !! WARN !!
		// This will disable type checking during builds
		ignoreBuildErrors: true,
	},
}

export default nextConfig
