import { useState } from 'react';
import { ImageUpload } from '@shared/components/ImageUpload';
import { Loading } from '@shared/components/Icons';
import { useForm, Controller } from 'react-hook-form';
import { useActor } from '@xstate/react';
import { Stack, TextInput, Button, Modal } from '@jdesignlab/react';
import { useProfileUpdate } from '../hooks/useProfileUpdate';
import { useSetUserAuthData } from '../hooks/useSetUserAuthData';
import { parseUserInfo } from '../parseUserInfo';
import { Flex } from '../styles/Profile';
import type { InterpreterFrom } from 'xstate';
import type { SignMachineType } from '../machines/signMachine';
import type { UserProfile } from '../types';

interface Props {
  signupMachineRef: InterpreterFrom<SignMachineType>;
}

export const UserProfileForm = (props: Props) => {
  const { signupMachineRef } = props;
  const [photo, setPhoto] = useState<string | null>(null);
  const [refState, refSend] = useActor(signupMachineRef);
  const { user } = refState.context;
  const defaultProfile = parseUserInfo(user);
  const { updateUserData } = useSetUserAuthData();
  const { control, handleSubmit } = useForm();
  const { mutate: updateProfile, isLoading } = useProfileUpdate(refSend, user?.uid);

  const getImagePath = (imageUrl: string | null) => {
    setPhoto(imageUrl);
  };

  return (
    <form
      onSubmit={handleSubmit((profile) => {
        const { nickname, skills } = profile;
        defaultProfile.name = nickname;
        defaultProfile.skills = [skills];
        defaultProfile.photo = photo;
        updateProfile(defaultProfile as UserProfile);
      })}
    >
      <Stack direction="vertical">
        <Controller
          name="nickname"
          control={control}
          rules={{
            required: '닉네임을 입력해주세요.'
          }}
          render={({ field }) => (
            <TextInput {...field} size="md" clearable defaultValue={defaultProfile.name || ''}>
              <TextInput.Label>닉네임을 입력해주세요.</TextInput.Label>
            </TextInput>
          )}
        />
        <Controller
          name="skills"
          control={control}
          rules={{
            required: '관심 분야를 입력해주세요.'
          }}
          render={({ field }) => (
            <TextInput {...field} size="md" clearable>
              <TextInput.Label>관심분야 (#JavaScript, #HTML...)</TextInput.Label>
            </TextInput>
          )}
        />
        <ImageUpload
          path={user?.uid}
          alt={`${user?.displayName} profile image` ?? 'unknown image'}
          onImage={getImagePath}
        />
      </Stack>
      <Modal.Footer>
        <Flex>
          <Button
            variant="outline"
            color="red-lighten2"
            onClick={() => {
              refSend('CLEAR');
              updateUserData(refState.context.user);
            }}
          >
            나중에
          </Button>
          <Button
            variant="outline"
            color="primary-500"
            type="submit"
            disabled={isLoading}
            icon={isLoading ? <Loading /> : undefined}
          >
            저장
          </Button>
        </Flex>
      </Modal.Footer>
    </form>
  );
};
