import { queryClient } from '@shared/queryClient';
import { useMutation } from 'react-query';
import fetchDeleteEmoji from '../remotes/fetchDeleteEmoji';

export const useDeleteEmoji = (originId: string) => {
  const { mutate } = useMutation((id: string) => fetchDeleteEmoji(id));

  const onDelete = (id: string) => {
    mutate(id);
    queryClient.invalidateQueries(`emoji-${originId}`);
  };
  return { onDelete };
};
