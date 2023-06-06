import { ReactNode, Suspense } from 'react';
import type { ReactElement } from 'react';
import { useClientSide } from '../../hooks/useClientSide';

interface Props {
  suspense: ReactElement<{ fallback: ReactElement }>;
  children: ReactNode;
}

export const AsyncSuspense = (props: Props) => {
  const { suspense: suspenseFallback, children } = props;
  const { isMounted } = useClientSide();
  return (
    <>
      {isMounted && <Suspense {...suspenseFallback.props}>{children}</Suspense>}
      {!isMounted && <>{suspenseFallback}</>}
    </>
  );
};
