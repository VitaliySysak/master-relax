import { z } from 'zod';

export const bookSlotSchema = z.object({
  fullName: z.string().min(2, { message: "Ім'я повинно містити хоча б 2 літери" }),
  phone: z.string().min(8, { message: 'Введіть вірний номер телефону' }),
  time: z.string().nonempty('Оберіть час'),
  massageType: z.string().min(1, 'Не вибрано массаж'),
  duration: z.coerce.number(),
  slotId: z.string().nonempty('Не вибрано слот'),
});

export type TBookSlotSchema = z.infer<typeof bookSlotSchema>;
