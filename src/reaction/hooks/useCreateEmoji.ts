import { queryClient } from '@shared/queryClient';
import { useMutation } from 'react-query';
import fetchCreateEmoji from '../remotes/fetchCreateEmoji';
import { CreateMutationParam } from '../types';

export const useCreateEmoji = (originId: string, userId: string) => {
  const { mutate } = useMutation((param: CreateMutationParam) => fetchCreateEmoji(param));

  const onSubmit = (value: string) => {
    const param = {
      emojiValue: value,
      originId,
      userId
    };
    mutate(param);
    queryClient.invalidateQueries(`emoji-${originId}`);
  };
  return { onSubmit };
};
