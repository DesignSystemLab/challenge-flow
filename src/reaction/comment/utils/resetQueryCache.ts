import { queryClient } from '@shared/queryClient';

export const resetQueryCache = (prefixId: string, originId: string) => {
  queryClient.invalidateQueries(`${prefixId}-${originId}`);
};
