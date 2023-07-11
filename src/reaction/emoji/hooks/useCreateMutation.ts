import { useMutation } from 'react-query';
import fetchCreate from '../remotes/fetchCreate';
import { EmojiFormData } from '../types/data';

export const useCreateMutation = (originId: string, userId: string | undefined, successAction: () => void) => {
  const { mutate } = useMutation((param: EmojiFormData) => fetchCreate(param), {
    onSuccess: () => successAction()
  });

  const onSubmit = (value: string) => {
    if (userId) {
      const param = {
        emoji: value,
        originId,
        userId
      };
      mutate(param);
    }
  };
  return { onSubmit };
};
