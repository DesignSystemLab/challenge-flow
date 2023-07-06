import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchReadDetail = async (id: string) => {
  const { data } = await axiosInstance<Response<any>>({
    method: 'GET',
    url: `challenge/detail`,
    data: id
  });
  return data.responseData;
};
export default fetchReadDetail;
