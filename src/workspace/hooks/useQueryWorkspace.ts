import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { fetchWorkspaceInfo } from '@workspace/remotes/fetchWorkspace';
import { useQuery } from 'react-query';

export const useQueryWorkspace = () => {
  const { worksapace } = QUREY_KEYS;
  const { data } = useQuery(worksapace, fetchWorkspaceInfo, {
    staleTime: 10000,
    cacheTime: 20000
  });

  return { data };
};
