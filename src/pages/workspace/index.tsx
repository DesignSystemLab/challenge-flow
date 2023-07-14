import { useState } from 'react';
import { WorkspaceList } from '@workspace/components/WorkspaceList';
import { QUERY_KEYS } from '@shared/constants';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { WorkspaceError } from '@workspace/components/WorkspaceError';
import { WorkspaceSearchFilter } from '@workspace/components/WorkspaceSearchFilter';
import { Loader } from '@shared/components/suspense/Loader';
import { QueryClient, dehydrate } from 'react-query';
import { GetServerSideProps } from 'next';
import type { WorkspaceOpenType } from '@workspace/types';

const WorkspacePage = () => {
  const [openType, setOpenType] = useState<WorkspaceOpenType>('all');

  return (
    <section>
      <WorkspaceSearchFilter handleChangeOpenType={setOpenType} />
      <CompositionBoundaryReactQuery error={(errorProps) => <WorkspaceError {...errorProps} />} suspense={<Loader />}>
        <WorkspaceList openType={openType} />
      </CompositionBoundaryReactQuery>
    </section>
  );
};
export default WorkspacePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { workspaceList } = QUERY_KEYS;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(workspaceList);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
