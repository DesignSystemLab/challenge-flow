import { useMutation } from 'react-query';
import fetchDelete from '../remotes/fetchDelete';

export const useDeleteMutation = (userId: string | undefined, successAction: () => void) => {
  const { mutate } = useMutation((param: { id: string; userId: string }) => fetchDelete(param), {
    onSuccess: () => {
      successAction();
    }
  });

  const deleteAction = (docId: string) => {
    if (userId) {
      const param = {
        id: docId,
        userId
      };
      mutate(param);
    }
  };
  return { deleteAction };
};
