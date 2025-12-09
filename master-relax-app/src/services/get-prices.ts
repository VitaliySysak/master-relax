import { Massage } from '@prisma/client';
import { axiosInstance } from './axios-instance';

export default async function getMassages(): Promise<Massage[]> {
  return (await axiosInstance.get<Massage[]>('/massages')).data;
}
