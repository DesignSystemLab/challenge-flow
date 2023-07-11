import instance from '@shared/axiosInstance';
import { CommentFormData } from '../types/data';
import type { Response } from '@shared/responseEntity';

const fetchCreateComment = async (props: CommentFormData) => {
  const { data } = await instance<Response<string>>({
    method: 'post',
    url: `reaction/comment/create`,
    data: props
  });
  return data.responseData;
};
export default fetchCreateComment;
