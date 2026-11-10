import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get('auth')?.value;
  const authPayload = verifyAuth(authToken);

  if (!authPayload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
