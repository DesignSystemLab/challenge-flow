import * as Style from '@auth/styles/signPageStyle';
import { Loading } from '@shared/components/Icons';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { ErrorModal } from '@shared/components/ErrorModal';
import { EmailPasswordForm } from '@auth/components/action/EmailPasswordForm';
import { signMachine } from '@auth/machines/signMachine';
import { UserProfileForm } from '@auth/components/action/UserProfileForm';
import { useSetUserAuthData } from '@auth/hooks/useSetUserAuthData';
import { Button, Text } from '@jdesignlab/react';
import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const [state, send, service] = useMachine(signMachine);
  const { value: signState, context } = state;
  const userInfo = context.user;
  const { updateUserData } = useSetUserAuthData();
  const router = useRouter();

  const moveToPage = (url: string, callback?: () => void) => {
    if (callback) {
      callback();
    }
    router.push(url);
  };

  const onUpdateUserData = () => {
    if (userInfo) {
      updateUserData(userInfo);
    }
    send('CLEAR');
  };

  if (state.matches('done')) {
    moveToPage('/');
  }

  return (
    <CompositionBoundaryReactQuery suspense={<Loading />} error={(props) => <ErrorModal {...props} />}>
      <section css={Style.signFormContainer}>
        <div css={Style.title}>
          <Text variant="heading" size="xl" color="primary-500" align="center">
            회원가입
          </Text>
          <Button
            variant="link"
            onClick={() => {
              moveToPage('/login', onUpdateUserData);
            }}
          >
            이미 계정이 있으세요?
          </Button>
        </div>
        <div css={Style.signButtonWrapper}>
          {signState === 'registry' ? (
            <UserProfileForm signupMachineRef={service} />
          ) : (
            <EmailPasswordForm signMachine={service} signup />
          )}
        </div>
      </section>
    </CompositionBoundaryReactQuery>
  );
};

export default SignUpPage;
