import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: ["utfs.io"],
		
	},
	reactStrictMode: false,
	typescript: {
		// !! WARN !!
		// This will disable type checking during builds
		ignoreBuildErrors: true,
	},
}

export default nextConfig
