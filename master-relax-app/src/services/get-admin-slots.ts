import { AppointmentSlot, Client } from '@prisma/client';
import { axiosInstance } from './axios-instance';
export type AppointmentSlotWithClient = AppointmentSlot & {
  client: Client;
};

export default async function getAdminSlots(): Promise<AppointmentSlotWithClient[]> {
  try {
    return (await axiosInstance.get<AppointmentSlotWithClient[]>('/appointment/admin-available-slots')).data;
  } catch (error) {
    console.error('Error while execution get-appointments.ts/getSlots:', error);
    return [];
  }
}
