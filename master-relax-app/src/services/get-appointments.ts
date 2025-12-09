import { AppointmentSlot } from '@prisma/client';
import { axiosInstance } from './axios-instance';

export default async function getSlots(): Promise<AppointmentSlot[]> {
  try {
    return (await axiosInstance.get<AppointmentSlot[]>('/appointment/available-slots')).data;
  } catch (error) {
    console.error('Error while execution get-appointments.ts/getSlots:', error);
    return [];
  }
}
