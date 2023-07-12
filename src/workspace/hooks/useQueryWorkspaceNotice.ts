import { QUERY_KEYS } from '@shared/constants/reactQueryKeys';
import { fetchWorkspaceInfo } from '@workspace/remotes/fetchWorkspaceNotice';
import { useQuery } from 'react-query';

export const useQueryWorkspaceNotice = (workspaceId: string) => {
  const { workspaceNotice } = QUERY_KEYS;
  const { data } = useQuery(workspaceNotice, () => fetchWorkspaceInfo(workspaceId));

  return { data };
};
