import { Text, TextInput, Button, Modal } from '@jdesignlab/react';
import { useForm, Controller } from 'react-hook-form';
import { useActor } from '@xstate/react';
import { Flex } from '../styles/Profile';
import { useAccountEmailWithPassword } from '../hooks/useAccountEmailWithPassword';
import type { InterpreterFrom } from 'xstate';
import type { SignMachineType } from '../machines/signMachine';
import type { EamilPasswordField } from '../types';

interface Props {
  signMachine: InterpreterFrom<SignMachineType>;
  signup: boolean;
}

export const EmailPasswordForm = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { signMachine, signup } = props;
  const [, refSend] = useActor(signMachine);
  const { mutate: registry, isLoading } = useAccountEmailWithPassword(signup, refSend);

  return (
    <form
      onSubmit={handleSubmit((userInfo) => {
        registry(userInfo as EamilPasswordField);
      })}
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/,
            message: '이메일 형식에 맞지 않습니다.'
          }
        }}
        render={({ field }) => (
          <TextInput {...field} size="md" clearable>
            <TextInput.Label>Email</TextInput.Label>
          </TextInput>
        )}
      />
      {errors.email && <Text color="red-base">{errors.email.message as string}</Text>}
      <Controller
        name="password"
        control={control}
        rules={{
          required: '비밀번호를 입력해주세요.',
          minLength: {
            message: '비밀번호는 최소 8자 이상으로 입력해주세요.',
            value: 8
          }
        }}
        render={({ field }) => (
          <TextInput {...field} size="md" clearable type="password">
            <TextInput.Label>Password</TextInput.Label>
          </TextInput>
        )}
      />
      {errors.password && <Text color="red-base">{errors.password.message as string}</Text>}
      <Modal.Footer>
        <Flex>
          <Button
            variant="outline"
            color="red-lighten2"
            onClick={() => {
              refSend({ type: 'CLEAR' });
            }}
          >
            뒤로가기
          </Button>
          <Button type="submit" variant="outline" color="primary-500" disabled={isLoading}>
            {signup ? '회원가입' : '로그인'}
          </Button>
        </Flex>
      </Modal.Footer>
    </form>
  );
};
