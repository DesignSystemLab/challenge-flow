import { Select, Flex } from '@jdesignlab/react';
import { workspaceFilterStyle } from '../styles/workspaceListStyle';
import type { WorkspaceOpenType } from '../types';

interface Props {
  handleChangeOpenType: (value: WorkspaceOpenType) => void;
}
export const WorkspaceSearchFilter = ({ handleChangeOpenType }: Props) => (
  <Flex gap={16} css={workspaceFilterStyle}>
    <Select
      defaultValue="all"
      onValueChange={(value) => {
        handleChangeOpenType(value as WorkspaceOpenType);
      }}
    >
      <Select.Trigger placeholder="opentype" />
      <Select.Option value="all">전체</Select.Option>
      <Select.Option value="public">공개</Select.Option>
      <Select.Option value="private">비공개</Select.Option>
    </Select>
  </Flex>
);
