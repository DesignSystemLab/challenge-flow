import { Button, Radio, Select, TextInput, Textarea } from '@jdesignlab/react';
import { DevSkillCombobox } from '@shared/components/DevSkillCombobox';
import { useState } from 'react';
import { ChallengeAPI } from '@challenge/remotes';
import { CreateChallengeFormProps, ChallengeFormStates } from '@challenge/types';

export const CreateChallengeForm = ({ id }: CreateChallengeFormProps) => {
  if (!id) return <div>다시 시도</div>;

  const [postValue, setPostValue] = useState<ChallengeFormStates>({
    title: '',
    isDaily: true,
    skill: null,
    content: '',
    memberCapacity: 0
  });

  // TODO: radio value boolean type 받도록 변경
  // TODO: Textarea onChange type 변경?
  // TODO: Textarea -> Markdown모듈로 변경
  const valueChangeHandler = (event: any) => {
    let { name, value } = event.target;

    if (value === 'true') value = true;
    if (value === 'false') value = false;

    postValue[name] = value;
    setPostValue({ ...postValue });
  };

  // TODO: select value type number 추가?
  const selectValueChangeHanlder = (value: string | null) => {
    postValue['memberCapacity'] = Number(value);
    setPostValue({ ...postValue });
  };

  const createChallenge = () => {
    ChallengeAPI.create(id, postValue);
  };

  return (
    <form>
      <TextInput name="title" onChange={valueChangeHandler} />
      <Radio name="isDaily" defaultChecked value="true" onChange={valueChangeHandler}>
        일별
      </Radio>
      <Radio name="isDaily" value="false" onChange={valueChangeHandler}>
        주별
      </Radio>
      <Select onValueChange={selectValueChangeHanlder}>
        <Select.Trigger placeholder=""></Select.Trigger>
        {new Array(20).fill(null).map((item: null, index: number) => {
          return (
            <Select.Option value={`${index + 1}`} key={index}>
              {`${index + 1}`}
            </Select.Option>
          );
        })}
      </Select>
      <DevSkillCombobox setState={setPostValue} updateDepthName="skill" />
      <Textarea name="content" onChange={valueChangeHandler} />
      <Button variant="outline" color="primary-500" onClick={createChallenge}>
        작성
      </Button>
    </form>
  );
};
