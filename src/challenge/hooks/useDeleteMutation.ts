import fetchDelete from '@challenge/remotes/fetchDelete';
import { useMutation } from 'react-query';

export const useDeleteMutation = (userId: string, successAction: (id: string) => void) => {
  const { mutate } = useMutation((param: { id: string; userId: string }) => fetchDelete(param), {
    onSuccess: (id: string) => successAction(id)
  });

  const deleteAction = (docId: string) => {
    mutate({
      id: docId,
      userId
    });
  };
  return { deleteAction };
};
