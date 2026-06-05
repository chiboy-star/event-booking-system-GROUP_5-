// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Grab the secure cookie
  const token = request.cookies.get('sb-access-token')?.value;

  // If there is no token and they are trying to access the dashboard, kick them to login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Only run this proxy on protected routes
export const config = {
  matcher: ['/dashboard/:path*'],
};