import { useEffect } from 'react';
import { Stack, TextInput, Button, Modal } from '@jdesignlab/react';
import { Flex, Image } from '../styles/Profile';
import { useMachine } from '@xstate/react';
import { useActor } from '@xstate/react';
import type { InterpreterFrom } from 'xstate';
import type { SignMachineType } from '../machines/signupMachine';

interface Props {
  signupMachineRef: InterpreterFrom<SignMachineType>;
}

export const UserProfileForm = (props: Props) => {
  const [refState, refSend] = useActor(props.signupMachineRef);

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <>
      <Stack direction="vertical">
        <TextInput size="md" clearable onInput={handleChange}>
          <TextInput.Label>닉네임을 입력해주세요.</TextInput.Label>
        </TextInput>
        <TextInput size="md" clearable>
          <TextInput.Label>관심분야 (#JavaScript, #HTML...)</TextInput.Label>
        </TextInput>
        <Button variant="ghost" color="lightBlue-base">
          프로필 사진 선택
        </Button>
        <Image />
      </Stack>
      <Modal.Footer>
        <Modal.Trigger
          close
          onClose={() => {
            refSend('CLEAR');
          }}
        >
          <Flex>
            <Button
              variant="outline"
              color="red-lighten2"
              onClick={() => {
                refSend('CLEAR');
              }}
            >
              나중에
            </Button>
            <Button variant="outline" color="primary-500">
              저장
            </Button>
          </Flex>
        </Modal.Trigger>
      </Modal.Footer>
    </>
  );
};
