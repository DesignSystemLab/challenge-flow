import fetchModify from '@challenge/remotes/fetchModify';
import { ChallengeAllFormValues, ChallengeFormModifyParams } from '@challenge/types';
import { useMutation } from 'react-query';

export const useModifyMutation = (userId: string, successAction: (id: string) => void) => {
  const { mutate } = useMutation((param: ChallengeFormModifyParams) => fetchModify(param), {
    onSuccess: (id: string) => successAction(id)
  });

  const onSubmitModify = (docId: string, value: ChallengeAllFormValues) => {
    const param = {
      ...value,
      userId,
      id: docId
    };
    mutate(param);
  };
  return { onSubmitModify };
};
