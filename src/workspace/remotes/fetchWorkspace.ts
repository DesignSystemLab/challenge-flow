import instance from '@shared/axiosInstance';
import { Workspace } from '@workspace/types';
import { errorMessage } from '@shared/errorMessage';
import type { Response } from '@shared/responseEntity';

export const fetchWorkspaceInfo = async (workspaceId: string): Promise<Workspace> => {
  try {
    const { data } = await instance<Response<Workspace>>({
      method: 'get',
      url: '/workspace/info',
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
