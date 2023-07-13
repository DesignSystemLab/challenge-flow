import { useContext } from 'react';
import { getWorkspaceId } from '@shared/utils/firestore';
import { ChallengeContext } from '@challenge/context';
import { useStartMutation } from '@challenge/hooks/useStartMutation';
import { Button } from '@jdesignlab/react';
import { Plus } from '@jdesignlab/react-icons';
import { useRouter } from 'next/router';

export const StartButton = () => {
  const { postInfo } = useContext(ChallengeContext);

  const router = useRouter();
  const moveToWorkspace = async () => {
    const workspaceId = await getWorkspaceId(postInfo.id);
    router.push({ pathname: `/workspace/${workspaceId}` });
  };

  const startSuccessAction = () => {
    moveToWorkspace();
  };
  const { startAction } = useStartMutation(startSuccessAction);
  const onClickStart = () => {
    startAction(postInfo.id);
  };

  return (
    <>
      {postInfo.isOpened ? (
        <Button as="a" onClick={moveToWorkspace} size="lg">
          워크스페이스로 이동
        </Button>
      ) : (
        <Button onClick={onClickStart} size="lg" icon={<Plus width={16} height={16} style={{ marginBottom: '2px' }} />}>
          워크스페이스 생성
        </Button>
      )}
    </>
  );
};
