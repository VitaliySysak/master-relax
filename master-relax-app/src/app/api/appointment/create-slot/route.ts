import { createSlotSchema } from '@/components/shared/dashboard/schema';
import prisma from '../../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get('auth')?.value;
    const user = verifyAuth(token);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const json = await request.json();
    const body = createSlotSchema.parse(json);

    const appointmentSlot = await prisma.appointmentSlot.create({
      data: {
        reserved: body.reserved,
        time: body.time,
      },
    });

    return NextResponse.json(appointmentSlot, { status: 201 });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
