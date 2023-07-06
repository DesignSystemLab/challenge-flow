import { CommentFields } from '@reaction/types';
import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchReadList = async (originId: string) => {
  const { data } = await axiosInstance<Response<CommentFields[]>>({
    method: 'GET',
    url: `reaction/comment/list?originId=${originId}`
  });
  return data.responseData;
};
export default fetchReadList;
