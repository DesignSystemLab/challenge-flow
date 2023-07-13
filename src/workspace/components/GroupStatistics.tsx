import { useContext } from 'react';
import { useQueryWorkspace } from '@workspace/hooks/useQueryWorkspace';
import { Stack, Text } from '@jdesignlab/react';
import { WorkspaceGroupChart } from './statistics/WorkspaceGroupBarChart';
import { WorkspaceGroupPieChart } from './statistics/WorkspaceGroupPieChart';
import { WorkspaceGroupContext } from '../contexts/workspaceGroupContext';
import { workspaceGroupWrapper } from '../styles/workspaceGroupStyle';

export const GroupStatistics = () => {
  const { workspaceId } = useContext(WorkspaceGroupContext);
  const { data } = useQueryWorkspace(workspaceId);

  return (
    <div css={workspaceGroupWrapper}>
      <Text variant="heading" size="lg">
        {data?.challengeInfo.title}
      </Text>
      <Stack>
        <WorkspaceGroupChart members={data?.members} workspaceId={workspaceId} />
        <WorkspaceGroupPieChart members={data?.members} workspaceId={workspaceId} />
      </Stack>
    </div>
  );
};
