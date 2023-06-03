import { ChallengeFormStates } from '@challenge/types';
import { ChallengeAPI } from '@challenge/remotes';
import { useMutation, useQuery } from 'react-query';

export const useChallengeApi = () => {
  const useReadListQuery = () => {
    const readAllQuery = useQuery('challengeList', ChallengeAPI.getPostList, { suspense: true });
    return readAllQuery;
  };

  const useReadDetailQuery = (postId: string) => {
    const readDetailQuery = useQuery('challengeDetail', () => ChallengeAPI.getPostDetail(postId), { suspense: true });
    return readDetailQuery;
  };

  const useWriteMutation = () => {
    const writeMutation = useMutation(({ postValue }: { postValue: ChallengeFormStates }) =>
      ChallengeAPI.create(postValue)
    );
    return writeMutation;
  };

  const useApplyMutation = () => {
    const applyMutation = useMutation(({ postId, userId }: { postId: string; userId: string }) =>
      ChallengeAPI.applyPost(postId, userId)
    );
    return applyMutation;
  };
  const useDeleteMutation = () => {
    const applyMutation = useMutation(({ postId }: { postId: string }) => ChallengeAPI.deleteOne(postId));
    return applyMutation;
  };

  const useModifyMutation = () => {
    const modifyMutation = useMutation(({ postId, postValue }: { postId: string; postValue: ChallengeFormStates }) =>
      ChallengeAPI.modifyPost(postId, postValue)
    );
    return modifyMutation;
  };

  return {
    useReadListQuery,
    useReadDetailQuery,
    useWriteMutation,
    useApplyMutation,
    useDeleteMutation,
    useModifyMutation
  };
};
