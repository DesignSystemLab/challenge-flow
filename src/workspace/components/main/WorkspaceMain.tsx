import { GroupStatistics } from '@workspace/components/GroupStatistics';
import { workspaceMainWrapper } from '@workspace/styles/workspaceStyle';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';
import { Loader } from '@shared/components/suspense/Loader';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Flex } from '@jdesignlab/react';
import { TabList } from './TabList';

export const WorkspaceMain = () => (
  <div css={workspaceMainWrapper}>
    <Flex direction="column" style={{ border: '1px solid red', height: '100%' }}>
      <CompositionBoundaryReactQuery suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
        <Flex.Item flex={1} style={{ height: '50%' }}>
          <GroupStatistics />
        </Flex.Item>
      </CompositionBoundaryReactQuery>
      <CompositionBoundaryReactQuery suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
        <Flex.Item flex={1} style={{ height: '50%' }}>
          <TabList />
        </Flex.Item>
      </CompositionBoundaryReactQuery>
    </Flex>
  </div>
);
