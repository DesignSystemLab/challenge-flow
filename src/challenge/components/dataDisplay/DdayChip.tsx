import { Chip } from '@shared/components/dataDisplay/Chip';
import { calculateDateDiff, formatDate, getDate, isEarlierThanNow } from '@shared/utils/date';

export const DdayChip = ({ due }: { due: string }) => {
  const dDayNumber = calculateDateDiff(due, formatDate(getDate(), '-'));
  return (
    <>
      {isEarlierThanNow(due) ? (
        <Chip size="sm" color="#f48fb1">
          {dDayNumber === 0 ? '오늘 마감 🔥' : `D${dDayNumber}`}
        </Chip>
      ) : (
        <Chip size="sm" color="#808080">
          마감
        </Chip>
      )}
    </>
  );
};
