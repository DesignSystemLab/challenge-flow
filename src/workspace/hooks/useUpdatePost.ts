import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchUpdatePost } from '../remotes/fetchUpdatePost';
import type { PostForm } from '../types';

export const useUpdatePost = (successAction: () => void) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading } = useMutation(
    (postForm: Pick<PostForm, 'postId' | 'content' | 'title'>) => fetchUpdatePost(postForm),
    {
      onError: (error) => {
        showBoundary(error);
      },
      onSuccess: () => {
        successAction();
      }
    }
  );
  return { mutate, isLoading };
};
