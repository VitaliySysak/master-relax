import axios from 'axios';
import { TContactSchema } from '@/components/shared/contact/schema';

const { BOT_TOKEN, OWNER1_ID, OWNER2_ID } = process.env;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TContactSchema;
    const { fullName, email, phone, message, isPhoneContact } = body;

    const clientMessage = `
    Користувач із сату Master Relax
    Ім'я: ${fullName}
    Пошта: ${email}
    Телефон: ${phone}
    Повідомлення: ${message}
    Бажаний зв'язок: ${isPhoneContact ? 'телефон' : 'повідомлення'}
    `;

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: OWNER1_ID,
      text: clientMessage,
    });

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: OWNER2_ID,
      text: clientMessage,
    });

    return new Response(JSON.stringify('OK'), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error while execution route.ts/contact/post:', error);
    return new Response(JSON.stringify('Server Error'), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
