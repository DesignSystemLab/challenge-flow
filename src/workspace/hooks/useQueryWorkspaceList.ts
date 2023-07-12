import { QUERY_KEYS } from '@shared/constants/reactQueryKeys';
import { useInfiniteQuery } from 'react-query';
import { fetchWorkspaceList } from '../remotes/fetchWorkspaceList';

export const useQueryWorkspaceList = () => {
  const { workspaceList } = QUERY_KEYS;
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    workspaceList,
    ({ pageParam = 1 }) => fetchWorkspaceList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const pageView = 10;
        const nextPage = lastPage.currentPage + 1;
        const nextItemCount = nextPage * pageView;
        return lastPage.totalCount > nextItemCount ? nextPage : undefined;
      },
      refetchOnWindowFocus: false,
      staleTime: 20000,
      cacheTime: 10000
    }
  );

  return { data, fetchNextPage, hasNextPage };
};
