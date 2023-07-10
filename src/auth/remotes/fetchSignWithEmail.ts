import { errorMessage } from '@shared/errorMessage';
import instance from '@shared/axiosInstance';
import type { EmailPasswordField, UserSession } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchSignInWithEmail = async ({ email, password }: EmailPasswordField): Promise<UserSession> => {
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
