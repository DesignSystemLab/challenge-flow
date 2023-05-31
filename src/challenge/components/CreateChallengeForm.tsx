import type { ChallengePostFields } from '@challenge/types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Radio, Select, TextInput, Textarea } from '@jdesignlab/react';
import { DevSkillCombobox } from '@shared/components/DevSkillCombobox';
import { useFormChangeHandler } from '@challenge/hooks/useFormChangeHandler';
import { useChallengeApi } from '@challenge/hooks/useChallengeApi';

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
      <Radio name="isDaily" defaultChecked value="true" onChange={valueChangeHandler}>
        일별
      </Radio>
      <Radio name="isDaily" value="false" onChange={valueChangeHandler}>
        주별
      </Radio>
      <div>
        기간: <input type="date" name="s_duration" value={postValue.duration.start} onChange={valueChangeHandler} /> ~
        <input type="date" name="e_duration" value={postValue.duration.end} onChange={valueChangeHandler} />
      </div>
      <div>
        모집 마감일 : <input type="date" name="dueAt" value={postValue.dueAt} onChange={valueChangeHandler} />
      </div>
      <Select onValueChange={selectValueChangeHandler} defaultValue={`${postValue.memberCapacity}`}>
        <Select.Trigger placeholder=""></Select.Trigger>
        {Array.from({ length: 20 }, (_, index) => index + 1).map((item: number, index: number) => {
          return (
            <Select.Option value={`${item}`} key={item}>
              {`${item}`}
            </Select.Option>
          );
        })}
      </Select>
      <DevSkillCombobox setState={setPostValue} updateDepthName="skill" />
      <Textarea name="content" onChange={valueChangeHandler} defaultValue={postValue.content} />
      <Button type="submit" variant="outline" color="primary-500" disabled={writeMutation.isLoading ? true : false}>
        작성
      </Button>
    </form>
  );
};
