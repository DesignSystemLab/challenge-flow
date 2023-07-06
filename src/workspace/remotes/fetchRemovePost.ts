import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import type { PostForm } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchRemovePost = async (
  reqParam: Pick<PostForm, 'postId' | 'turn' | 'workspaceId'>
): Promise<boolean> => {
  try {
    const { data } = await instance<Response<boolean>>({
      method: 'delete',
      url: '/workspace/post/delete',
      data: reqParam
    });
    return data.success;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
