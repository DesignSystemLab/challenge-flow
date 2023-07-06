import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import type { PostForm } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchUpdatePost = async (postForm: Pick<PostForm, 'postId' | 'title' | 'content'>): Promise<boolean> => {
  try {
    const { data } = await instance<Response<boolean>>({
      method: 'PUT',
      url: '/post/update',
      data: postForm
    });

    return data.success;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
