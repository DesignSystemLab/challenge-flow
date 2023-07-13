import { Chip } from '@shared/components/dataDisplay/Chip';
import { calculateDateDiff, formatDate, getDate, isEarlierThanNow } from '@shared/utils/date';

export const DdayChip = ({ due }: { due: string }) => (
  <>
    {isEarlierThanNow(due) ? (
      <Chip size="sm" color="#f48fb1">
        D{calculateDateDiff(due, formatDate(getDate(), '-'))}
      </Chip>
    ) : (
      <Chip size="sm" color="#808080">
        마감
      </Chip>
    )}
  </>
);
