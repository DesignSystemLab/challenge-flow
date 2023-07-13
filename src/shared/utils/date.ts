import {
  format,
  differenceInSeconds,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  addDays,
  addWeeks,
  isBefore,
  isAfter
} from 'date-fns';

/**
 * @description 시간차이 계산.
 * @param time
 * @returns
 */
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

export const formatDateToYYYYMMDD = (now: Date) => format(now, 'yyyyMMdd');
export const formatDateTime = (now: Date) => format(now, 'yyyy-MM-dd HH:mm:ss');

type DateInput = number | string | Date;
export const getDate = (input?: DateInput) => (input ? new Date(input) : new Date());

type CalculateDateType = 'week' | 'day';
export const calculateDateDiff = (start: string, end: string, type?: CalculateDateType): number => {
  const startDate = getDate(start);
  const endDate = getDate(end);

  const timeDiff = endDate.getTime() - startDate.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return type === 'week' ? Math.floor(dayDiff / 7) : dayDiff;
};

type Datetype = 'day' | 'week';
export const addDate = (fromDate: string | Date | number, amount: number, type?: Datetype) => {
  if (type === 'week') {
    return addWeeks(getDate(fromDate), amount);
  }
  return addDays(getDate(fromDate), amount);
};

/**
 * @description 날짜 형식을 변경합니다.
 * @param date Date
 * @param dateType: - , / , ko
 */
type FormatType = '-' | '/' | 'ko';
export const formatDate = (date: Date, type?: FormatType) => {
  const convertDate = formatDateToYYYYMMDD(date);

  const year = convertDate.substring(0, 4);
  const month = convertDate.substring(4, 6);
  const day = convertDate.substring(6, 8);

  switch (type) {
    case '-':
      return `${year}-${month}-${day}`;
    case '/':
      return `${year}/${month}/${day}`;
    default:
      return `${year}년 ${month}월 ${day}일`;
  }
};
export const isEarlierThanNow = (date: string) => {
  const now = getDate();
  const inputDate = getDate(date);
  return isBefore(now, inputDate);
};

export const isAfterThanNow = (date: string) => {
  const now = getDate();
  const inputDate = getDate(date);
  return isAfter(now, inputDate);
};

export const setEndTimeOfDay = (date: Date) => format(date, 'yyyy-MM-dd 23:59:59');
