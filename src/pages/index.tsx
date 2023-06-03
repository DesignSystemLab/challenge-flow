import { ErrorModal } from '@shared/components/ErrorModal';
import { SignupModal } from '@auth/components/SignupModal';
import { SigninModal } from '@auth/components/SigninModal';
import { useUserAuth } from '@auth/hooks/useUserAuth';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@jdesignlab/react';

const index = () => {
  // const [state, send] = AuthMachineContext.useActor();
  const { data: user } = useUserAuth();

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
