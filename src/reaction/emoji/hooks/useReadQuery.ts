import { ReactionDomain } from '@reaction/types';
import { EMOJI_LIST } from '@reaction/constants';
import { useQuery } from 'react-query';
import fetchReadList from '../remotes/fetchReadList';

export const useReadListQuery = (domain: ReactionDomain, originId: string) => {
  const readListQuery = useQuery(`${EMOJI_LIST}-${originId}`, () => fetchReadList(domain, originId));
  return readListQuery;
};
