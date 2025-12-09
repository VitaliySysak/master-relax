import { z } from 'zod';

export const createSlotSchema = z.object({
  reserved: z.boolean(),
  time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date string',
  }),
});

export type TCreateSlotSchema = z.infer<typeof createSlotSchema>;
