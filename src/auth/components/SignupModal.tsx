import { Modal, Button } from '@jdesignlab/react';
import { useMachine } from '@xstate/react';
import { UserProfileForm } from './UserProfileForm';
import { EmailPasswordForm } from './EmailPasswordForm';
import { signMachine } from '../machines/signMachine';
import { useSetUserAuthData } from '../hooks/useSetUserAuthData';

export const SignupModal = () => {
  const [state, send, service] = useMachine(signMachine);
  const { value: signState, history, context } = state;
  const openFlag = signState !== 'done' && !!history;
  const userInfo = context.user;
  const { updateUserData } = useSetUserAuthData();

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
        {signState === 'registry' ? (
          <UserProfileForm signupMachineRef={service} />
        ) : (
          <EmailPasswordForm signMachine={service} signup />
        )}
      </Modal.Body>
    </Modal>
  );
};
