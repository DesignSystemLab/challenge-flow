import { useContext } from 'react';
import Image from 'next/image';
import { Text } from '@jdesignlab/react';
import { memberListStyle, memeberCardStyle, profileStyle } from '../../styles/sidebarStyle';
import { useQueryWorkspace } from '../../hooks/useQueryWorkspace';
import { workspaceContext } from '../../workspaceContext';

export const GroupMemebers = () => {
  const { workspaceId } = useContext(workspaceContext);
  const { data } = useQueryWorkspace(workspaceId);

  return (
    <ul css={memberListStyle}>
      {data?.members.map((member) => (
        <li key={member.email} css={memeberCardStyle}>
          <Image
            style={{ borderRadius: '50%' }}
            width={64}
            height={64}
            src={member.photo ?? ''}
            alt={member.name ?? 'user profile image'}
          />
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