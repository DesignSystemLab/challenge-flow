import { useEffect } from 'react';
import { DevSkillCombobox } from '@shared/components/DevSkillCombobox';
import { useFormChangeHandler } from '@challenge/hooks/useFormChangeHandler';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';
import { MarkdownEditor } from '@shared/components/markdownEditor';
import { Button, Flex, Radio, Select, TextInput } from '@jdesignlab/react';
import { Controller, useForm } from 'react-hook-form';
import type { ChallengePostFields } from '@challenge/types';

export const CreateChallengeForm = ({ fillData }: { fillData?: ChallengePostFields }) => {
  const { control, register, handleSubmit } = useForm();
  const { postValue, setPostValue, valueChangeHandler, selectValueChangeHandler } = useFormChangeHandler();
  const { useWriteMutation, useModifyMutation } = useChallengeApi();
  const writeMutation = useWriteMutation();
  const modifyMutation = useModifyMutation();

  useEffect(() => {
    if (fillData) {
      setPostValue(fillData);
    }
  }, [fillData]);

  const createChallenge = () => {
    if (!fillData) {
      writeMutation.mutate({ postValue });
    } else {
      modifyMutation.mutate({ postId: postValue.id, postValue });
    }
  };

  return (
    <form onSubmit={handleSubmit(createChallenge)}>
      {postValue.id}
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput {...field} {...register('title')} value={postValue.title} onChange={valueChangeHandler} />
        )}
      />

      <br />
      <Flex>
        <Flex.Item> 진행 주기</Flex.Item>
        <Flex.Item>
          <Radio name="isDaily" defaultChecked value="true" onChange={valueChangeHandler}>
            일별
          </Radio>
          <Radio name="isDaily" value="false" onChange={valueChangeHandler}>
            주별
          </Radio>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 공개 여부</Flex.Item>
        <Flex.Item>
          <Radio name="isPublic" defaultChecked value="true" onChange={valueChangeHandler}>
            공개
          </Radio>
          <Radio name="isPublic" value="false" onChange={valueChangeHandler}>
            비공개
          </Radio>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 진행 기간</Flex.Item>
        <Flex.Item>
          <input type="date" name="s_duration" value={postValue.duration.start} onChange={valueChangeHandler} /> ~
          <input type="date" name="e_duration" value={postValue.duration.end} onChange={valueChangeHandler} />
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 모집 마감일</Flex.Item>
        <Flex.Item>
          <input type="date" name="dueAt" value={postValue.dueAt} onChange={valueChangeHandler} />
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 모집 인원</Flex.Item>
        <Flex.Item>
          <div>
            <Select onValueChange={selectValueChangeHandler} defaultValue={`${postValue.memberCapacity}`}>
              <Select.Trigger placeholder="" />
              {Array.from({ length: 20 }, (_, index) => index + 1).map((item: number) => (
                <Select.Option value={`${item}`} key={item}>
                  {`${item}`}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Flex.Item>
      </Flex>
      <Flex>
        <Flex.Item> 진행 주제</Flex.Item>
        <Flex.Item>
          <DevSkillCombobox setState={setPostValue} updateDepthName="skill" />
        </Flex.Item>
      </Flex>
      <MarkdownEditor height={310} />
      {/* <Textarea name="content" onChange={valueChangeHandler} defaultValue={postValue.content} /> */}
      <Button type="submit" variant="outline" color="primary-500" disabled={!!writeMutation.isLoading}>
        작성
      </Button>
    </form>
  );
};
