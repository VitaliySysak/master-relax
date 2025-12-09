import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.DASHBOARD_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET!, {
      expiresIn: '2h',
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set('auth', token, {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 2 * 60 * 60,
    });

    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
