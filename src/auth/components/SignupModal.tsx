import { GitHubIcon, GoogleIcon, Loading } from '@shared/components/Icons';
import { Modal, Stack, Button } from '@jdesignlab/react';
import { useMachine } from '@xstate/react';
import { UserProfileForm } from './UserProfileForm';
import { EmailPasswordForm } from './EmailPasswordForm';
import { signMachine } from '../machines/signMachine';
import { useSetUserAuthData } from '../hooks/useSetUserAuthData';
import { useSignupWithProvider } from '../hooks/useSignupWithProvider';

export const SignupModal = () => {
  const [state, send, service] = useMachine(signMachine);
  const { value: signState, history, context } = state;
  const openFlag = signState !== 'done' && !!history;
  const userInfo = context.user;
  const { updateUserData } = useSetUserAuthData();
  const { mutate: signupGithub, isLoading: loadingGithub } = useSignupWithProvider('GITHUB', send);
  const { mutate: signupGoogle, isLoading: loadingGoogle } = useSignupWithProvider('GOOGLE', send);

  return (
    <Modal
      open={openFlag}
      hasCloseIcon
      onClose={() => {
        send('CLEAR');
        if (userInfo) {
          updateUserData(userInfo);
        }
      }}
    >
      <Modal.Trigger>
        <Button color="primary-500">회원가입</Button>
      </Modal.Trigger>
      <Modal.Header>회원가입</Modal.Header>
      <Modal.Body>
        {signState === 'selection' && (
          <Stack direction="vertical">
            <Button
              color="primary-500"
              variant="outline"
              // icon={<Mail />}
              onClick={() => {
                send('EMAIL');
              }}
            >
              Email로 가입하기
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              onClick={() => {
                signupGithub();
              }}
              disabled={loadingGithub}
              icon={loadingGithub ? <Loading /> : <GitHubIcon />}
            >
              GitHub계정으로 가입하기
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              disabled={loadingGoogle}
              icon={loadingGoogle ? <Loading /> : <GoogleIcon />}
              onClick={() => {
                signupGoogle();
              }}
            >
              Google계정으로 가입하기
            </Button>
          </Stack>
        )}
        {signState === 'email' && <EmailPasswordForm signMachine={service} signup />}
        {signState === 'registry' && <UserProfileForm signupMachineRef={service} />}
      </Modal.Body>
    </Modal>
  );
};
