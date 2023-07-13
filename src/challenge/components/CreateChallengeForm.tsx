import { useEffect, useState } from 'react';
import { useCreateMuation } from '@challenge/hooks/useCreateMutation';
import { useModifyMutation } from '@challenge/hooks/useModifyMutation';
import { getDate, setEndTimeOfDay } from '@shared/utils/date';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { DevSkillCombobox } from '@shared/components/form/DevSkillCombobox';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { Button, Radio, Select, TextInput, Text, Flex } from '@jdesignlab/react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import type { ChallengeHookFormValues, ChallengeAllFormValues, ChallengeModifyFetchProps } from '@challenge/types';

interface Props {
  currentUser: {
    uid: string;
    email?: string;
    name?: string;
    image?: string;
  };
  fillData?: ChallengeModifyFetchProps;
}
export const CreateChallengeForm = ({ currentUser, fillData }: Props) => {
  const router = useRouter();

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
  const [memberCapacity, setMemberCapacity] = useState<number>(1);
  const [content, setContent] = useState<string>(fillData?.content ?? '');
  const [skill, setSkill] = useState<number>(fillData?.skill ?? 0);

  const successAction = (id?: string) => {
    if (id) {
      router.push({ pathname: `/challenge/${id}` });
    }
  };
  const { onSubmitCreate } = useCreateMuation(currentUser.uid, successAction);
  const { onSubmitModify } = useModifyMutation(currentUser.uid, successAction);

  useEffect(() => {
    if (fillData) {
      setMemberCapacity(fillData.memberCapacity);
      setValue('title', fillData.title);
      setValue('isDaily', fillData.isDaily);
      setValue('isPublic', fillData.isPublic);
      setValue('duration.start', fillData.duration.start);
      setValue('duration.end', fillData.duration.end);
      setValue('dueAt', fillData.dueAt);
    }
  }, [fillData]);

  const createChallenge = (fieldsValue: ChallengeHookFormValues) => {
    const { dueAt, isDaily, isPublic, ...rest } = fieldsValue;
    const mergedFormValues: ChallengeAllFormValues = {
      memberCapacity,
      content,
      skill,
      isDaily: Boolean(isDaily),
      isPublic: Boolean(isPublic),
      dueAt: setEndTimeOfDay(getDate(dueAt)),
      ...rest
    };
    if (!fillData) {
      onSubmitCreate(mergedFormValues);
    } else {
      onSubmitModify(fillData.id, mergedFormValues);
    }
  };

  const moveBack = () => {
    router.back();
  };

  return (
    <form onSubmit={handleSubmit(createChallenge)}>
      <TextInput {...register('title', { required: true })} size="sm" />
      <Layout.Column gap={8}>
        <Layout.Row gap={20}>
          <Text variant="label" color="grey-darken1">
            진행 주기
          </Text>
          <div>
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
          </div>
        </Layout.Row>
        <Layout.Row gap={20}>
          <Text variant="label" color="grey-darken1">
            공개 여부
          </Text>
          <div>
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
          </div>
        </Layout.Row>
        <Layout.Row gap={20}>
          <Text variant="label" color="grey-darken1">
            진행 기간
          </Text>
          <div>
            <input type="date" {...register('duration.start', { required: true })} />
            ~
            <input type="date" {...register('duration.end', { required: true })} />
          </div>
        </Layout.Row>
        <Layout.Row gap={20}>
          <Text variant="label" color="grey-darken1">
            모집 마감
          </Text>
          <input type="date" {...register('dueAt', { required: true })} />
        </Layout.Row>
        <Layout.Row gap={20}>
          <Text variant="label" color="grey-darken1">
            모집 인원
          </Text>
          <div css={{ width: '196px' }}>
            <Select
              onValueChange={(value) => {
                setMemberCapacity(Number(value));
              }}
              defaultValue={`${memberCapacity}`}
            >
              <Select.Trigger placeholder="" />
              {Array.from({ length: 20 }, (_, index) => index + 1).map((item: number) => (
                <Select.Option value={`${item}`} key={item}>
                  {`${item}명`}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Layout.Row>
        <Layout.Row gap={20}>
          <Text variant="label" color="grey-darken1">
            진행 주제
          </Text>
          <DevSkillCombobox state={skill} setState={setSkill} />
        </Layout.Row>

        <MarkdownEditor
          content={content}
          onChange={(value: string) => {
            setContent(value);
          }}
        />
      </Layout.Column>
      <Flex justify="space-between">
        <Flex.Item>
          <Button as="a" onClick={moveBack} variant="outline" size="xl">
            뒤로가기
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Button type="submit" size="xl" color="primary-500" css={{ width: '130px' }}>
            작성
          </Button>
        </Flex.Item>
      </Flex>
    </form>
  );
};
