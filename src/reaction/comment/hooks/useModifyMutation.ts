import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import fetchModify from '../remotes/fetchModify';

export const useModifyMutation = (userId: string | undefined, successAction: () => void) => {
  const { mutate } = useMutation((value: { id: string; content: string }) => fetchModify(value), {
    onSuccess: () => {
      successAction();
    }
  });
  const modifyAction = async (formValues: FieldValues, commentId: string) => {
    if (userId && formValues.comment) {
      const param = {
        id: commentId,
        content: formValues.comment
      };
      mutate(param);
    }
  };
  return { modifyAction };
};
