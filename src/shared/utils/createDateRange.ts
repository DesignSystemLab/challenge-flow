import { calculateDateDiff, addDate, getDate } from '@shared/utils/date';

type dateArray = {
  date: Date;
  order: number;
};

export const createDateRange = (start: string, end: string, daily?: boolean): dateArray[] => {
  const dateRange: dateArray[] = [];
  const rangeType = daily ? 'day' : 'week';
  const addPeriod = daily ? 1 : 7;
  const loop = calculateDateDiff(start, end, rangeType);
  let prevDate = getDate(start);

  for (let index = 1; index <= loop; index += 1) {
    const nextDate = addDate(prevDate, addPeriod);
    dateRange.push({ date: nextDate, order: index });
    prevDate = nextDate;
  }

  return dateRange;
};
