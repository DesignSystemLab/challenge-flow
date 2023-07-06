import fetchLike from '@challenge/remotes/fetchLike';
import { useMutation } from 'react-query';

export const useLikeMutation = (originId: string, userId: string, errorAction: () => void) => {
  const { mutate } = useMutation((param: { originId: string; userId: string }) => fetchLike(param), {
    onError: () => errorAction()
  });
  const toggleAction = () => {
    const param = {
      originId,
      userId
    };
    mutate(param);
  };
  return { toggleAction };
};
