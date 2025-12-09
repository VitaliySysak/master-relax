import { cookies } from 'next/headers';
import prisma from '../../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const token = (await cookies()).get('auth')?.value;
    const user = verifyAuth(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const appointmentSlots = await prisma.appointmentSlot.findMany({
      where: {
        time: {
          gte: new Date(),
        },
      },
      orderBy: {
        time: 'asc',
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(appointmentSlots, { status: 200 });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
