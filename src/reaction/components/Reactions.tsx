import { Suspense } from 'react';
import DynamicWrapper from '@shared/components/DynamicWrapper';
// import { useUserAuth } from '@auth/hooks/useUserAuth';
import { ErrorBoundary } from 'react-error-boundary';
import { CommentReactions } from './CommentReactions';
import { EmojiReactions } from './EmojiReactions';
import { ReactionContext } from '../context';

const Error = () => <div>댓글을 가져오는 중에 문제가 발생했습니다.</div>;

export const Reactions = ({ originId }: { originId: string }) => {
  // const { data: user } = useUserAuth();
  // console.log('user', user);
  // const userId = 'user1234';
  const userId = 'test1234';
  return (
    <DynamicWrapper>
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<div>로딩중</div>}>
          <ReactionContext.Provider value={{ originId }}>
            <EmojiReactions userId={userId} />
            <CommentReactions userId={userId} />
          </ReactionContext.Provider>
        </Suspense>
      </ErrorBoundary>
    </DynamicWrapper>
  );
};
