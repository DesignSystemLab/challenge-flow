import { ReactionDomain } from '@reaction/types';
import { COMMENT_LIST } from '@reaction/constants';
import { useQuery } from 'react-query';
import fetchReadList from '../remotes/fetchReadList';

export const useReadListQuery = (domain: ReactionDomain, originId: string) => {
  const readListQuery = useQuery(`${COMMENT_LIST}-${originId}`, () => fetchReadList(domain, originId));
  return readListQuery;
};
