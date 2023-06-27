import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import type { Response } from '@shared/responseEntity';

export const fetchWorkspaceInfo = async (workspaceId: string): Promise<string> => {
  try {
    const { data } = await instance<Response<string>>({
      method: 'get',
      url: '/workspace/notice',
      params: { workspaceId }
    });

    if (data.success) {
      return data.responseData;
    }
    throw new Error(data.message);
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
