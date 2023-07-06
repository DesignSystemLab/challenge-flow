import fetchReadDetail from '@challenge/remotes/fetchReadDetail';
import fetchReadList from '@challenge/remotes/fetchReadList';
import { useQuery } from 'react-query';

export const useReadListQuery = () => {
  const readListQuery = useQuery(`challengeList`, () => fetchReadList());
  return readListQuery;
};

export const useReadDetailQuery = (id: string) => {
  const readDetailQuery = useQuery('challengeDetail', () => fetchReadDetail(id));
  return readDetailQuery;
};
