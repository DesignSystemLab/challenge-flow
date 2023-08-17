import { Modal, Button } from '@jdesignlab/react';
import { useMachine } from '@xstate/react';
import { UserProfileForm } from './action/UserProfileForm';
import { EmailPasswordForm } from './action/EmailPasswordForm';
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
        if (userInfo) {
          updateUserData(userInfo);
        }
        send('CLEAR');
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
