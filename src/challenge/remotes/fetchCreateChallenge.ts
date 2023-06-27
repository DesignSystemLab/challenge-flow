import { ChallengeAllFormValues } from '@challenge/types';
import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchCreateChallenge = async (props: ChallengeAllFormValues) => {
  const { data } = await axiosInstance<Response<string>>({
    method: 'POST',
    url: `challenge/create`,
    data: props
  });
  return data.responseData;
};
export default fetchCreateChallenge;
