import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchCreatePost } from '../remotes/fetchCreatePost';
import type { PostForm } from '../types';

export const useCreatePost = (successAction: () => void) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading } = useMutation((postForm: Omit<PostForm, 'postId'>) => fetchCreatePost(postForm), {
    onError: (error) => {
      showBoundary(error);
    },
    onSuccess: () => {
      successAction();
    }
  });

  return { mutate, isLoading };
};
