import { Dispatch, SetStateAction } from 'react';
import { SKILLS } from '@shared/constants';
import { Select } from '@jdesignlab/react';

interface DevSkillComboboxProps {
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}

export const DevSkillCombobox = ({ state, setState }: DevSkillComboboxProps) => {
  const onValueChange = (value: string | null) => {
    if (value) {
      setState(Number(value));
    }
  };

  return (
    <>
      <Select defaultValue={`${state}`} onValueChange={(value) => onValueChange(value)}>
        <Select.Trigger placeholder="ex) React">
          <Select.Input />
        </Select.Trigger>
        {Object.entries(SKILLS).map(([key, value]) => (
          <Select.Option value={key} key={key}>
            {value}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};
