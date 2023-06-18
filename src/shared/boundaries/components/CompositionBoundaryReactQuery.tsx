import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import { AsyncSuspense } from './AsyncSuspense';
import type { CompositionBoundaryProps } from '../types';

export const CompositionBoundaryReactQuery = (props: CompositionBoundaryProps) => {
  const { children, suspense: suspenseFallback, error: errorFallback, onRetry, ...restErrorProps } = props;
  const { reset: reactQueryReset } = useQueryErrorResetBoundary();

  const combineReset = () => {
    reactQueryReset();
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <ErrorBoundary fallbackRender={errorFallback} onReset={combineReset} {...restErrorProps}>
      <AsyncSuspense fallback={suspenseFallback} children={children} />
    </ErrorBoundary>
  );
};
