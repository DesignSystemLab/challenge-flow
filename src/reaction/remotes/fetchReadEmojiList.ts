import instance from '@shared/axiosInstance';
import { EmojiDataWithId } from '../types';
import type { Response } from '@shared/responseEntity';

const fetchReadCommentList = async ({ originId }: { originId: string }) => {
  const { data } = await instance<Response<EmojiDataWithId[]>>({
    method: 'get',
    url: `reaction/emoji/getList?originId=${originId}`
  });
  return data.responseData;
};
export default fetchReadCommentList;
