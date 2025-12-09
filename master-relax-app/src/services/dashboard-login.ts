import { axiosInstance } from './axios-instance';
import axios from 'axios';

export default async function dashboardLogin(password: string) {
  try {
    const res = (await axiosInstance.post('/login', { password })).data;
    if (res.success) {
      window.location.href = '/dashboard';
    } else {
    }
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) alert('Wrong password');
      else {
        console.error('Error while execution dashboard-login.ts/dashboardLogin:', error);
      }
    } else {
      console.error('Error while execution dashboard-login.ts/dashboardLogin:', error);
    }
  }
}
