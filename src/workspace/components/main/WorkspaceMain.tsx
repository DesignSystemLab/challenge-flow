import { GroupStatistics } from '@workspace/components/GroupStatistics';
import { workspaceMainWrapper, workspaceFlexItemStyle } from '@workspace/styles/workspaceStyle';
import { CommonErrorFallback } from '@shared/components/CommonErrorFallback';
import { Loader } from '@shared/components/suspense/Loader';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Flex } from '@jdesignlab/react';
import { css } from '@emotion/react';
import { TabList } from './TabList';

export const WorkspaceMain = () => (
  <div css={workspaceMainWrapper}>
    <Flex direction="column" style={{ ...css(workspaceFlexItemStyle('100%')) }}>
      <CompositionBoundaryReactQuery suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
        <Flex.Item flex={1} style={{ ...css(workspaceFlexItemStyle('50%')) }}>
          <GroupStatistics />
        </Flex.Item>
      </CompositionBoundaryReactQuery>
      <CompositionBoundaryReactQuery suspense={<Loader />} error={(prop) => <CommonErrorFallback {...prop} />}>
        <Flex.Item flex={1} style={{ ...css(workspaceFlexItemStyle('50%')) }}>
          <TabList />
        </Flex.Item>
      </CompositionBoundaryReactQuery>
    </Flex>
  </div>
);
