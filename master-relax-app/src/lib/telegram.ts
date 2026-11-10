import axios from 'axios';

const { BOT_TOKEN, OWNER1_ID, OWNER2_ID } = process.env;

export function escapeTelegramHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function notifyOwners(messageText: string) {
  const ownerChatIds = [OWNER1_ID, OWNER2_ID];

  const deliveryResults = await Promise.allSettled(
    ownerChatIds.map((ownerChatId) =>
      axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: ownerChatId,
        text: messageText,
        parse_mode: 'HTML',
      }),
    ),
  );

  deliveryResults.forEach((deliveryResult) => {
    if (deliveryResult.status === 'rejected') {
      console.error('Error while execution telegram.ts/notifyOwners:', deliveryResult.reason);
    }
  });
}
