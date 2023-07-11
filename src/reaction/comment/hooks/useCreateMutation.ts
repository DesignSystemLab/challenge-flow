import { ReactionDomain } from '@reaction/types';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import fetchCreate from '../remotes/fetchCreate';
import { CommentFormData } from '../types/data';

export const useCreateMutation = (
  originId: string,
  userId: string | undefined,
  domain: ReactionDomain,
  successAction: () => void
) => {
  const { mutate } = useMutation((param: CommentFormData) => fetchCreate(param), {
    onSuccess: () => successAction()
  });

  const onSubmit = (formValues: FieldValues) => {
    if (userId && formValues.comment) {
      const param = {
        content: formValues.comment,
        originId,
        userId,
        domain
      };
      mutate(param);
    }
  };
  return { onSubmit };
};
