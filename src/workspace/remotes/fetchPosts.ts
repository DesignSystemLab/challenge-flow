import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import { QueryablePost } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchPosts = async (period: string, workspaceId: string): Promise<QueryablePost[]> => {
  try {
    const { data } = await instance<Response<QueryablePost[]>>({
      method: 'get',
      url: '/workspace/post/get',
      params: { period, workspaceId }
    });

    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
