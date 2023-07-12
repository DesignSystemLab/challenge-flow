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
  <ol css={workspacePostSummaryStyle}>
    <li>
      <Stack>
        <File width={18} height={18} fill="#f8a5c2" />
        <Text variant="label">{title}</Text>
      </Stack>
    </li>
  </ol>
);

const EmptyPost = () => (
  <div css={workspacePostEmptyStyle}>
    <Text variant="label">&#128576; 작성된 글이 없어요.</Text>
  </div>
);

export const WorkspaceItem = ({ workspaceItem }: Props) => {
  const { workspaceId, master, posts, challengeInfo, members } = workspaceItem;
  const router = useRouter();
  const memberProfile: string[] = members.map((member) => member.photo ?? '');
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
          <Text variant="heading" size="lg" color="pink-lighten1">
            {`${workspaceMasterInfo}의 Workpsace`}
          </Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ width: '100%', marginTop: '8px' }}>
          <Text variant="label" truncate>
            작성 포스트
          </Text>
          {posts.length ? posts.map((post) => <PostSummary {...post} />) : <EmptyPost />}
        </Card.Body>
        <Card.Divider />
        <Card.Footer css={{ width: '100%', height: '100%', padding: '0' }}>
          <Text variant="heading" as="span">{`${members.length}명이서 `}</Text>
          <Text as="span" color="pink-lighten3">
            {SKILLS[challengeInfo.skill]}
          </Text>
          <Text as="span"> 기술을 공부하고 있어요</Text>
          <Avatar.Group src={[...memberProfile]} />
        </Card.Footer>
      </Card>
    </li>
  );
};
