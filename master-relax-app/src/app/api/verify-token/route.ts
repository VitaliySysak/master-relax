import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in verify-token API:', error);
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
