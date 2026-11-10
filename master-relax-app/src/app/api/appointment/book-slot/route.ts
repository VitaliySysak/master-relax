import prisma from '../../../../../prisma/prisma-client';
import { NextResponse } from 'next/server';
import { bookSlotSchema } from '@/schemas/book-slot-schema';
import { escapeTelegramHtml, notifyOwners } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validationResult = bookSlotSchema.safeParse(json);

    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Невірні дані запису', code: 'VALIDATION_ERROR', errors: validationResult.error.flatten() },
        { status: 400 },
      );
    }

    const { phone, fullName, duration, massageType, slotId } = validationResult.data;

    const bookedSlot = await prisma.$transaction(async (transaction) => {
      const reservationResult = await transaction.appointmentSlot.updateMany({
        where: { id: slotId, reserved: false, time: { gte: new Date() } },
        data: { reserved: true, massageType },
      });

      if (reservationResult.count === 0) return null;

      const client = await transaction.client.create({
        data: {
          phone,
          fullName,
        },
      });

      return transaction.appointmentSlot.update({
        where: { id: slotId },
        data: { clientId: client.id },
      });
    });

    if (!bookedSlot) {
      return NextResponse.json(
        { message: 'Цей слот вже зайнятий іншим користувачем', code: 'SLOT_ALREADY_RESERVED' },
        { status: 400 },
      );
    }

    const slotTime = bookedSlot.time.toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });

    const clientMessage = [
      '<b>Користувач записався!</b>',
      `<b>Ім'я:</b> ${escapeTelegramHtml(fullName)}`,
      `<b>Телефон:</b> ${escapeTelegramHtml(phone)}`,
      `<b>Масаж:</b> ${escapeTelegramHtml(massageType)}`,
      `<b>Тривалість:</b> ${duration} хв`,
      `<b>Час:</b> ${slotTime}`,
    ].join('\n');

    await notifyOwners(clientMessage);

    return NextResponse.json(bookedSlot, { status: 201 });
  } catch (error) {
    console.error('Error while execution route.ts/book-slot/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
