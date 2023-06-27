import { WorkspaceSidebar } from '@workspace/components/aside/WorkspaceSidebar';
import { workspaceLayout } from '@workspace/styles/layout';
import { GroupStatistics } from '@workspace/components/GroupStatistics';
import { Posts } from '@workspace/components/Posts';
import { workspaceMainWrapper } from '@workspace/styles/workspaceStyle';
import { Flex } from '@jdesignlab/react';
import { useRouter } from 'next/router';

const WorkspacePage = () => {
  const { query } = useRouter();
  console.log(query);
  return (
    <section css={workspaceLayout}>
      <WorkspaceSidebar />
      <div css={workspaceMainWrapper}>
        <Flex direction="column">
          <GroupStatistics />
          <Posts />
        </Flex>
      </div>
    </section>
  );
};

export default WorkspacePage;
