import instance from '@shared/axiosInstance';
import { EmojiFormData } from '../types/data';
import type { Response } from '@shared/responseEntity';

const fetchCreateEmoji = async (props: EmojiFormData) => {
  const { data } = await instance<Response<null>>({
    method: 'post',
    url: `reaction/emoji/create`,
    data: props
  });
  return data.responseData;
};
export default fetchCreateEmoji;
