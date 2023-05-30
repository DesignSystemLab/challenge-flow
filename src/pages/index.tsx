import { Button } from '@jdesignlab/react';
import { dehydrate, QueryClient } from 'react-query';
import { ErrorModal } from '@shared/components/ErrorModal';
import { SignupModal } from '@auth/components/SignupModal';
import { SigninModal } from '@auth/components/SigninModal';
import { ErrorBoundary } from 'react-error-boundary';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { ImageUpload } from '@shared/components/ImageUpload';
import { AuthMachineContext } from '@shared/contexts/AuthMachineContext';

const index = () => {
  // const [state, send] = AuthMachineContext.useActor();
  const { user } = useUserAuth();

  return (
    <div>
      {/* <ImageUpload /> */}
      <ErrorBoundary FallbackComponent={ErrorModal}>
        {user ? (
          <>
            {/* <h2>{state.context.userInfo && `${state.context.userInfo.displayName}님 환영합니다.`}</h2> */}
            <Button
            // onClick={() => {
            //   fetchSignout(send);
            // }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <SigninModal />
            <SignupModal />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default index;
