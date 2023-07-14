import instance from '@shared/axiosInstance';
import { errorMessage } from '@shared/errorMessage';
import { QueryableWorkspaceWithChallenge, WorkspaceOpenType } from '../types';
import type { Response } from '@shared/responseEntity';

export const fetchWorkspaceList = async (
  page: number,
  openType: WorkspaceOpenType
): Promise<QueryableWorkspaceWithChallenge> => {
  try {
    const { data } = await instance<Response<QueryableWorkspaceWithChallenge>>({
      method: 'GET',
      url: '/workspace/get',
      params: {
        page: String(page),
        openType
      }
    });

    return data.responseData;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
