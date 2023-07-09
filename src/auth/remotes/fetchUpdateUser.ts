import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import type { Response } from '@shared/responseEntity';
import type { UserProfile } from '../types';

interface ReqeustParams {
  uid?: string;
  withCreate?: boolean;
  profile: Omit<UserProfile, 'uid' | 'challenges' | 'email'>;
}

export const fetchUpdateUser = async (params: ReqeustParams): Promise<boolean> => {
  try {
    const { uid, profile } = params;
    const { data } = await instance<Response<boolean>>({
      method: 'PUT',
      url: '/auth/user/update',
      data: { uid, ...profile }
    });
    return data.success;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
