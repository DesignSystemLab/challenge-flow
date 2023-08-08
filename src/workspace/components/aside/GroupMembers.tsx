import { useContext } from 'react';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { Text } from '@jdesignlab/react';
import { memberListStyle, memberCardStyle, profileStyle } from '../../styles/sidebarStyle';
import { useQueryWorkspace } from '../../hooks/useQueryWorkspace';
import { WorkspaceGroupContext } from '../../contexts/workspaceGroupContext';

export const GroupMembers = () => {
  const { workspaceId } = useContext(WorkspaceGroupContext);
  const { data } = useQueryWorkspace(workspaceId);

  return (
    <ul css={memberListStyle}>
      {data?.members.map((member) => (
        <li key={member.email} css={memberCardStyle}>
          <Avatar src={member.photo ?? ''} size="md" />
          <div css={profileStyle}>
            <Text variant="heading" size="md">
              {member.name}
            </Text>
            <Text variant="label" size="sm">
              {member.note ?? ''}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
};
