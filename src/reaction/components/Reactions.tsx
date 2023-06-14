import { Suspense } from 'react';
import DynamicWrapper from '@shared/components/DynamicWrapper';
import { ErrorBoundary } from 'react-error-boundary';
import { CommentReactions } from './CommentReactions';

const Error = () => <div>댓글을 가져오는 중에 문제가 발생했습니다.</div>;

export const Reactions = ({ originId }: { originId: string }) => (
  <DynamicWrapper>
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<div>로딩중</div>}>
        <div>
          {/* <EmojiReactions /> */}
          <CommentReactions originId={originId} />
        </div>
      </Suspense>
    </ErrorBoundary>
  </DynamicWrapper>
);
