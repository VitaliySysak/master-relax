import prisma from '../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const massages = await prisma.massage.findMany({orderBy: {id: "asc"}});

    return NextResponse.json(massages, { status: 200 });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
