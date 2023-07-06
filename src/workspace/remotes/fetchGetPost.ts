import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import { Post } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchGetPost = async (postId: string): Promise<Post> => {
  try {
    const { data } = await instance<Response<Post>>({
      method: 'get',
      url: '/post/get',
      params: { postId }
    });
    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
