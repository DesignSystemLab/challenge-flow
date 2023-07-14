import { useEffect } from 'react';
import { Loader } from '@shared/components/suspense/Loader';
import { Empty } from '@shared/components/Empty';
import { useInView } from 'react-intersection-observer';
import { WorkspaceItem } from './WorkspaceItem';
import { useQueryWorkspaceList } from '../hooks/useQueryWorkspaceList';
import { workspaceListStyle } from '../styles/workspaceListStyle';
import type { QueryableWorkspaceWithChallenge, WorkspaceOpenType } from '../types';

interface Props {
  openType: WorkspaceOpenType;
}
export const WorkspaceList = ({ openType }: Props) => {
  const [ref, inView] = useInView();
  const { data, fetchNextPage, hasNextPage } = useQueryWorkspaceList(openType);
  const hasList = data?.pages[0].workspaceList.length;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (!hasList) {
    return <Empty />;
  }

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
