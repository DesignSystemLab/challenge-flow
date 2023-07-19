import { ChallengeModifyFetchProps } from '@challenge/types';
import { Chip } from '@shared/components/dataDisplay/Chip';
import { isEarlierThanNow } from '@shared/utils/date';

interface Props {
  postInfo: ChallengeModifyFetchProps;
}

export const RestMemberSlotChip = ({ postInfo }: Props) => {
  const restMemberSlot = postInfo.memberCapacity - postInfo.members.length;

  return (
    <>
      {isEarlierThanNow(postInfo.dueAt) && restMemberSlot > 0 && (
        <Chip size="sm" color="#4695E5">
          {`${restMemberSlot}`}명 남음
          {restMemberSlot === 1 && <>🔥</>}
        </Chip>
      )}
    </>
  );
};
