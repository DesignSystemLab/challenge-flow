import { queryClient } from '@shared/queryClient';
import { useMutation } from 'react-query';
import fetchDelete from '../remotes/fetchDelete';

export const useDeleteMutation = (originId: string) => {
  const { mutate } = useMutation((id: string) => fetchDelete(id));

  const onDelete = (id: string) => {
    mutate(id);
    queryClient.invalidateQueries(`emoji-${originId}`);
  };
  return { onDelete };
};
