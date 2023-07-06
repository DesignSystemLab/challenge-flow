import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import type { Response } from '@shared/responseEntity';
import type { PostForm } from '../types';

export const fetchCreatePost = async (postForm: Omit<PostForm, 'postId'>): Promise<boolean> => {
  try {
    const { data } = await instance<Response<boolean>>({
      method: 'post',
      url: '/workspace/post/create',
      data: postForm
    });
    return data.success;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
