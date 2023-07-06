import { CommentFormValues } from '@reaction/types';
import instance from '@shared/axiosInstance';
import type { Response } from '@shared/responseEntity';

const fetchCreateComment = async (props: CommentFormValues) => {
  const { data } = await instance<Response<string>>({
    method: 'post',
    url: `reaction/comment/create`,
    data: props
  });
  console.log('result', data.responseData);
  return data.responseData;
};
export default fetchCreateComment;
