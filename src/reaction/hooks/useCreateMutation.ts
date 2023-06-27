import fetchCreateChallenge from '@challenge/remotes/fetchCreateChallenge';
import { ChallengeAllFormValues, ChallengeFormValuesWithUserId } from '@challenge/types';
import { useMutation } from 'react-query';

export const useCreate = (userId: string, originId: string, successAction: (id: string) => void) => {
  const { mutate } = useMutation((param: ChallengeFormValuesWithUserId) => fetchCreateChallenge(param), {
    onSuccess: (id) => successAction(id)
  });
  const onSubmitCreate = (value: ChallengeAllFormValues) => {
    const param = {
      ...value,
      members: [userId],
      userId
    };
    mutate(param);
  };
  return { onSubmitCreate };
};
