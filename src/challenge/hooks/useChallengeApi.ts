import { ChallengeAllFormValues } from '@challenge/types';
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
    const writeMutation = useMutation(({ mergedFormValues }: { mergedFormValues: ChallengeAllFormValues }) =>
      ChallengeAPI.create(mergedFormValues)
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
    const modifyMutation = useMutation(
      ({ postId, mergedFormValues }: { postId: string; mergedFormValues: ChallengeAllFormValues }) =>
        ChallengeAPI.modifyPost(postId, mergedFormValues)
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
