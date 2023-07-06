import { useState } from 'react';
import { filterWrapper } from '@challenge/styles/filterStyle';
import { DevSkillCombobox } from '@shared/components/form/DevSkillCombobox';
import { Button, TextInput } from '@jdesignlab/react';
import { Options, Search } from '@jdesignlab/react-icons';

export const ChallengeFilter = () => {
  const [skill, setSkill] = useState<number>(0);

  return (
    <div css={filterWrapper}>
      <Options color="#808080" width={24} height={24} css={{ marginRight: '8px' }} />
      <DevSkillCombobox state={skill} setState={setSkill} />
      <TextInput size="sm" />
      {/* <Search color="#808080" width={20} height={20} /> */}
      <Button variant="outline" color="grey-darken1" icon={<Search color="#808080" width={20} height={20} />}>
        검색
      </Button>
    </div>
  );
};
