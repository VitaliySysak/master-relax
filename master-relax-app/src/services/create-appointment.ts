import { TCreateSlotSchema } from '../components/shared/dashboard/schema';
import { axiosInstance } from './axios-instance';

export default async function createSlot(data: TCreateSlotSchema) {
  const time = new Date(data.time);
  await axiosInstance.post('/appointment/create-slot', { reserved: data.reserved, time });
}
