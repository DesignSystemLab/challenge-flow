import { queryClient } from '@shared/queryClient';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import fetchUpdateComment from '../remotes/fetchUpdateComment';

export const useUpdateComment = (
  originId: string,
  setEditMode: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const { mutate } = useMutation((value: { id: string; content: string }) => fetchUpdateComment(value));
  const onUpdateComment = async (formValues: FieldValues, commentId: string) => {
    if (formValues.comment) {
      const param = {
        id: commentId,
        content: formValues.comment
      };
      mutate(param);
      queryClient.invalidateQueries(`comment-${originId}`);
      setEditMode(null);
    }
  };
  return { onUpdateComment };
};
