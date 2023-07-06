import { GitHubIcon, GoogleIcon, Loading } from '@shared/components/Icons';
import { Modal, Stack, Button } from '@jdesignlab/react';
import { useMachine } from '@xstate/react';
import { Mail } from '@jdesignlab/react-icons';
import { EmailPasswordForm } from './EmailPasswordForm';
import { useSigninWithProvider } from '../hooks/useSigninWithProvider';
import { signMachine } from '../machines/signMachine';

export const SigninModal = () => {
  const [state, send, service] = useMachine(signMachine);
  const { value: signState, history } = state;
  const openState = signState !== 'done' && !!history;
  const { isLoading: loadingGithub, mutate: signinGithub } = useSigninWithProvider('GITHUB', send);
  const { isLoading: loadingGoogle, mutate: signinGoogle } = useSigninWithProvider('GOOGLE', send);

  return (
    <Modal
      open={openState}
      hasCloseIcon
      onClose={() => {
        send('CLEAR');
      }}
    >
      <Modal.Trigger>
        <Button variant="outline" color="primary-500">
          로그인
        </Button>
      </Modal.Trigger>
      <Modal.Header>로그인</Modal.Header>
      <Modal.Body>
        {signState === 'selection' && (
          <Stack direction="vertical">
            <Button
              color="primary-500"
              variant="outline"
              icon={<Mail />}
              onClick={() => {
                send('EMAIL');
              }}
            >
              Email로 로그인
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              onClick={() => {
                signinGithub();
              }}
              disabled={loadingGithub}
              icon={loadingGithub ? <Loading /> : <GitHubIcon />}
            >
              GitHub 계정으로 로그인
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              disabled={loadingGoogle}
              icon={loadingGoogle ? <Loading /> : <GoogleIcon />}
              onClick={() => {
                signinGoogle();
              }}
            >
              Google 계정으로 로그인
            </Button>
          </Stack>
        )}
        {signState === 'email' && <EmailPasswordForm signMachine={service} signup={false} />}
      </Modal.Body>
    </Modal>
  );
};
