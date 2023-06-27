import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { fetchWorkspaceInfo } from '@workspace/remotes/fetchWorkspace';
import { useQuery } from 'react-query';

export const useQueryWorkspace = (workspaceId: string) => {
  const { worksapace } = QUREY_KEYS;
  const { data } = useQuery(worksapace, () => fetchWorkspaceInfo(workspaceId), {
    staleTime: 10000,
    cacheTime: 20000
  });

  return { data };
};
