import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchRemovePost } from '../remotes/fetchRemovePost';
import type { PostForm } from '../types';

export const useRemovePost = (onSuccess: () => void) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading } = useMutation(
    (param: Pick<PostForm, 'postId' | 'turn' | 'workspaceId'>) => fetchRemovePost(param),
    {
      onSuccess,
      onError: (error) => {
        showBoundary(error);
      }
    }
  );

  return { mutate, isLoading };
};
