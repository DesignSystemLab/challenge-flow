import { memo, useEffect, useMemo } from 'react';
import DynamicWrapper from '@shared/components/DynamicWrapper';
import { Emojis } from '@reaction/emoji/components/Emojis';
import { Comments } from '@reaction/comment/components/Comments';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Button } from '@jdesignlab/react';
import { useSession } from 'next-auth/react';
// import { CommentReactions } from './CommentReactions';
// import { EmojiReactions } from './EmojiReactions';
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

interface UserSession {
  user: {
    uid: string;
    address?: string;
    name?: string;
    image?: string;
  };
  expires: string;
}

type DomainType = 'challenge' | 'workspace';

interface Props {
  originId: string;
  domain: DomainType;
}

export const Reactions = memo(({ originId, domain }: Props) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  useEffect(() => {
    console.log('댓글 렌더링');
  });

  return (
    <DynamicWrapper>
      <CompositionBoundaryReactQuery
        suspense={<div>reactions 로딩중이얍</div>}
        error={(prop) => <ReactionError {...prop} />}
      >
        <ReactionContext.Provider value={useMemo(() => ({ originId, domain }), [originId, domain])}>
          <div css={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Emojis currentUser={userSession?.user} />
            <Comments currentUser={userSession?.user} />
          </div>
        </ReactionContext.Provider>
      </CompositionBoundaryReactQuery>
    </DynamicWrapper>
  );
});
