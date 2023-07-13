import { useContext } from 'react';
import { ChallengeContext } from '@challenge/context';
import { useStartMutation } from '@challenge/hooks/useStartMutation';
import { Button } from '@jdesignlab/react';
import { Plus } from '@jdesignlab/react-icons';

export const StartButton = () => {
  const { postInfo } = useContext(ChallengeContext);

  const startSuccessAction = async () => {};
  const { startAction } = useStartMutation(startSuccessAction);
  const onClickStart = () => {
    startAction(postInfo.id);
  };

  return (
    <Button onClick={onClickStart} size="lg" icon={<Plus width={16} height={16} style={{ marginBottom: '2px' }} />}>
      워크스페이스 생성
    </Button>
  );
};
