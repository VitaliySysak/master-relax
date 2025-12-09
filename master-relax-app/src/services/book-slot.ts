import { TBookSlotSchema } from '@/schemas/book-slot-schema';
import { axiosInstance } from './axios-instance';

export default async function bookSlot(data: TBookSlotSchema) {
  return await axiosInstance.post('/appointment/book-slot/', data);
}
