import { NextRequest, NextResponse } from 'next/server';

/**
 * Security middleware for API routes
 * - Validates request origin for POST/PUT/DELETE requests
 * - Prevents CSRF attacks from malicious cross-origin requests
 */

const ALLOWED_ORIGINS = [
  'https://www.pullse.ai',
  'https://pullse.ai',
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean) as string[];

export function middleware(request: NextRequest) {
  // Only check POST/PUT/DELETE requests to API routes
  if (
    request.nextUrl.pathname.startsWith('/api/') &&
    ['POST', 'PUT', 'DELETE'].includes(request.method)
  ) {
    const origin = request.headers.get('origin');

    // In production, validate origin if present
    // Note: Some legitimate requests (server-to-server, curl) may not have an origin header
    if (process.env.NODE_ENV === 'production' && origin) {
      if (!ALLOWED_ORIGINS.includes(origin)) {
        return NextResponse.json(
          { error: { code: 'FORBIDDEN', message: 'Invalid origin' } },
          { status: 403 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
