import { ChallengePostFields } from '@challenge/types';
import { Text } from '@jdesignlab/react';

export const ChallengeInfo = ({ postInfo }: { postInfo: ChallengePostFields }) => (
  <>
    <Text variant="heading" size="xl">
      {postInfo.title}
    </Text>
    <Text variant="paragraph" size="md">
      {postInfo.content}
    </Text>
  </>
);
