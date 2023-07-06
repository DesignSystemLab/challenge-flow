import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchLike = async (props: { originId: string; userId: string }) => {
  const { data } = await axiosInstance<Response<string>>({
    method: 'POST',
    url: `challenge/like`,
    data: props
  });
  return data.responseData;
};
export default fetchLike;
