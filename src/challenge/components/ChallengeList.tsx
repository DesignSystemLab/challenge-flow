import { useState } from 'react';
import { filterWrapper } from '@challenge/styles/filterStyle';
import { Layout } from '@shared/components/dataDisplay/FlexLayout';
import { ChallengeCard } from '@challenge/components/ChallengeCard';
import { challengeCardContainer } from '@challenge/styles/challengeCardStyle';
import { ChallengeModifyFetchProps, FilterValues } from '@challenge/types';
import { useReadListQuery } from '@challenge/hooks/useReadQuery';
import { DevSkillCombobox } from '@shared/components/form/DevSkillCombobox';
import { FieldValues, useForm } from 'react-hook-form';
import { Button, TextInput } from '@jdesignlab/react';
import { Search } from '@jdesignlab/react-icons';

interface Props {
  showTotalCount?: boolean;
}

export const ChallengeList = ({ showTotalCount }: Props) => {
  const [devSkill, setDevSkill] = useState<number>(0);

  const [fields, setFields] = useState<FilterValues>({
    title: '',
    hideClosed: true,
    skill: devSkill
  });
  const { data } = useReadListQuery(fields);

  const { handleSubmit, register } = useForm();
  const filterSearch = (formFieldsValue: FieldValues) => {
    const values = {
      title: formFieldsValue.title,
      hideClosed: formFieldsValue.hideClosed,
      skill: devSkill
    };
    setFields(values);
  };

  return (
    <Layout.Column gap={20}>
      <form onSubmit={handleSubmit(filterSearch)} css={filterWrapper}>
        <Layout.Row gap={4} wrap>
          {/* <div css={filterCheckbox}>
            <Checkbox {...register('hideClosed')}>모집중</Checkbox>
          </div> */}
          <DevSkillCombobox state={devSkill} setState={setDevSkill} firstItem="전체" />
          <TextInput {...register('title')} size="sm" />
          <Button
            type="submit"
            variant="outline"
            color="grey-darken1"
            icon={<Search color="#808080" width={20} height={20} />}
          >
            검색
          </Button>
          {showTotalCount && (
            <div css={{ marginTop: '8px' }}>
              검색결과
              <b style={{ color: '#4695E5' }}> {`${data?.length}`}</b>개
            </div>
          )}
        </Layout.Row>
      </form>

      <div css={challengeCardContainer}>
        {data?.map((post: ChallengeModifyFetchProps) => (
          <div key={post.id}>
            <ChallengeCard postInfo={post} />
          </div>
        ))}
        {data?.length === 0 && <div>데이터가 없어요</div>}
      </div>
    </Layout.Column>
  );
};
