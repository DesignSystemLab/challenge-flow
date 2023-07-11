import { useMemo } from 'react';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import DynamicWrapper from '@shared/components/DynamicWrapper';
import { Emojis } from '@reaction/emoji/components/Emojis';
import { Comments } from '@reaction/comment/components/Comments';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { Button } from '@jdesignlab/react';
import { useSession } from 'next-auth/react';
import { ReactionContext } from './context';
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

export const Reactions = ({ originId, domain }: Props) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;

  return (
    <DynamicWrapper>
      <CompositionBoundaryReactQuery
        suspense={<Layout.Center>reactions 로딩중이얍</Layout.Center>}
        error={(prop) => <ReactionError {...prop} />}
      >
        <ReactionContext.Provider
          value={useMemo(() => ({ originId, domain, currentUser: userSession?.user }), [originId, domain, userSession])}
        >
          <Layout.Column gap={12}>
            <Emojis />
            <Comments />
          </Layout.Column>
        </ReactionContext.Provider>
      </CompositionBoundaryReactQuery>
    </DynamicWrapper>
  );
};
