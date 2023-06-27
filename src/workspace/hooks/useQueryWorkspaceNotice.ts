import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { fetchWorkspaceInfo } from '@workspace/remotes/fetchWorkspaceNotice';
import { useQuery } from 'react-query';

export const useQueryWorkspaceNotice = (workspaceId: string) => {
  const { workspaceNotice } = QUREY_KEYS;
  const { data } = useQuery(workspaceNotice, () => fetchWorkspaceInfo(workspaceId));

  return { data };
};
