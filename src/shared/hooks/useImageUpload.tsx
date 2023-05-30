import { useErrorBoundary } from 'react-error-boundary';
import { useMutation } from 'react-query';
import { fetchUploadImage } from '../remotes/fetchUploadImage';

export const useImageUpload = (uid: string) => {
  const { showBoundary } = useErrorBoundary();
  const { mutate, isLoading, data } = useMutation((file: File) => fetchUploadImage(uid, file), {
    onError: (error) => {
      showBoundary(error);
    }
  });
  return { mutate, isLoading, data };
};
