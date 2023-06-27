import fetchApply from '@challenge/remotes/fetchApply';
import { useMutation } from 'react-query';

export const useApplyMutation = (userId: string, successAction: () => void) => {
  const { mutate } = useMutation((param: { id: string; userId: string }) => fetchApply(param), {
    onSuccess: () => successAction()
  });
  const applyAction = (docId: string) => {
    mutate({
      id: docId,
      userId
    });
  };
  return { applyAction };
};
