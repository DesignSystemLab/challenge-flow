import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import { Post } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchPosts = async (period: string, workspaceId: string): Promise<Post[]> => {
  try {
    const { data } = await instance<Response<Post[]>>({
      method: 'get',
      url: '/workspace/post/get',
      params: { period, workspaceId }
    });

    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
