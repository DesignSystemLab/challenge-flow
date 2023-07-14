import { ChallengeModifyFetchProps, FilterValues } from '@challenge/types';
import axiosInstance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchReadList = async (props: FilterValues) => {
  const { data } = await axiosInstance<Response<ChallengeModifyFetchProps[]>>({
    method: 'GET',
    url: `/challenge/list?skill=${props.skill}&title=${props.title}&hideClosed=${props.hideClosed}`
  });
  return data.responseData;
};
export default fetchReadList;
