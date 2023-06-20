import { errorMessage } from '@shared/errorMessage';
import instance from '@shared/axiosInstance';
import { User } from 'firebase/auth';
import type { EamilPasswordField } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchSignInWithEmail = async ({ email, password }: EamilPasswordField): Promise<User> => {
  try {
    const { data } = await instance<Response<User>>({ method: 'post', url: '/auth/login', data: { email, password } });
    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
