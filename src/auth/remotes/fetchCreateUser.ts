import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import type { Response } from '@shared/responseEntity';
import type { UserProfile } from '../types';

interface ReqeustParams {
  uid: string;
  profile: Partial<Omit<UserProfile, 'uid'>>;
}

export const fetchCreateUser = async (params: ReqeustParams): Promise<boolean> => {
  try {
    const { uid, profile } = params;
    const { data } = await instance<Response<boolean>>({
      method: 'POST',
      url: '/auth/user/create',
      data: { uid, ...profile }
    });
    return data.success;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
