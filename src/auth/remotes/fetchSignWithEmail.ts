import { errorMessage } from '@shared/errorMessage';
import instance from '@shared/axiosInstance';
import type { EamilPasswordField, UserSession } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchSignInWithEmail = async ({ email, password }: EamilPasswordField): Promise<UserSession> => {
  try {
    const { data } = await instance<Response<UserSession>>({
      method: 'post',
      url: '/auth/login',
      data: { email, password }
    });
    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
