import { queryClient } from '@shared/queryClient';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import fetchModify from '../remotes/fetchModify';

export const useModifyMutation = (userId: string, originId: string, successAction: () => void) => {
  const { mutate } = useMutation((value: { id: string; content: string }) => fetchModify(value), {
    onSuccess: () => {
      successAction();
      queryClient.invalidateQueries(`commentList-${originId}`);
    }
  });
  const modifyAction = async (formValues: FieldValues, commentId: string) => {
    if (formValues.comment) {
      const param = {
        id: commentId,
        content: formValues.comment
      };
      mutate(param);
    }
  };
  return { modifyAction };
};
