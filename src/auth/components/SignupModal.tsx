import { Modal, Stack, Button } from '@jdesignlab/react';
import { UserProfileForm } from './UserProfileForm';
import { EmailPasswordForm } from './EmailPasswordForm';
import { fetchSigninWithGithub } from '../remotes/fetchSigninWithGithub';
import { fetchSigninWithGoogle } from '../remotes/fetchSigninWithGoogle';
import { GitHubIcon, GoogleIcon } from '@shared/components/Icons';
import { useMachine } from '@xstate/react';
import { signMachine } from '../machines/signupMachine';

export const SignupModal = () => {
  const [state, send, service] = useMachine(signMachine);

  return (
    <Modal hasCloseIcon>
      <Modal.Trigger open>
        <Button color="primary-500">회원가입</Button>
      </Modal.Trigger>
      <Modal.Header>회원가입</Modal.Header>
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
              Email로 가입하기
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              onClick={() => {
                fetchSigninWithGithub();
                send('REGISTRY');
              }}
              icon={<GitHubIcon />}
            >
              GitHub계정으로 가입하기
            </Button>
            <Button
              color="primary-500"
              variant="outline"
              icon={<GoogleIcon />}
              onClick={() => {
                fetchSigninWithGoogle();
                send('REGISTRY');
              }}
            >
              Google계정으로 가입하기
            </Button>
          </Stack>
        )}
        {state.value === 'email' && <EmailPasswordForm signMachine={service} signup={true} />}
        {state.value === 'registry' && <UserProfileForm signupMachineRef={service} />}
      </Modal.Body>
    </Modal>
  );
};
