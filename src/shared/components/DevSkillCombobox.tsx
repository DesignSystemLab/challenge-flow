import { Dispatch, SetStateAction } from 'react';
import { SKILLS } from '@shared/constants';
import { Select } from '@jdesignlab/react';

interface DevSkillComboboxProps {
  setState: Dispatch<SetStateAction<any>>;
  updateDepthName?: string;
}

export const DevSkillCombobox = ({ setState, updateDepthName }: DevSkillComboboxProps) => {
  const onValueChange = (value: string | null) => {
    setState(
      updateDepthName
        ? (state: { [x: string]: string | null }) => {
            state[updateDepthName] = value;
            return { ...state };
          }
        : value
    );
  };

  return (
    <Select onValueChange={(value) => onValueChange(value)}>
      <Select.Trigger placeholder="공부할 기술">
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
