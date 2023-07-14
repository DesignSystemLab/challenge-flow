import { QUERY_KEYS } from '@shared/constants/reactQueryKeys';
import { fetchWorkspaceInfo } from '@workspace/remotes/fetchWorkspace';
import { useQuery } from 'react-query';

export const useQueryWorkspace = (workspaceId: string) => {
  const { workspace } = QUERY_KEYS;
  const { data, refetch } = useQuery([workspace, workspaceId], () => fetchWorkspaceInfo(workspaceId), {
    staleTime: 10000,
    cacheTime: 20000
  });

  return { data, refetch };
};
