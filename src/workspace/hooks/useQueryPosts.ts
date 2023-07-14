import { QUERY_KEYS } from '@shared/constants';
import { useQuery } from 'react-query';
import { fetchPosts } from '../remotes/fetchPosts';

export const useQueryPosts = (period: string, workspaceId: string) => {
  const { workspacePostsByPeriod } = QUERY_KEYS;
  const { data, refetch } = useQuery(
    [workspacePostsByPeriod, period, workspaceId],
    () => fetchPosts(period, workspaceId),
    {
      staleTime: 0,
      cacheTime: 0
    }
  );
  return { data, refetch };
};
