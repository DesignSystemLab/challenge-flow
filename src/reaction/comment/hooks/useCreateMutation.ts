import { CommentFormValues } from '@reaction/types';
import { queryClient } from '@shared/queryClient';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import fetchCreate from '../remotes/fetchCreate';

export const useCreateMutation = (userId: string, originId: string, successAction: () => void) => {
  const { mutate } = useMutation((param: CommentFormValues) => fetchCreate(param), {
    onSuccess: () => successAction()
  });

  const onSubmit = (formValues: FieldValues) => {
    if (formValues.comment) {
      const param = {
        content: formValues.comment,
        originId,
        userId
      };
      mutate(param);
      queryClient.invalidateQueries(`commentList-${originId}`);
    }
  };
  return { onSubmit };
};
