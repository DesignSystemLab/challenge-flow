import { QUERY_KEYS } from '@shared/constants';
import { useQuery } from 'react-query';
import { fetchWorkspacePosts } from '../remotes/fetchWorkspacePosts';

export const useQueryWorkspacePosts = (workspaceId: string) => {
  const { workspacePosts } = QUERY_KEYS;
  const { data } = useQuery(workspacePosts, () => fetchWorkspacePosts(workspaceId), {
    staleTime: 20000,
    cacheTime: 10000
  });
  return { data };
};
