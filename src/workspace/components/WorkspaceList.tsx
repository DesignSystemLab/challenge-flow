import { useEffect } from 'react';
import { Loader } from '@shared/components/suspense/Loader';
import { useInView } from 'react-intersection-observer';
import { WorkspaceItem } from './WorkspaceItem';
import { useQueryWorkspaceList } from '../hooks/useQueryWorkspaceList';
import { workspaceListStyle } from '../styles/workspaceListStyle';
import type { QueryableWorkspaceWithChallenge } from '../types';

export const WorkspaceList = () => {
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage } = useQueryWorkspaceList();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <ol css={workspaceListStyle}>
      {data?.pages.map((page: QueryableWorkspaceWithChallenge) =>
        page.workspaceList.map((workspace) => <WorkspaceItem workspaceItem={workspace} />)
      )}
      {hasNextPage && (
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </ol>
  );
};
