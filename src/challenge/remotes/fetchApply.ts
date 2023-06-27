import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchApply = async <T>(props: T) => {
  const { data } = await axiosInstance<Response<string>>({
    method: 'PATCH',
    url: `challenge/apply`,
    data: props
  });

  return data.responseData;
};
export default fetchApply;
