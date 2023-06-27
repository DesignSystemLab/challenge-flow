import { queryClient } from '@shared/queryClient';
import { useMutation } from 'react-query';
import fetchCreateEmoji from '../remotes/fetchCreateEmoji';
import { CreateMutationParam } from '../types';

export const useCreateEmoji = (originId: string, userId: string | undefined) => {
  const { mutate } = useMutation((param: CreateMutationParam) => fetchCreateEmoji(param));

  const onSubmit = (value: string) => {
    if (userId) {
      const param = {
        emojiValue: value,
        originId,
        userId
      };
      mutate(param);
      queryClient.invalidateQueries(`emoji-${originId}`);
    } else {
      alert('로그인을 해주세요');
    }
  };
  return { onSubmit };
};
