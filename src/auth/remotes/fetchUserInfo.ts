import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import { UserProfile } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchUserInfo = async (uid: string): Promise<UserProfile> => {
  try {
    console.log('uid', uid);

    const { data } = await instance<Response<UserProfile>>({
      method: 'GET',
      url: '/auth/user/get',
      params: { uid }
    });

    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
