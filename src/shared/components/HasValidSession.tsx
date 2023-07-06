import UserProfile from '@auth/components/UserProfile';
import { Button } from '@jdesignlab/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorModal } from './ErrorModal';
import DynamicWrapper from './DynamicWrapper';

interface UserSession {
  user: {
    uid: string;
    address?: string;
    name?: string;
    image?: string;
  };
  expires: string;
}

interface Props {
  children: React.ReactNode;
  id?: string;
  fallback?: React.ReactNode;
}

export const HasValidSession = ({ children, id, fallback }: Props) => {
  const { data } = useSession();
  const userSession = data as unknown as UserSession;
  const router = useRouter();
  const moveToBack = () => {
    router.back();
  };
  const moveToMain = () => {
    router.push({ pathname: '/' });
  };

  if (!userSession) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <DynamicWrapper>
        <ErrorBoundary FallbackComponent={ErrorModal}>
          <div>로그인을 해주세요</div>
          <div>
            {/* <Button as="a" onClick={moveToBack} variant="outline">
              뒤로가기
            </Button>
            <Button as="a" onClick={moveToMain}>
              홈으로 가기
            </Button> */}
            <UserProfile />
          </div>
        </ErrorBoundary>
      </DynamicWrapper>
    );
  }
  if (id && userSession.user.uid !== id) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div>
        <div>유효한 계정이 아닙니다.</div>
        <div>
          <Button as="a" onClick={moveToBack} variant="outline">
            뒤로가기
          </Button>
          <Button as="a" onClick={moveToMain}>
            홈으로 가기
          </Button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
