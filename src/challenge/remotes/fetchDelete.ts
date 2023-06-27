import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchDelete = async <T>(props: T) => {
  const { data } = await axiosInstance<Response<string>>({
    method: 'DELETE',
    url: `challenge/delete`,
    data: props
  });

  return data.responseData;
};
export default fetchDelete;
