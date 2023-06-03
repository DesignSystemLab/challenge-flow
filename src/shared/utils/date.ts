import { format } from 'date-fns';

export const formatDateTime = (now: Date) => format(now, 'yyyy-MM-dd HH:mm:ss');

export const getDate = () => new Date();
