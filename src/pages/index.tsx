import { useContext } from 'react';
import { SignupModal } from '@auth/components/SignupModal';
import { SigninModal } from '@auth/components/SigninModal';
import { Button } from '@jdesignlab/react';
import { AuthContext } from '@shared/contexts/AuthContext';
import { AuthMachineContext } from '@shared/contexts/AuthMachineContext';
import { useActor } from '@xstate/react';
import { fetchSignout } from '@auth/remotes/fetchSignout';

const index = () => {
  // const authContext = useContext(AuthContext);
  // const [state] = useActor(authContext.authService);
  const [state, send] = AuthMachineContext.useActor();
  console.log(state.context.userInfo);

  return (
    <div>
      {state.value === 'loggedIn' && (
        <>
          <h2>{state.context.userInfo && `${state.context.userInfo.displayName}님 환영합니다.`}</h2>
          <Button
            onClick={() => {
              fetchSignout(send);
            }}
          >
            로그아웃
          </Button>
        </>
      )}
      <SigninModal />
      <SignupModal />
    </div>
  );
};

export default index;
