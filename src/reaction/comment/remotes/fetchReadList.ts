import { ReactionDomain } from '@reaction/types';
import axiosInstance from '@shared/axiosInstance';
import { CommentDataWithId } from '../types/data';
import type { Response } from '@shared/responseEntity';

const fetchReadList = async (domain: ReactionDomain, originId: string) => {
  const { data } = await axiosInstance<Response<CommentDataWithId[]>>({
    method: 'GET',
    url: `reaction/comment/list?domain=${domain}&originId=${originId}`
  });
  return data.responseData;
};
export default fetchReadList;
