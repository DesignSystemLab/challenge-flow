import { useMutation } from 'react-query';
import fetchDelete from '../remotes/fetchDelete';

export const useDeleteMutation = (successAction: () => void) => {
  const { mutate } = useMutation((id: string) => fetchDelete(id), {
    onSuccess: () => successAction()
  });
  const onDelete = (id: string) => {
    mutate(id);
  };
  return { onDelete };
};
