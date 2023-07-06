import { queryClient } from '@shared/queryClient';
import { useMutation } from 'react-query';
import fetchDelete from '../remotes/fetchDelete';

export const useDeleteMutation = (userId: string, originId: string, successAction: () => void) => {
  const { mutate } = useMutation((param: { id: string; userId: string }) => fetchDelete(param), {
    onSuccess: () => {
      successAction();
      queryClient.invalidateQueries(`commentList-${originId}`);
    }
  });

  const deleteAction = (docId: string) => {
    mutate({
      id: docId,
      userId
    });
  };
  return { deleteAction };
};
