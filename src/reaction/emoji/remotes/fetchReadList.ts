import { ReactionDomain } from '@reaction/types';
import instance from '@shared/axiosInstance';
import { EmojiDataWithId } from '../types/data';
import type { Response } from '@shared/responseEntity';

const fetchReadList = async (domain: ReactionDomain, originId: string) => {
  const { data } = await instance<Response<EmojiDataWithId[]>>({
    method: 'get',
    url: `reaction/emoji/getList?domain=${domain}&originId=${originId}`
  });
  return data.responseData;
};
export default fetchReadList;
