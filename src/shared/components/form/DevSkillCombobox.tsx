import { Dispatch, SetStateAction } from 'react';
import { SKILLS } from '@shared/constants';
import { Select } from '@jdesignlab/react';

interface DevSkillComboboxProps {
  setState: Dispatch<SetStateAction<number>>;
}

export const DevSkillCombobox = ({ setState }: DevSkillComboboxProps) => {
  const onValueChange = (value: string | null) => {
    if (value) {
      setState(Number(value));
    }
  };

  return (
    <Select onValueChange={(value) => onValueChange(value)}>
      <Select.Trigger placeholder="기술 선택하기">
        <Select.Input />
      </Select.Trigger>
      {Object.keys(SKILLS).map((key) => (
        <Select.Option value={SKILLS[key]} key={SKILLS[key]}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
};
