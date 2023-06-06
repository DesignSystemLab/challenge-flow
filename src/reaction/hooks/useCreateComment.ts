import { queryClient } from '@shared/queryClient';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { useMutation } from 'react-query';
import fetchCreateComment from '../remotes/fetchCreateComment';
import { CommentFormValues } from '../types';

export const useCreateComment = (originId: string, reset: UseFormReset<FieldValues>) => {
  const { mutate } = useMutation((value: CommentFormValues) => fetchCreateComment(value));

  const onSubmit = (formValues: FieldValues) => {
    if (formValues.comment) {
      const param = {
        content: formValues.comment,
        originId,
        userId: 'user1234'
      };
      reset();
      mutate(param);
      queryClient.invalidateQueries(`comment-${originId}`);
    }
  };
  return { onSubmit };
};
