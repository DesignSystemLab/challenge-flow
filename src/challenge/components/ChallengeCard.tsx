import { challengeCard } from '@challenge/styles';
import { ChallengePostFields } from '@challenge/types';
import { Button, Flex, Text } from '@jdesignlab/react';
import { useRouter } from 'next/router';

export const ChallengeCard = ({ postInfo, userId }: { postInfo: ChallengePostFields; userId: string | undefined }) => {
  const router = useRouter();
  const moveToPostDetail = () => {
    router.push({ pathname: `/challenge/${postInfo.id}` });
  };

  return (
    <div css={challengeCard} style={{ display: 'flex', flexDirection: 'column', padding: '16px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text variant="label" size="sm">
          마감 D-2
        </Text>
      </div>
      <Text variant="heading" size="md">
        {postInfo.title}
      </Text>
      <Flex />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text variant="paragraph" size="sm">
          ?
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
