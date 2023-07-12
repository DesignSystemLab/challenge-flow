import { QUERY_KEYS } from '@shared/constants';
import { useQuery } from 'react-query';
import { fetchGetPost } from '../remotes/fetchGetPost';

export const useQueryPost = (postId: string) => {
  const { post } = QUERY_KEYS;
  const { data } = useQuery([post, postId], () => fetchGetPost(postId), {
    staleTime: 10000,
    cacheTime: 20000
  });
  return { data };
};
