import { useEffect, useState } from 'react';
import { useCreateMuation } from '@challenge/hooks/useCreateMutation';
import { useModifyMutation } from '@challenge/hooks/useModifyMutation';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { DevSkillCombobox } from '@shared/components/form/DevSkillCombobox';
// import { useUserAuth } from '@auth/hooks/useUserAuth';
import { Button, Flex, Radio, Select, TextInput } from '@jdesignlab/react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import type { ChallengeHookFormValues, ChallengeAllFormValues, ChallengePostFields } from '@challenge/types';

export const CreateChallengeForm = ({ fillData }: { fillData?: ChallengePostFields }) => {
  // const { data: user } = useUserAuth();

  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      isDaily: true,
      isPublic: true,
      duration: {
        start: '',
        end: ''
      },
      dueAt: ''
    }
  });
  const router = useRouter();
  const [memberCapacity, setMemberCapacity] = useState<number>(1);
  const [content, setContent] = useState<string>(fillData?.content ?? '');
  const [skill, setSkill] = useState<number>(fillData?.skill ?? 0);

  const successAction = (id?: string) => {
    if (id) {
      router.push({ pathname: `/challenge/${id}` });
    }
  };
  const { onSubmitCreate } = useCreateMuation('test1234', successAction);
  const { onSubmitModify } = useModifyMutation('test1234', successAction);

  useEffect(() => {
    if (fillData) {
      setValue('title', fillData.title);
      setValue('isDaily', fillData.isDaily);
      setValue('isPublic', fillData.isPublic);
      setValue('duration.start', fillData.duration.start);
      setValue('duration.end', fillData.duration.end);
      setValue('dueAt', fillData.dueAt);
    }
  }, [fillData]);

  const createChallenge = (data: ChallengeHookFormValues) => {
    const { isDaily, isPublic, ...rest } = data;
    const mergedFormValues: ChallengeAllFormValues = {
      memberCapacity,
      content,
      skill,
      isDaily: Boolean(isDaily),
      isPublic: Boolean(isPublic),
      ...rest
    };
    if (!fillData) {
      onSubmitCreate(mergedFormValues);
    } else {
      onSubmitModify(fillData.id, mergedFormValues);
    }
  };

  return (
    <form onSubmit={handleSubmit(createChallenge)}>
      <TextInput {...register('title', { required: true })} size="sm" />
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
          <input type="date" {...register('duration.start', { required: true })} />
          ~
          <input type="date" {...register('duration.end', { required: true })} />
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 모집 마감일</Flex.Item>
        <Flex.Item>
          <input type="date" {...register('dueAt', { required: true })} />
        </Flex.Item>
      </Flex>
      <Select
        onValueChange={(value) => {
          setMemberCapacity(Number(value));
        }}
        defaultValue={`${memberCapacity}`}
      >
        <Select.Trigger placeholder="" />
        {Array.from({ length: 20 }, (_, index) => index + 1).map((item: number) => (
          <Select.Option value={`${item}`} key={item}>
            {`${item}`}
          </Select.Option>
        ))}
      </Select>
      <Flex>
        <Flex.Item> 진행 주제</Flex.Item>
        <Flex.Item>
          <DevSkillCombobox state={skill} setState={setSkill} />
        </Flex.Item>
      </Flex>
      <MarkdownEditor
        height={310}
        content={content}
        onChange={(value: string) => {
          setContent(value);
        }}
      />
      <Button
        type="submit"
        variant="outline"
        color="primary-500"
        //  disabled={!!writeMutation.isLoading}
      >
        작성
      </Button>
    </form>
  );
};
