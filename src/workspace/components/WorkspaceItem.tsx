import { Avatar } from '@shared/components/dataDisplay/Avatar';
import { SKILLS } from '@shared/constants';
import { useRouter } from 'next/router';
import { Card, Text, Stack } from '@jdesignlab/react';
import { File } from '@jdesignlab/react-icons';
import { workspaceCardStyle, workspacePostSummaryStyle, workspacePostEmptyStyle } from '../styles/workspaceListStyle';
import type { WorkspaceWithChallenge, Post } from '../types';

interface Props {
  workspaceItem: WorkspaceWithChallenge;
}

const PostSummary = ({ title }: Post) => (
  <li>
    <Stack>
      <File width={16} height={16} fill="#f8a5c2" />
      <Text variant="label" size="sm">
        {title}
      </Text>
    </Stack>
  </li>
);

const EmptyPost = () => (
  <div css={workspacePostEmptyStyle}>
    <Text variant="label">&#128576; 작성된 글이 없어요.</Text>
  </div>
);

export const WorkspaceItem = ({ workspaceItem }: Props) => {
  const { workspaceId, master, posts, challengeInfo, members } = workspaceItem;
  const router = useRouter();

  const memberProfile: string[] = members.map((member) => (member && member.photo) ?? '');
  const workspaceMasterInfo = master.name ?? master.email;

  const moveToWorkspace = (path: string) => {
    router.push(path);
  };

  return (
    <li key={workspaceId}>
      <Card
        css={workspaceCardStyle}
        onClick={() => {
          moveToWorkspace(`/workspace/${workspaceId}`);
        }}
      >
        <Card.Header>
          <Text variant="heading">{`${workspaceMasterInfo}의 Workpsace`}</Text>
        </Card.Header>
        <Card.Body css={{ width: '100%' }}>
          {posts.length ? (
            <ol css={workspacePostSummaryStyle}>
              {posts.map((post) => (
                <PostSummary {...post} />
              ))}
            </ol>
          ) : (
            <EmptyPost />
          )}
        </Card.Body>
        <Card.Footer css={{ padding: 0, marginTop: '16px' }}>
          <div>
            <Text size="sm" bold="semi" as="span">{`${members.length}명`}</Text>
            <Text size="sm" as="span">
              이{' '}
            </Text>
            <Text size="sm" as="span" variant="heading" color="pink-lighten3">
              {SKILLS[challengeInfo.skill]}
            </Text>
            <Text size="sm" as="span">
              를 공부하고 있어요.
            </Text>
          </div>
          <div css={{ marginTop: '8px' }}>
            <Avatar.Group src={[...memberProfile]} />
          </div>
        </Card.Footer>
      </Card>
    </li>
  );
};
