import { useEffect } from 'react';
// import { DevSkillCombobox } from '@shared/components/DevSkillCombobox';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { Button, Flex, Radio, TextInput } from '@jdesignlab/react';
import { Controller, useForm } from 'react-hook-form';
import type { ChallengeFormStates, ChallengePostFields } from '@challenge/types';

export const CreateChallengeForm = ({ fillData }: { fillData?: ChallengePostFields }) => {
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      isDaily: true,
      isPublic: true,
      s_duration: '',
      e_duration: '',
      dueAt: '',
      content: ''
    }
  });
  const { useWriteMutation, useModifyMutation } = useChallengeApi();
  const writeMutation = useWriteMutation();
  const modifyMutation = useModifyMutation();

  useEffect(() => {
    if (fillData) {
      setValue('title', fillData.title);
      setValue('isDaily', fillData.isDaily);
      setValue('isPublic', fillData.isPublic);
      setValue('s_duration', fillData.s_duration);
      setValue('e_duration', fillData.e_duration);
      setValue('dueAt', fillData.dueAt);
    }
  }, [fillData]);

  const createChallenge = (data: ChallengeFormStates) => {
    if (!fillData) {
      writeMutation.mutate({ data });
    } else {
      modifyMutation.mutate({ postId: fillData.id, data });
    }
  };

  return (
    <form onSubmit={handleSubmit(createChallenge)}>
      <TextInput {...register('title')} />
      <br />
      <Flex>
        <Flex.Item> 진행 주기</Flex.Item>
        <Flex.Item>
          <Controller
            name="isDaily"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Radio defaultChecked {...register('isDaily')} {...field} value="true">
                일별
              </Radio>
            )}
          />
          <Controller
            name="isDaily"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Radio {...register('isDaily')} {...field} value="false">
                주별
              </Radio>
            )}
          />
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 공개 여부</Flex.Item>
        <Flex.Item>
          <Controller
            name="isPublic"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Radio {...register('isPublic')} {...field} defaultChecked value="true">
                공개
              </Radio>
            )}
          />
          <Controller
            name="isPublic"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Radio {...register('isPublic')} {...field} value="false">
                비공개
              </Radio>
            )}
          />
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 진행 기간</Flex.Item>
        <Flex.Item>
          <input type="date" {...register('s_duration')} />
          ~
          <input type="date" {...register('e_duration')} />
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 모집 마감일</Flex.Item>
        <Flex.Item>
          <input type="date" {...register('dueAt')} />
        </Flex.Item>
      </Flex>
      {/* <Flex>
        <Flex.Item> 모집 인원</Flex.Item>
        <Flex.Item>
          <Select onValueChange={selectValueChangeHandler} defaultValue={`${postValue.memberCapacity}`}>
            <Select.Trigger placeholder="" />
            {Array.from({ length: 20 }, (_, index) => index + 1).map((item: number) => (
              <Select.Option value={`${item}`} key={item}>
                {`${item}`}
              </Select.Option>
            ))}
          </Select>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 진행 주제</Flex.Item>
        <Flex.Item>
          <DevSkillCombobox setState={setPostValue} updateDepthName="skill" />
        </Flex.Item>
      </Flex> */}
      {/* <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <MarkdownEditor height={310} {...field} />}
      /> */}
      <MarkdownEditor height={310} />
      <Button type="submit" variant="outline" color="primary-500" disabled={!!writeMutation.isLoading}>
        작성
      </Button>
    </form>
  );
};
