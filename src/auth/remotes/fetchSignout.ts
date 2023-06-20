import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';

export const fetchSignout = async () => {
  try {
    await instance({ method: 'post', url: '/auth/logout' });
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
