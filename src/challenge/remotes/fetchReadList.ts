import { ChallengeModifyFetchProps } from '@challenge/types';
import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchReadList = async () => {
  const { data } = await axiosInstance<Response<ChallengeModifyFetchProps[]>>({
    method: 'GET',
    url: `/challenge/list`
  });
  return data.responseData;
};
export default fetchReadList;
