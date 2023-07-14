import fetchReadDetail from '@challenge/remotes/fetchReadDetail';
import fetchReadList from '@challenge/remotes/fetchReadList';
import { FilterValues } from '@challenge/types';
import { useQuery } from 'react-query';

export const useReadListQuery = (props: FilterValues) => {
  const readListQuery = useQuery([`challengeList`, props.skill, props.title, props.hideClosed], () =>
    fetchReadList(props)
  );
  return readListQuery;
};

export const useReadDetailQuery = (id: string) => {
  const readDetailQuery = useQuery([`challengeDetail`, id], () => fetchReadDetail(id));
  return readDetailQuery;
};
