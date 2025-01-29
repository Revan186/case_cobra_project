import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
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
