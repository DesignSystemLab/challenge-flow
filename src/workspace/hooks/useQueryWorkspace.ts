import { QUREY_KEYS } from '@shared/constants/reactQueryKeys';
import { useQuery } from 'react-query';
import { fetchWorkspace } from '../remotes/fetchWorkspace';

export const useQueryWorkspace = () => {
  const { worksapace } = QUREY_KEYS;
  const { data } = useQuery(worksapace, fetchWorkspace, {
    staleTime: 10000,
    cacheTime: 20000
  });

  return { data };
};
