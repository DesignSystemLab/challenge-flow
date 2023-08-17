import * as Style from '@auth/styles/signPageStyle';
import { CompositionBoundaryReactQuery } from '@shared/boundaries';
import { ErrorModal } from '@shared/components/ErrorModal';
import { signMachine } from '@auth/machines/signMachine';
import { AuthLoginButtons } from '@auth/components/action/AuthLoginButtons';
import { Loading } from '@shared/components/Icons';
import { EmailPasswordForm } from '@auth/components/action/EmailPasswordForm';
import { Button, Text } from '@jdesignlab/react';
import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';

const Login = () => {
  const [state, , service] = useMachine(signMachine);
  const { value: signState } = state;
  const router = useRouter();

  const moveToLoginPage = () => {
    router.push('/signup');
  };

  return (
    <CompositionBoundaryReactQuery suspense={<Loading />} error={(props) => <ErrorModal {...props} />}>
      <section css={Style.signFormContainer}>
        <div css={Style.title}>
          <Text variant="heading" size="xl" color="primary-500" align="center">
            로그인
          </Text>
          <Button variant="link" onClick={moveToLoginPage}>
            계정이 없으세요?
          </Button>
        </div>
        <div css={Style.signButtonWrapper}>
          {signState === 'selection' && <AuthLoginButtons signMachine={service} />}
          {signState === 'email' && <EmailPasswordForm signMachine={service} signup={false} />}
        </div>
      </section>
    </CompositionBoundaryReactQuery>
  );
};

export default Login;
