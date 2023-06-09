import { useMemberAvatars } from '@challenge/hooks/useMemberAvatars';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { Text } from '@jdesignlab/react';

export const AppliedMemberAvatars = ({
  members,
  currentUserId,
  size = 'sm'
}: {
  members: string[];
  currentUserId?: string | undefined;
  size?: 'sm' | 'md';
}) => {
  const myIndex = members.indexOf(currentUserId ?? '');
  const me = members.splice(myIndex, 1)[0];
  members.unshift(me);
  const memberAvatars = useMemberAvatars(members);

  return (
    <Layout.Row gap={2} style={{ alignItems: 'end' }}>
      {members.length > 1 ? (
        <Avatar.Group src={memberAvatars} limit={2} />
      ) : (
        <Avatar src={memberAvatars[0]} size="sm" />
      )}
      {members.length > 2 ? (
        <Text variant="paragraph" size={size} color="grey-base">
          {`+ ${members.length - 2}명 참여중!`}
        </Text>
      ) : (
        <Text variant="paragraph" size={size} color="grey-base">
          참여중!
        </Text>
      )}
    </Layout.Row>
  );
};
