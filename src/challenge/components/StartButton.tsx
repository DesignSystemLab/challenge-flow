import { isEarlierThanNow } from '@shared/utils/date';
import { ChallengeModifyFetchProps } from '@challenge/types';
import { Button } from '@jdesignlab/react';
import { Plus } from '@jdesignlab/react-icons';

interface Props {
  postInfo: ChallengeModifyFetchProps;
}

export const StartButton = ({ postInfo }: Props) => (
  <Button
    disabled={isEarlierThanNow(postInfo.dueAt)}
    size="lg"
    icon={<Plus width={16} height={16} style={{ marginBottom: '2px' }} />}
  >
    워크스페이스 생성
  </Button>
);
