import instance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchDelete = async (id: string) => {
  const { data } = await instance<Response<null>>({
    method: 'post',
    url: `reaction/emoji/delete`,
    data: { id }
  });
  return data.responseData;
};
export default fetchDelete;
