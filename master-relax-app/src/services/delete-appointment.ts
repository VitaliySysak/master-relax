import { axiosInstance } from './axios-instance';

export default async function deleteSlot(id: string) {
  await axiosInstance.delete('/appointment/delete-slot/' + id);
}
