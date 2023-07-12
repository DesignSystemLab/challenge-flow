import { ChallengeModifyFetchProps } from '@challenge/types';
import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchReadDetail = async (id: string) => {
  const { data } = await axiosInstance<Response<ChallengeModifyFetchProps>>({
    method: 'GET',
    url: `/challenge/detail?id=${id}`
  });
  return data.responseData;
};
export default fetchReadDetail;
