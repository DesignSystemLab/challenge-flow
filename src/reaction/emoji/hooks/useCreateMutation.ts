import fetchCreateEmoji from '@reaction/remotes/fetchCreateEmoji';
import { CreateMutationParam } from '@reaction/types';
import { queryClient } from '@shared/queryClient';
import { useMutation } from 'react-query';

export const useCreateMutation = (originId: string, userId: string) => {
  const { mutate } = useMutation((param: CreateMutationParam) => fetchCreateEmoji(param));

  const onSubmit = (value: string) => {
    // if (userId) {
    const param = {
      emojiValue: value,
      originId,
      userId
    };
    mutate(param);
    queryClient.invalidateQueries(`emoji-${originId}`);
    // }
  };
  return { onSubmit };
};
