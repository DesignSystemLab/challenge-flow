import { useMemo } from 'react';
import DynamicWrapper from '@shared/components/DynamicWrapper';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Button } from '@jdesignlab/react';
import { CommentReactions } from './CommentReactions';
import { EmojiReactions } from './EmojiReactions';
import { ReactionContext } from '../context';
import type { FallbackProps } from 'react-error-boundary';

interface ErrorfallbackProps extends FallbackProps {
  title?: string;
  message?: string;
}

const ReactionError = ({ ...errorProps }: ErrorfallbackProps) => {
  const { resetErrorBoundary } = errorProps;
  return (
    <div>
      <div>댓글을 가져오는 중에 문제가 발생했습니다.</div>
      <Button onClick={resetErrorBoundary}>재시도하기</Button>
    </div>
  );
};

export const Reactions = ({ originId }: { originId: string }) => {
  // const { data: user } = useUserAuth();
  // console.log('user', user);
  // const userId = 'user1234';
  const userId = 'test1234';
  return (
    <DynamicWrapper>
      <CompositionBoundaryReactQuery
        suspense={<div>reactions 로딩중이얍</div>}
        error={(prop) => <ReactionError {...prop} />}
      >
        <ReactionContext.Provider value={useMemo(() => ({ originId }), [originId])}>
          <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <EmojiReactions userId={userId} />
            <CommentReactions userId={userId} />
          </div>
        </ReactionContext.Provider>
      </CompositionBoundaryReactQuery>
    </DynamicWrapper>
  );
};
