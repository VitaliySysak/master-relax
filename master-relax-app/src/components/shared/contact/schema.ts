import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2, { message: "Ім'я повинно містити хоча б 2 літери" }),
  email: z.string().optional(),
  phone: z.string().min(8, { message: 'Введіть вірний номер телефону' }),
  isPhoneContact: z.boolean(),
  message: z.string().optional(),
});

export type TContactSchema = z.infer<typeof contactSchema>;
