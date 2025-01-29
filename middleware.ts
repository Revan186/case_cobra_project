import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	// Handle preflight requests
	if (request.method === 'OPTIONS') {
		return new NextResponse(null, {
			status: 204,
			headers: {
				'Access-Control-Allow-Origin': 'https://case-cobra-official.vercel.app',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers':
					'Content-Type, Authorization, next-router-prefetch',
			},
		})
	}

	const response = NextResponse.next()

	// Handle actual requests
	response.headers.set(
		'Access-Control-Allow-Origin',
		'https://case-cobra-official.vercel.app'
	)
	response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	)
	response.headers.set(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization, next-router-prefetch'
	)

	return response
}

// Configure which paths should be handled by the middleware
export const config = {
	matcher: '/api/:path*',
}
