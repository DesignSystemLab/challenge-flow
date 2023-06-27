import { useMemo } from 'react';
import { workspaceMachineContext } from '@workspace/machines/workspaceMachineContext';
import { WorkspaceSidebar } from '@workspace/components/aside/WorkspaceSidebar';
import { WorkspaceMain } from '@workspace/components/main/WorkspaceMain';
import { workspaceLayout } from '@workspace/styles/layout';
import { workspaceContext } from '@workspace/workspaceContext';
import { GetServerSideProps } from 'next';

interface Props {
  workspaceId: string;
}

const WorkspacePage = (props: Props) => {
  const { workspaceId } = props;
  const memoizedWorkspaceId = useMemo(() => ({ workspaceId }), [workspaceId]);
  return (
    <workspaceMachineContext.Provider>
      <workspaceContext.Provider value={memoizedWorkspaceId}>
        <section css={workspaceLayout}>
          <WorkspaceSidebar />
          <WorkspaceMain />
        </section>
      </workspaceContext.Provider>
    </workspaceMachineContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, res } = context;
  return { props: { workspaceId: query.workspaceId }, notFound: res.statusCode === 404 };
};

export default WorkspacePage;
