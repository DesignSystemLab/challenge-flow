import fetchStart from '@challenge/remotes/fetchStart';
import { useMutation } from 'react-query';

export const useStartMutation = (successAction: () => void) => {
  const { mutate } = useMutation((param: { id: string }) => fetchStart(param), {
    onSuccess: () => successAction()
  });
  const startAction = (docId: string) => {
    mutate({ id: docId });
  };
  return { startAction };
};
