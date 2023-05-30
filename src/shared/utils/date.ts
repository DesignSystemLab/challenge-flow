import { format } from 'date-fns';

export const formatDateTime = (now: Date) => {
  return format(now, 'yyyy-MM-dd HH:mm:ss');
};

export const getDate = () => {
  return new Date();
};
