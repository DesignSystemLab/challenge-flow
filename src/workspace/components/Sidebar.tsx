import { sidebarSection, userCard, userInfo, listStyle } from '@workspace/styles/sidebarStyle';
import { titleWrapper } from '@workspace/styles/sharedStyle';
import { useQueryWorkspace } from '@workspace/hooks/useQueryWorkspace';
import { Text } from '@jdesignlab/react';
import Image from 'next/image';

export const Sidebar = () => {
  const { data } = useQueryWorkspace();

  return (
    <section css={sidebarSection}>
      <div css={titleWrapper}>
        <Text variant="heading" color="shades-white">
          그룹원
        </Text>
      </div>
      <ul css={listStyle}>
        {data?.members.map((member) => (
          <li key={member.email} css={userCard}>
            <Image
              style={{ borderRadius: '50%' }}
              width={64}
              height={64}
              src={member.photo ?? ''}
              alt={member.name ?? 'user profile image'}
            />
            <div css={userInfo}>
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
    </section>
  );
};
