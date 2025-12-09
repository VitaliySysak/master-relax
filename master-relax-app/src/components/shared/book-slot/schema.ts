import { z } from 'zod';

export const bookSlotSchema = z.object({
  time: z.coerce.date(),
});

export type TBookSlotSchema = z.infer<typeof bookSlotSchema>;
