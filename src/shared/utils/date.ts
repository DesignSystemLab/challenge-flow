import { format } from 'date-fns';

export const formatDateTime = (now: Date) => format(now, 'yyyy-MM-dd HH:mm:ss');

type DateInput = number | string | Date;
export const getDate = (input?: DateInput) => (input ? new Date(input) : new Date());

type CalculateDateType = 'week' | 'day';
export const calculateDayDiff = (start: string, end: string, type?: CalculateDateType): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return type === 'week' ? Math.floor(dayDiff / 7) : dayDiff;
};
