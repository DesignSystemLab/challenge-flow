import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchModify = async <T>(props: T) => {
  const { data } = await axiosInstance<Response<string>>({
    method: 'PUT',
    url: `challenge/modify`,
    data: props
  });

  return data.responseData;
};
export default fetchModify;
