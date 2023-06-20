import instance from '@shared/axiosInstance';
import { CreateMutationParam } from '../types';
import type { Response } from '@shared/responseEntity';

const fetchCreateEmoji = async (props: CreateMutationParam) => {
  const { data } = await instance<Response<null>>({
    method: 'post',
    url: `reaction/emoji/create`,
    data: props
  });
  return data.responseData;
};
export default fetchCreateEmoji;
