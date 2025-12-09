import { TContactSchema } from '../components/shared/contact/schema';
import { axiosInstance } from './axios-instance';

export default async function sendMessage(data: TContactSchema) {
  await axiosInstance.post('/contact', data);
}
