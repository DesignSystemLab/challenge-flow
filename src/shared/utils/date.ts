import {
  format,
  differenceInSeconds,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes
} from 'date-fns';

export const getTimeDiff = (time: string) => {
  const now = new Date();
  const dataTime = new Date(time);
  let timeGap;
  let str;
  timeGap = differenceInSeconds(now, dataTime);

  if (timeGap > 60 * 60 * 24 * 30) {
    timeGap = differenceInMonths(now, dataTime);
    str = `${timeGap}달 전`;
  } else if (timeGap > 60 * 60 * 24) {
    timeGap = differenceInDays(now, dataTime);
    str = `${timeGap}일 전`;
  } else if (timeGap > 60 * 60) {
    timeGap = differenceInHours(now, dataTime);
    str = `${timeGap}시간 전`;
  } else if (timeGap > 60) {
    timeGap = differenceInMinutes(now, dataTime);
    str = `${timeGap}분 전`;
  } else {
    str = '방금 전';
  }
  return str;
};

export const formatDateTime = (now: Date) => format(now, 'yyyy-MM-dd HH:mm:ss');

export const getDate = () => new Date();
