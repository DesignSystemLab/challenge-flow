import { Stack, TextInput, Button, Modal } from '@jdesignlab/react';
// import { useForm } from 'react-hook-form';
import { useFormValidate } from '../hooks/useFormValidate';
import { Flex, Image } from '../styles/Profile';
import { useActor } from '@xstate/react';
import { useSignupWithEmailMutation } from '../mutations/useSignupWithEmailMutaion';
import { useSigninEmailMutation } from '../mutations/useSigninEmailMutation';
import { AuthMachineContext } from '@shared/contexts/AuthMachineContext';
import type { InterpreterFrom } from 'xstate';
import type { SignMachineType } from '../machines/signupMachine';

interface Props {
  signMachine: InterpreterFrom<SignMachineType>;
  signup: boolean;
}

export const EmailPasswordForm = (props: Props) => {
  const { signMachine, signup } = props;
  const [_, refSend] = useActor(signMachine);
  const { handleInputEmail, handleInputPassword, registry } = useFormValidate();
  const handleSubmit = signup ? useSignupWithEmailMutation(refSend) : useSigninEmailMutation(refSend);

  return (
    <>
      <Stack direction="vertical">
        <TextInput size="md" clearable onInput={handleInputEmail}>
          <TextInput.Label>Email</TextInput.Label>
        </TextInput>
        <TextInput size="md" clearable type="password" onInput={handleInputPassword}>
          <TextInput.Label>Password</TextInput.Label>
        </TextInput>
      </Stack>
      <Modal.Footer>
        <Flex>
          <Modal.Trigger
            close
            onClose={() => {
              refSend('CLEAR');
            }}
          >
            <Button
              variant="outline"
              color="red-lighten2"
              onClick={() => {
                refSend('CLEAR');
              }}
            >
              뒤로가기
            </Button>
          </Modal.Trigger>
          <Button
            type="submit"
            variant="outline"
            color="primary-500"
            onClick={() => {
              const { valid, email, password, message } = registry;
              if (valid) {
                handleSubmit({ email, password });
                return;
              }
              alert(message);
            }}
          >
            {signup ? '회원가입' : '로그인'}
          </Button>
        </Flex>
      </Modal.Footer>
    </>
  );
};
