import { QUREY_KEYS } from '@shared/constants';
import { useQuery } from 'react-query';
import { fetchPosts } from '../remotes/fetchPosts';

export const useQueryPosts = (period: string, workspaceId: string) => {
  const { workspacePosts } = QUREY_KEYS;
  const { data } = useQuery([workspacePosts, period], () => fetchPosts(period, workspaceId), {
    staleTime: 0,
    cacheTime: 0
  });
  return { data };
};
