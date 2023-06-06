import { challengeCard } from '@challenge/styles';
import { ChallengePostFields } from '@challenge/types';
import { Button, Flex, Text } from '@jdesignlab/react';
import { useRouter } from 'next/router';

export const ChallengeCard = ({ postInfo }: { postInfo: ChallengePostFields }) => {
  const router = useRouter();
  const moveToPostDetail = () => {
    router.push({ pathname: `/challenge/${postInfo.id}` });
  };

  return (
    <div css={challengeCard} style={{ display: 'flex', flexDirection: 'column', padding: '16px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text variant="label" size="sm" color="primary-500">
          {`${postInfo.members.length}`}/{`${postInfo.memberCapacity}`}명 참여중
        </Text>
        <Text variant="label" size="sm">
          마감 D-2
        </Text>
      </div>
      <Text variant="heading" size="md">
        {postInfo.title}
      </Text>
      <Flex />
      {postInfo.content}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text variant="paragraph" size="sm">
          dd
        </Text>
        <Text variant="paragraph" size="sm">
          주별
        </Text>
      </div>
      <Button variant="outline" onClick={moveToPostDetail}>
        자세히보기
      </Button>
    </div>
  );
};
