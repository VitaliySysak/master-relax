import prisma from '../../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { bookSlotSchema } from '@/schemas/book-slot-schema';

const { BOT_TOKEN, OWNER1_ID, OWNER2_ID } = process.env;

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = bookSlotSchema.parse(json);

    const { phone, fullName, duration, massageType, slotId } = body;

    const client = await prisma.client.create({
      data: {
        phone,
        fullName,
      },
    });

    const appointmentSlot = await prisma.appointmentSlot.findFirst({ where: { id: slotId, reserved: false } });

    if (!appointmentSlot) {
      return new Response(
        JSON.stringify({ message: 'Цей слот вже зайнятий іншим користувачем', code: 'SLOT_ALREADY_RESERVED' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const updateAppointmentSlot = await prisma.appointmentSlot.update({
      where: {
        id: slotId,
      },
      data: { clientId: client.id, reserved: true },
    });

    const clientMessage = `
      *Користувач записався!*
      *Ім'я:* ${fullName}
      *Телефон:* ${phone}
      *Масаж:* ${massageType}
      *Тривалість:* ${duration} хв
      *Час:* ${appointmentSlot.time.toLocaleString()}
      `;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: OWNER1_ID,
      text: clientMessage,
      parse_mode: 'Markdown',
    });

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: OWNER2_ID,
      text: clientMessage,
      parse_mode: 'Markdown',
    });

    return NextResponse.json(updateAppointmentSlot, { status: 201 });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
