import { useQuery } from 'react-query';
import fetchReadList from '../remotes/fetchReadList';

export const useReadListQuery = (originId: string) => {
  const readListQuery = useQuery(`commentList-${originId}`, () => fetchReadList(originId));
  return readListQuery;
};
