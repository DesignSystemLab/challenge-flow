import { Modal, Stack, Button } from '@jdesignlab/react';
import { GitHubIcon, GoogleIcon } from '@shared/components/Icons';
import { EmailPasswordForm } from '../components/EmailPasswordForm';
import { fetchSigninWithGithub } from '../remotes/fetchSigninWithGithub';
import { fetchSigninWithGoogle } from '../remotes/fetchSigninWithGoogle';
import { signMachine } from '../machines/signupMachine';
import { useMachine } from '@xstate/react';

export const SigninModal = () => {
  const [state, send, service] = useMachine(signMachine);

  return (
    <Modal hasCloseIcon>
      <Modal.Trigger close={state.value === 'done' ? true : false}>
        <Button variant="outline" color="primary-500">
          로그인
        </Button>
      </Modal.Trigger>
      <Modal.Header>로그인</Modal.Header>
      <Modal.Body>
        {state.value === 'selection' && (
          <Stack direction="vertical">
            <Button
              color="primary-500"
              variant="outline"
              // icon={<Mail />}
              onClick={(e) => {
                send('EMAIL');
              }}
            >
              Email로 로그인
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              onClick={() => {
                fetchSigninWithGithub();
              }}
              icon={<GitHubIcon />}
            >
              GitHub계정으로 로그인
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              icon={<GoogleIcon />}
              onClick={() => {
                fetchSigninWithGoogle();
              }}
            >
              Google계정으로 로그인
            </Button>
          </Stack>
        )}
        {state.value === 'email' && <EmailPasswordForm signMachine={service} signup={false} />}
      </Modal.Body>
    </Modal>
  );
};
