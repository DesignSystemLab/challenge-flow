import { ReactNode, Suspense, ReactElement } from 'react';
import { useClientSide } from '../../hooks/useClientSide';

interface Props {
  fallback: ReactElement;
  children: ReactNode;
}

export const AsyncSuspense = (props: Props) => {
  const { fallback, children } = props;
  const { isMounted } = useClientSide();

  return (
    <>
      {isMounted && <Suspense fallback={fallback}>{children}</Suspense>}
      {!isMounted && <>{fallback}</>}
    </>
  );
};
