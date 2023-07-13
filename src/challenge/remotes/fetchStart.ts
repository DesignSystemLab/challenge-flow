import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchStart = async <T>(props: T) => {
  const { data } = await axiosInstance<Response<string>>({
    method: 'POST',
    url: `/challenge/start`,
    data: props
  });

  return data.responseData;
};
export default fetchStart;
