import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
    const res = await fetch(`${baseUrl}/api/verify-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL('/login', req.url));
  } catch (err) {
    console.error('JWT verify error in middleware:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
};
