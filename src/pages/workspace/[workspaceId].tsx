import { useMemo } from 'react';
import { workspaceMachineContext } from '@workspace/machines/workspaceMachineContext';
import { WorkspaceSidebar } from '@workspace/components/aside/WorkspaceSidebar';
import { WorkspaceMain } from '@workspace/components/main/WorkspaceMain';
import { workspaceLayout } from '@workspace/styles/layout';
import { workspaceContext } from '@workspace/workspaceContext';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import type { ContextProps } from '@workspace/types';

const WorkspacePage = (props: ContextProps) => {
  const { workspaceId, userSession } = props;
  const memoizedWorkspaceId = useMemo(() => ({ workspaceId, userSession }), [workspaceId, userSession]);
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
  const session = await getSession(context);

  return { props: { workspaceId: query.workspaceId, userSession: session }, notFound: res.statusCode === 404 };
};

export default WorkspacePage;
